import { Model, Types } from "mongoose";

export interface TTeam {
  _id: Types.ObjectId;
  teamName: string;
}

export interface TeamModel extends Model<TTeam> {
  isTeamExistByName(teamName: string): Promise<TTeam>;
}
