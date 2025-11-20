import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { memberService } from "./member.service";


const createMember = catchAsync(async (req, res) => {
  const result = await memberService.createMemberIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req, res) => {
  const result = await memberService.getAllMembersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await memberService.getMemberByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Member retrieved successfully",
    data: result,
  });
});

export const memberController = {
  createMember,
  getAllMembers,
  getMemberById,
};
