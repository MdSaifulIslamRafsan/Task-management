import { Project } from "../project/project.model";
import { Task } from "../task/task.model";
import { Team } from "../team/team.model";

const getDashboardMetricsFromDB = async () => {
  const totalProjects = await Project.countDocuments();
  const totalTasks = await Task.countDocuments();
  const totalTeams = await Team.countDocuments();

  return {
    totalTasks,
    totalTeams,
    totalProjects,
  };
};

export const dashboardService = {
  getDashboardMetricsFromDB,
};
