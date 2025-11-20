import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { teamService } from "./team.service";

const createTeam = catchAsync(async (req, res) => {
  const result = await teamService.createTeamIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Team created successfully",
    data: result,
  });
});

const getAllTeams = catchAsync(async (req, res) => {
  const result = await teamService.getAllTeamsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Teams retrieved successfully",
    data: result,
  });
});

const getTeamsByProjectId = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const result = await teamService.getAllTeamsByProjectIdFromDB(projectId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Teams retrieved successfully",
    data: result,
  });
});

export const teamController = {
  createTeam,
  getAllTeams,
  getTeamsByProjectId,
};
