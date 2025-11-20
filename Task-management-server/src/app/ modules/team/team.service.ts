import httpStatus from "http-status";
import { TTeam } from "./team.interface";
import { Team } from "./team.model";
import AppError from "../../errors/AppError";
import { Project } from "../project/project.model";
import { Member } from "../member/member.model";

const createTeamIntoDB = async (data: TTeam) => {
  const isExistTeam = await Team.findOne({ teamName: data?.teamName });

  if (isExistTeam) {
    throw new AppError(httpStatus.CONFLICT, "Team already exists");
  }

  const result = await Team.create(data);

  return result;
};

const getAllTeamsFromDB = async () => {
  const result = await Team.aggregate([
    {
      $lookup: {
        from: "members",
        localField: "_id",
        foreignField: "teamId",
        as: "members",
      },
    },
    {
      $addFields: {
        memberCount: { $size: "$members" },
      },
    },
    {
      $project: {
        teamName: 1,
        memberCount: 1,
      },
    },
  ]);

  return result;
};

const getAllTeamsByProjectIdFromDB = async (projectId: string) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new AppError(httpStatus.NOT_FOUND, "Project not found");
  }
  const teamId = project.teamId;
  const result = await Member.find({ teamId: teamId }).select(
    "name _id capacity"
  );
  return result;
};

export const teamService = {
  createTeamIntoDB,
  getAllTeamsFromDB,
  getAllTeamsByProjectIdFromDB,
};
