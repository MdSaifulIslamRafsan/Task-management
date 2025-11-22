import * as z from "zod";

export const taskSchema = z.object({
  title: z.string().nonempty("Task title is required"),
  description: z.string().nonempty("Task description is required"),
  projectId: z.string().nonempty("Project ID is required"),
  assigneeId: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
  status: z.enum(["Pending", "In Progress", "Done"]).default("Pending"),
  dueDate: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
