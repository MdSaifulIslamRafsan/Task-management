import express from "express";
import { memberController } from "./member.controller";

const router = express.Router();

router.post("/", memberController.createMember);
router.get("/", memberController.getAllMembers);
router.get("/:id", memberController.getMemberById);

export const MemberRoutes = router;