import express from "express";
import { dashboardController } from "./dashboard.controller";

const router = express.Router();

router.get("/", dashboardController.getDashboardMetrics);

export const DashboardRoutes = router;