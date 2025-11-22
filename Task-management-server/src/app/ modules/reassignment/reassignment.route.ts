import express from "express";
import { reassignmentController } from "./reassignment.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/auto-reassign", auth(), reassignmentController.reassignTasks);

export const ReassignmentRoutes = router;
