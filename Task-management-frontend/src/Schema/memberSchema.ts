import * as z from "zod";

export const memberSchema = z.object({
  name: z.string().nonempty("Member name is required"),
  role: z.string().nonempty("Role is required"),
  capacity: z
    .string()
    .min(1, "Capacity is required")
    .refine((val) => !isNaN(Number(val)), "Capacity must be a number")
    .transform((val) => Number(val))
    .pipe(z.number().min(1, "Minimum is 1").max(5, "Maximum is 5")),
  teamId: z.string().nonempty("Team ID is required"),
});
export type MemberFormData = z.infer<typeof memberSchema>;
