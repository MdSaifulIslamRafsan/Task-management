import httpStatus from "http-status";
import { TProject } from "./project.interface";
import { Project } from "./project.model";
import AppError from "../../errors/AppError";

const createProjectIntoDB = async (data: TProject) => {
  const isExistProject = await Project.findOne({ name: data?.name });

  if (isExistProject) {
    throw new AppError(httpStatus.CONFLICT, "Project with this name already exists");
  }

  const result = await Project.create(data);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find().populate('teamId');
  return result;
};

const getProjectByIdFromDB = async (id: string) => {
  const result = await Project.findById(id).populate('teamId');
  return result;
};

export const projectService = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getProjectByIdFromDB,
};