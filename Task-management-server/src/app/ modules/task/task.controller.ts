import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { taskService } from "./task.service";


const createTask = catchAsync(async (req, res) => {
  const result = await taskService.createTaskIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task created successfully",
    data: result,
  });
});

const getAllTasks = catchAsync(async (req, res) => {
  const result = await taskService.getAllTasksFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tasks retrieved successfully",
    data: result,
  });
});

const getTaskById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await taskService.getTaskByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task retrieved successfully",
    data: result,
  });
});

const updateTaskStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await taskService.updateTaskStatusInDB(id, status);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task status updated successfully",
    data: result,
  });
});

export const taskController = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
};
