import express from "express";
import { projectController } from "./project.controller";

const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);

export const ProjectRoutes = router;