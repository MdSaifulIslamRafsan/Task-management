import mongoose from "mongoose";
import { Task } from "../task/task.model";
import { Member } from "../member/member.model";
import { ActivityLog } from "../activity/activity.model";

export const autoReassignTasks = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get all members with their current load
    const members = await Member.find().session(session);

    // Get all tasks that are not completed and not High priority
    const tasks = await Task.find({
      status: { $ne: "Done" },
      priority: { $in: ["Low", "Medium"] },
    })
      .populate("assigneeId")
      .session(session);

    const overloadedMembers = members.filter(
      (member) => member.currentLoad > member.capacity
    );

    if (overloadedMembers.length === 0) {
      await session.abortTransaction();
      await session.endSession();
      return {
        success: true,
        message: "No overloaded members found.",
        reassignments: [],
      };
    }

    const reassignments = [];
    const availableMembers = members
      .filter((member) => member.currentLoad < member.capacity)
      .sort((a, b) => {
        const aLoadPercent = a.currentLoad / a.capacity;
        const bLoadPercent = b.currentLoad / b.capacity;
        return aLoadPercent - bLoadPercent;
      });

    if (availableMembers.length === 0) {
      await session.abortTransaction();
      await session.endSession();
      return {
        success: false,
        message: "No available members to receive tasks.",
        reassignments: [],
      };
    }

    // Process each overloaded member
    for (const overloadedMember of overloadedMembers) {
      const overloadAmount =
        overloadedMember.currentLoad - overloadedMember.capacity;

      // Get this member's tasks (Low and Medium priority only)
      const memberTasks = tasks
        .filter(
          (task) =>
            task.assigneeId &&
            task.assigneeId._id.toString() === overloadedMember._id.toString()
        )
        .sort((a, b) => {
          const priorityOrder: Record<string, number> = {
            Low: 1,
            Medium: 2,
            High: 3,
          };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

      let reassignedCount = 0;

      for (const task of memberTasks) {
        if (reassignedCount >= overloadAmount) break;

        // Find the best available member
        const bestReceiver = availableMembers.find(
          (member) =>
            member.currentLoad < member.capacity &&
            member._id.toString() !== overloadedMember._id.toString()
        );

        if (!bestReceiver) break;

        // Reassign the task
        await Task.findByIdAndUpdate(
          task._id,
          { assigneeId: bestReceiver._id },
          { session }
        );

        // Update member loads
        await Member.findByIdAndUpdate(
          overloadedMember._id,
          { $inc: { currentLoad: -1 } },
          { session }
        );

        await Member.findByIdAndUpdate(
          bestReceiver._id,
          { $inc: { currentLoad: 1 } },
          { session }
        );

        // Update available member's load in our array
        bestReceiver.currentLoad += 1;
        reassignedCount += 1;

        // Record activity
        await ActivityLog.create(
          [
            {
              type: "reassignment",
              message: `Task "${task.title}" reassigned from ${overloadedMember.name} to ${bestReceiver.name}`,
              timestamp: new Date(),
              details: {
                taskId: task._id,
                taskTitle: task.title,
                fromMember: overloadedMember._id,
                toMember: bestReceiver._id,
                priority: task.priority,
              },
            },
          ],
          { session }
        );

        reassignments.push({
          taskId: task._id.toString(),
          taskTitle: task.title,
          from: overloadedMember.name,
          to: bestReceiver.name,
          priority: task.priority,
        });
      }
    }

    await session.commitTransaction();
    await session.endSession();

    return {
      success: true,
      message:
        reassignments.length > 0
          ? `Successfully reassigned ${reassignments.length} tasks`
          : "No tasks needed reassignment",
      reassignments,
    };
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};
