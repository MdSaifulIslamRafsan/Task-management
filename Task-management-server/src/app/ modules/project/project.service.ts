import { TProject } from "./project.interface";
import { Project } from "./project.model";

const createProject = async (payload: TProject) => {
  const result = await Project.create(payload);
  return result;
};

const getProjectsByUser = async (userId: string) => {
  return await Project.find({ owner: userId }).populate("team");
};

const getSingleProject = async (id: string) => {
  return await Project.findById(id).populate("team");
};

const updateProject = async (id: string, payload: Partial<TProject>) => {
  return await Project.findByIdAndUpdate(id, payload, { new: true });
};

const deleteProject = async (id: string) => {
  return await Project.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export const ProjectServices = {
  createProject,
  getProjectsByUser,
  getSingleProject,
  updateProject,
  deleteProject,
};
