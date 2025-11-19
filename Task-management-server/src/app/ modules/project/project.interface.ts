import { Model, Types } from "mongoose";

export type TProjectStatus = "active" | "completed" | "on-hold";

export interface TProject {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  teamId: Types.ObjectId;
  status: TProjectStatus;
}

export interface ProjectModel extends Model<TProject> {
  isProjectExistByName(name: string): Promise<TProject>;
}