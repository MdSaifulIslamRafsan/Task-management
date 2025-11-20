import mongoose from "mongoose";
import { TTeam, TeamModel } from "./team.interface";

const teamSchema = new mongoose.Schema<TTeam>(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

teamSchema.static(
  "isTeamExistByName",
  async function isTeamExistByName(name: string) {
    const existingTeam = await Team.findOne({ name });
    return existingTeam;
  }
);

export const Team = mongoose.model<TTeam, TeamModel>("Team", teamSchema);
