import express from "express";
import { teamController } from "./team.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { TeamValidation } from "./team.validation";

const router = express.Router();

router.post("/", validateRequest(TeamValidation.createTeamValidation), auth(), teamController.createTeam);

router.get("/", auth(), teamController.getAllTeams);
router.get("/:projectId", auth(), teamController?.getTeamsByProjectId);

export const TeamRoutes = router;
