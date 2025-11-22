import * as z from "zod";

export const projectSchema = z.object({
  name: z.string().nonempty("Project name is required"),
  description: z.string().nonempty("Project description is required"),
  teamId: z.string().nonempty("Team ID is required"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;
