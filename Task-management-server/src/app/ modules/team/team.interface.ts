import { Model, Types } from "mongoose";

export interface TMember {
  _id?: Types.ObjectId;
  name: string;
  role: string;
  capacity: number; 
  currentTaskCount?: number; 
}

export interface TTeam {
  _id?: Types.ObjectId;
  ownerId: Types.ObjectId;
  name: string;
  members: TMember[];
}

export type TeamModel = Model<TTeam>;
