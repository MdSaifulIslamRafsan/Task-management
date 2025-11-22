import mongoose from "mongoose";
import { TActivityLog } from "./activity.interface";

const activityLogSchema = new mongoose.Schema<TActivityLog>({
  type: {
    type: String,
    required: true,
    enum: ["reassignment", "warning", "completion", "creation"],
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
});

export const ActivityLog = mongoose.model<TActivityLog>(
  "ActivityLog",
  activityLogSchema
);
