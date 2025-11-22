import express from "express";
import { activityController } from "./activity.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.get("/", auth(), activityController.getActivityLogs);

export const ActivityRoutes = router;
