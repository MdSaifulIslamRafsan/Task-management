import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { dashboardService } from "./dashboard.service";

const getDashboardMetrics = catchAsync(async (req, res) => {
  const result = await dashboardService.getDashboardMetricsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Dashboard metrics retrieved successfully",
    data: result,
  });
});

export const dashboardController = {
  getDashboardMetrics,
};