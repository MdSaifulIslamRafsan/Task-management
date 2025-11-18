import mongoose, { Schema } from "mongoose";
import { TMember, TTeam, TeamModel } from "./team.interface";

const memberSchema = new Schema<TMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    capacity: { type: Number, required: true, min: 0, max: 5 },
    currentTaskCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const teamSchema = new Schema<TTeam>(
  {
    ownerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    members: [memberSchema],
  },
  { timestamps: true }
);

export const Team = mongoose.model<TTeam, TeamModel>("Team", teamSchema);
