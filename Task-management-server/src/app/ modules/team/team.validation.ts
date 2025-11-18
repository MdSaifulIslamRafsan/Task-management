import { z } from "zod";

export const createTeamSchema = z.object({
  body: z.object({
    name: z.string().min(2),
  }),
});

export const addMemberSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    role: z.string().min(2),
    capacity: z.number().min(0).max(5),
  }),
});
