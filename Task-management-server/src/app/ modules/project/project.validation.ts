import { z } from "zod";

const createProjectValidation = z.object({
  body: z.object({
    name: z.string().nonempty("Project name is required"),
    description: z.string().nonempty("Project description is required"),
    teamId: z.string().nonempty("Team ID is required"),
  }),
});

export const ProjectValidation = {
  createProjectValidation,
};
