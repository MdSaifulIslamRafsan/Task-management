import mongoose from "mongoose";
import { TTask, TaskModel } from "./task.interface";

const taskSchema = new mongoose.Schema<TTask>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    assignedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Done"],
      default: "Pending",
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

taskSchema.static(
  "isTaskExistByTitle",
  async function isTaskExistByTitle(title: string) {
    const existingTask = await Task.findOne({ title });
    return existingTask;
  }
);

export const Task = mongoose.model<TTask, TaskModel>("Task", taskSchema);