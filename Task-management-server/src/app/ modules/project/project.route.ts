import express from "express";
import { projectController } from "./project.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { ProjectValidation } from "./project.validation";

const router = express.Router();

router.post("/", validateRequest(ProjectValidation.createProjectValidation), auth(), projectController.createProject);
router.get("/", auth(), projectController.getAllProjects);

export const ProjectRoutes = router;
