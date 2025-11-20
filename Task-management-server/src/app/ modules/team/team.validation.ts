import { z } from "zod";

const createTeamValidation = z.object({
  body: z.object({
    teamName: z.string().nonempty("Team name is required"),
  }),
});

export const TeamValidation = {
  createTeamValidation,
};
