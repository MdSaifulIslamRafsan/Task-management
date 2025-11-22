import express from "express";
import { memberController } from "./member.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { MemberValidation } from "./member.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(MemberValidation.createMemberValidation),
  auth(),
  memberController.createMember
);
router.get("/", auth(), memberController.getAllMembers);
router.get("/:id", auth(), memberController.getMemberById);

export const MemberRoutes = router;
