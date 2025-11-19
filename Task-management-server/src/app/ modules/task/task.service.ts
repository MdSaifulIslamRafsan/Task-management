import httpStatus from "http-status";
import { TTask, TStatus } from "./task.interface";
import { Task } from "./task.model";
import AppError from "../../errors/AppError";

const createTaskIntoDB = async (data: TTask) => {
  const isExistTask = await Task.findOne({ title: data?.title });

  if (isExistTask) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Task with this title already exists"
    );
  }

  const result = await Task.create(data);
  return result;
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
