import { TTask } from "./task.interface";
import { Task } from "./task.model";

import { Member } from "../member/member.model";
import mongoose from "mongoose";

const createTaskIntoDB = async (data: TTask) => {
  console.log({ data });
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const task = await Task.create([data], { session });

    if (data.assigneeId) {
      await Member.findByIdAndUpdate(
        data.assigneeId,
        { $inc: { currentLoad: 1 } },
        { session }
      );
    }

    await session.commitTransaction();

    const result = await Task.findById(task[0]._id);

    return result;
  } catch (error) {
    try {
      await session.abortTransaction();
    } catch (abortError) {
      console.error("Abort failed:", abortError);
    }
    throw error;
  } finally {
    await session.endSession();
  }
};

const getAllTasksFromDB = async (projectId?: string) => {
  const matchStage = projectId
    ? { $match: { projectId: new mongoose.Types.ObjectId(projectId) } }
    : { $match: {} };

  const result = await Task.aggregate([
    matchStage,
    {
      $lookup: {
        from: "projects",
        localField: "projectId",
        foreignField: "_id",
        as: "project",
      },
    },
    { $unwind: "$project" },

    {
      $lookup: {
        from: "members",
        localField: "assigneeId",
        foreignField: "_id",
        as: "assigneeMember",
      },
    },
    {
      $unwind: {
        path: "$assigneeMember",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        title: 1,
        description: 1,
        priority: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        project: {
          _id: 1,
          name: 1,
        },
        assigneeMember: {
          _id: 1,
          name: 1,
        },
      },
    },
  ]);

  return result;
};

const getTaskByIdFromDB = async (taskId: string) => {
  const result = await Task.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(taskId) } },
    {
      $lookup: {
        from: "projects",
        localField: "projectId",
        foreignField: "_id",
        as: "project",
      },
    },
    { $unwind: "$project" },

    {
      $lookup: {
        from: "members",
        localField: "assigneeId",
        foreignField: "_id",
        as: "assigneeMember",
      },
    },
    {
      $unwind: {
        path: "$assigneeMember",
        preserveNullAndEmptyArrays: true,
      },
    },

    {
      $project: {
        title: 1,
        description: 1,
        priority: 1,
        status: 1,
        createdAt: 1,
        updatedAt: 1,
        project: {
          _id: 1,
          name: 1,
        },
        assigneeMember: {
          _id: 1,
          name: 1,
        },
      },
    },
  ]);
  return result[0] || null;
};

const updateTaskStatusInDB = async (taskId: string, updateInfo: TTask) => {
  const result = await Task.findByIdAndUpdate(taskId, updateInfo, {
    new: true,
  });
  console.log("Updated Task result:", result);
  return result;
};

const deleteTaskFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const task = await Task.findById(id).session(session);
    if (!task) throw new Error("Task not found");

    await Task.findByIdAndDelete(id).session(session);

    if (task.assigneeId) {
      await Member.findByIdAndUpdate(
        task.assigneeId,
        { $inc: { currentLoad: -1 } },
        { session }
      );
    }

    await session.commitTransaction();
    return task;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const taskService = {
  createTaskIntoDB,
  getAllTasksFromDB,
  getTaskByIdFromDB,
  updateTaskStatusInDB,
  deleteTaskFromDB,
};
