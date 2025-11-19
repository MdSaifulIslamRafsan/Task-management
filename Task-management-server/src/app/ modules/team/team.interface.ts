import { Model, Types } from "mongoose";

export interface TTeam {
  _id: Types.ObjectId;
  name: string;
  members: Types.ObjectId[];
}

export interface TeamModel extends Model<TTeam> {
  isTeamExistByName(name: string): Promise<TTeam>;
}