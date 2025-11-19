import { z } from "zod";

const createTeamValidation = z.object({
  body: z.object({
    name: z.string().nonempty("Team name is required"),
    members: z.array(z.string()).optional(),
  }),
});

export const TeamValidation = {
  createTeamValidation,
};
