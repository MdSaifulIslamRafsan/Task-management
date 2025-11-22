import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { activityService } from "./activity.service";


const getActivityLogs = catchAsync(async (req, res) => {
  const { limit  } = req.query;
  const result = await activityService.getRecentActivity(Number(limit));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Activity logs retrieved successfully",
    data: result,
  });
});

export const activityController = {
  getActivityLogs,
};
