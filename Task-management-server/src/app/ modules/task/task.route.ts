import express from "express";
import { taskController } from "./task.controller";
import validateRequest from "../../middleware/validateRequest";
import { TaskValidation } from "./task.validation";

const router = express.Router();

router.post("/", validateRequest(TaskValidation.createTaskValidation), taskController.createTask);
router.get("/", taskController.getAllTasks);
router.get("/:taskId", taskController.getTaskById);
router.put("/:taskId", validateRequest(TaskValidation.updateTaskStatusValidation), taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

export const TaskRoutes = router;
