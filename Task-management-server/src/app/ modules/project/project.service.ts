import httpStatus from "http-status";
import { TProject } from "./project.interface";
import { Project } from "./project.model";
import AppError from "../../errors/AppError";

const createProjectIntoDB = async (data: TProject) => {
  const isExistProject = await Project.findOne({ name: data?.name });

  if (isExistProject) {
    throw new AppError(
      httpStatus.CONFLICT,
      "Project with this name already exists"
    );
  }

  const result = await Project.create(data);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.aggregate([
    {
      $lookup: {
        from: "teams",
        localField: "teamId",
        foreignField: "_id",
        as: "team",
      },
    },
    { $unwind: "$team" },
    {
      $project: {
        teamName: "$team.teamName",
        name: 1,
        description: 1,
      },
    },
  ]);
  return result;
};

export const projectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
};
