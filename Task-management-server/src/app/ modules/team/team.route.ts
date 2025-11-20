import express from "express";
import { teamController } from "./team.controller";

const router = express.Router();

router.post("/", teamController.createTeam);

router.get("/", teamController.getAllTeams);
router.get("/:projectId", teamController?.getTeamsByProjectId);

export const TeamRoutes = router;
