import { z } from "zod";

const createTaskValidation = z.object({
  body: z.object({
    title: z.string().nonempty("Task title is required"),
    description: z.string().nonempty("Task description is required"),
    projectId: z.string().nonempty("Project ID is required"),
    assigneeId: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]).default("Medium"),
    status: z.enum(["Pending", "In Progress", "Done"]).default("Pending"),
    dueDate: z.string().optional(),
  }),
});

const updateTaskStatusValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    projectId: z.string().optional(),
    assigneeId: z.string().optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    status: z.enum(["Pending", "In Progress", "Done"]).optional(),
    dueDate: z.string().optional(),
  }),
});

export const TaskValidation = {
  createTaskValidation,
  updateTaskStatusValidation,
};
