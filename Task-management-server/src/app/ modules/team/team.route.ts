import express from "express";

import { createTeamSchema, addMemberSchema } from "./team.validation";
import { teamController } from "./team.controller";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

// Create Team
router.post("/", validateRequest(createTeamSchema), teamController.createTeam);

// Get Team by ID
router.get("/:id", teamController.getTeamById);

// Add Member
router.post(
  "/:id/members",

  validateRequest(addMemberSchema),
  teamController.addMember
);

// Update Member
router.put("/:id/members/:memberId", teamController.updateMember);

// Delete Member
router.delete("/:id/members/:memberId", teamController.deleteMember);

export const teamRoutes = router;
