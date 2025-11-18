import express from "express";
import { createProjectValidation } from "./project.validation";
import { ProjectController } from "./project.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/",

  validateRequest(createProjectValidation),
  ProjectController.createProject
);

router.get("/", ProjectController.getMyProjects);

router.get("/:id", ProjectController.getSingleProject);

router.patch("/:id", ProjectController.updateProject);

router.delete("/:id", ProjectController.deleteProject);

export const ProjectRoutes = router;
