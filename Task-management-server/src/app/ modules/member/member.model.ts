import mongoose from "mongoose";
import { TMember, MemberModel } from "./member.interface";

const memberSchema = new mongoose.Schema<TMember>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    currentLoad: {
      type: Number,
      default: 0,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  { timestamps: true }
);

memberSchema.static(
  "isMemberExistByName",
  async function isMemberExistByName(name: string) {
    const existingMember = await Member.findOne({ name });
    return existingMember;
  }
);

export const Member = mongoose.model<TMember, MemberModel>(
  "Member",
  memberSchema
);
