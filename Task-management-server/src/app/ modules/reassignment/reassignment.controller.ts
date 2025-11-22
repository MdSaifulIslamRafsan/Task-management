import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { autoReassignTasks } from "./reassignment.service";

const reassignTasks = catchAsync(async (req, res) => {
  const result = await autoReassignTasks();

  sendResponse(res, {
    success: result.success,
    statusCode: result.success ? httpStatus.OK : httpStatus.BAD_REQUEST,
    message: result.message,
    data: result,
  });
});

export const reassignmentController = {
  reassignTasks,
};
