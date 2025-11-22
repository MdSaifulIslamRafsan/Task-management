import * as z from "zod";

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  projectId: z.string().optional(),
  assigneeId: z.string().optional(),
  priority: z.enum(["Low", "Medium", "High"]).optional(),
  status: z.enum(["Pending", "In Progress", "Done"]).optional(),
  dueDate: z.string().optional(),
});

export type UpdateTaskFormData = z.infer<typeof updateTaskSchema>;
