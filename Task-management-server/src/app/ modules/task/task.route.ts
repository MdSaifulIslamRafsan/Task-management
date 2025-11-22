import express from "express";
import { taskController } from "./task.controller";
import validateRequest from "../../middleware/validateRequest";
import { TaskValidation } from "./task.validation";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(TaskValidation.createTaskValidation),
  taskController.createTask
);
router.get("/", auth(), taskController.getAllTasks);
router.get("/:taskId", auth(), taskController.getTaskById);
router.put(
  "/:taskId",
  validateRequest(TaskValidation.updateTaskStatusValidation),
  taskController.updateTaskStatus
);
router.delete("/:id", auth(), taskController.deleteTask);

export const TaskRoutes = router;
