import { Model, Types } from "mongoose";

export interface TProject {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  teamId: Types.ObjectId;
}

export interface ProjectModel extends Model<TProject> {
  isProjectExistByName(name: string): Promise<TProject>;
}