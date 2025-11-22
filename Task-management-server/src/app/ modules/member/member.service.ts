import httpStatus from "http-status";
import { TMember } from "./member.interface";
import { Member } from "./member.model";
import AppError from "../../errors/AppError";

const createMemberIntoDB = async (data: TMember) => {
  const isExistMember = await Member.findOne({ name: data?.name });

  if (isExistMember) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Member with this name already exists"
    );
  }

  const result = await Member.create(data);
  return result;
};

const getAllMembersFromDB = async () => {
  const result = await Member.find().limit(10).populate("teamId");
  return result;
};

const getMemberByIdFromDB = async (id: string) => {
  const result = await Member.findById(id).populate("teamId");
  return result;
};

export const memberService = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getMemberByIdFromDB,
};
