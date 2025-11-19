import mongoose from "mongoose";
import { TTeam, TeamModel } from "./team.interface";

const teamSchema = new mongoose.Schema<TTeam>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    }],
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