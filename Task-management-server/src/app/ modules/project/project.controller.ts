import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProjectServices } from "./project.service";

const createProject = catchAsync(async (req, res) => {
  const owner = req.user._id;

  const project = await ProjectServices.createProject({
    ...req.body,
    owner,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Project created successfully",
    data: project,
  });
});

const getMyProjects = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const projects = await ProjectServices.getProjectsByUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Projects retrieved",
    data: projects,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const project = await ProjectServices.getSingleProject(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project retrieved",
    data: project,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const updated = await ProjectServices.updateProject(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Project updated",
    data: updated,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const delate = await ProjectServices.deleteProject(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    data: delate,
    message: "Project deleted",
  });
});

export const ProjectController = {
  createProject,
  getMyProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
