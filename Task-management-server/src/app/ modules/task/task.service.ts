import { TTask, TStatus } from "./task.interface";
import { Task } from "./task.model";

import { Member } from "../member/member.model";
import mongoose from "mongoose";

const createTaskIntoDB = async (data: TTask) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const task = await Task.create([data], { session });

    if (data.assignedId) {
      await Member.findByIdAndUpdate(
        data.assignedId,
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

const getAllTasksFromDB = async () => {
  const result = await Task.find().populate("projectId").populate("assignedTo");
  return result;
};

const getTaskByIdFromDB = async (id: string) => {
  const result = await Task.findById(id)
    .populate("projectId")
    .populate("assignedTo");
  return result;
};

const updateTaskStatusInDB = async (id: string, status: TStatus) => {
  const result = await Task.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  ).populate("assignedTo");

  return result;
};

export const taskService = {
  createTaskIntoDB,
  getAllTasksFromDB,
  getTaskByIdFromDB,
  updateTaskStatusInDB,
};
