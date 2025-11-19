import express from "express";
import { taskController } from "./task.controller";

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.patch("/:id/status", taskController.updateTaskStatus);

export const TaskRoutes = router;