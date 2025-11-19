import httpStatus from "http-status";
import { TTeam } from "./team.interface";
import { Team } from "./team.model";
import AppError from "../../errors/AppError";

const createTeamIntoDB = async (data: TTeam) => {
  const isExistTeam = await Team.findOne({ name: data?.name });

  if (isExistTeam) {
    throw new AppError(httpStatus.CONFLICT, "Team already exists");
  }

  const result = await Team.create(data);
  return result;
};

const getAllTeamsFromDB = async () => {
  const result = await Team.find().populate('members');
  return result;
};

const getTeamByIdFromDB = async (id: string) => {
  const result = await Team.findById(id).populate('members');
  return result;
};

export const teamService = {
  createTeamIntoDB,
  getAllTeamsFromDB,
  getTeamByIdFromDB,
};