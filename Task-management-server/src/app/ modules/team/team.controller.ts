import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { teamService } from "./team.service";

const createTeam = catchAsync(async (req, res) => {
  const { name } = req.body;
  const ownerId = req.user._id;

  const result = await teamService.createTeam(ownerId, name);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Team created successfully",
    data: result,
  });
});

const getTeamById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await teamService.getTeamById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Team fetched successfully",
    data: result,
  });
});

const addMember = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await teamService.addMember(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member added successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const { id, memberId } = req.params;

  const result = await teamService.updateMember(id, memberId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const { id, memberId } = req.params;

  const result = await teamService.deleteMember(id, memberId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member deleted successfully",
    data: result,
  });
});

export const teamController = {
  createTeam,
  getTeamById,
  addMember,
  updateMember,
  deleteMember,
};
