import { ActivityLog } from "./activity.model";

export const getRecentActivity = async (limit: number = 10) => {
  return await ActivityLog.find().sort({ timestamp: -1 }).limit(limit);
};

export const activityService = {
  getRecentActivity,
};
