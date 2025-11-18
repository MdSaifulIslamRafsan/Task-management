import { z } from "zod";

export const createProjectValidation = z.object({
  body: z.object({
    name: z.string({ message: "Project name is required" }),
    description: z.string().optional(),
    team: z.string({ message: "Team ID is required" }),
  }),
});
