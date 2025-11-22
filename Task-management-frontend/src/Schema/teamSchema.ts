import * as z from "zod";

export const teamSchema = z.object({
  teamName: z.string().nonempty("Team name is required"),
});

export type TeamFormData = z.infer<typeof teamSchema>;
