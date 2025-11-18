import { Model, Types } from "mongoose";

export interface TProject {
  name: string;
  description?: string;
  team: Types.ObjectId; 
  owner: Types.ObjectId; 
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectModel extends Model<TProject> {
  isProjectExist(id: string): Promise<TProject | null>;
}
