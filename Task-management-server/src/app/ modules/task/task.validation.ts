import { z } from "zod";

const createTaskValidation = z.object({
  body: z.object({
    title: z.string().nonempty("Task title is required"),
    description: z.string().optional(),
    projectId: z.string().nonempty("Project ID is required"),
    assignedTo: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
    status: z.enum(["Pending", "In Progress", "Completed"]).default("Pending"),
    dueDate: z.string().optional(),
  }),
});

const updateTaskStatusValidation = z.object({
  body: z.object({
    status: z.enum(["Pending", "In Progress", "Completed"]),
  }),
});

export const TaskValidation = {
  createTaskValidation,
  updateTaskStatusValidation,
};
