import { z } from "zod";

const createMemberValidation = z.object({
  body: z.object({
    name: z.string().nonempty("Member name is required"),
    role: z.string().nonempty("Role is required"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    teamId: z.string().nonempty("Team ID is required"),
  }),
});

export const MemberValidation = {
  createMemberValidation,
};
