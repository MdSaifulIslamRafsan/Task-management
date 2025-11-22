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
  let projectId: string | undefined;
  if (typeof req.query.projectId === "string") {
    projectId = req.query.projectId;
  } else if (Array.isArray(req.query.projectId)) {
    const first = req.query.projectId[0];
    projectId = typeof first === "string" ? first : undefined;
  } else {
    projectId = undefined;
  }
  const result = await taskService.getAllTasksFromDB(projectId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Tasks retrieved successfully",
    data: result,
  });
});

const getTaskById = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const result = await taskService.getTaskByIdFromDB(taskId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task retrieved successfully",
    data: result,
  });
});

const updateTaskStatus = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const { updateInfo } = req.body;

  const result = await taskService.updateTaskStatusInDB(taskId, updateInfo);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task updated successfully",
    data: result,
  });
});

const deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await taskService.deleteTaskFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Task deleted successfully",
    data: result,
  });
});

export const taskController = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  deleteTask,
};
