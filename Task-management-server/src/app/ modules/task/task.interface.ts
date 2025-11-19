import { Model, Types } from "mongoose";

export type TPriority = "Low" | "Medium" | "High";
export type TStatus = "Pending" | "In Progress" | "Completed";

export interface TTask {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  projectId: Types.ObjectId;
  assignedTo?: Types.ObjectId;
  priority: TPriority;
  status: TStatus;
  dueDate?: Date;
}

export interface TaskModel extends Model<TTask> {
  isTaskExistByTitle(title: string): Promise<TTask>;
}
