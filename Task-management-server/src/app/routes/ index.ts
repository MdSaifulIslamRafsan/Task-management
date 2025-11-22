import express from "express";
import { UserRoutes } from "../ modules/User/user.route";
import { AuthRoutes } from "../ modules/Auth/AuthRoutes";
import { ProjectRoutes } from "../ modules/project/project.route";

import { TaskRoutes } from "../ modules/task/task.route";
import { TeamRoutes } from "../ modules/team/team.route";
import { MemberRoutes } from "../ modules/member/member.route";
import { DashboardRoutes } from "../ modules/dashboard/dashboard.route";

import { ActivityRoutes } from "../ modules/activity/activity.route";
import { ReassignmentRoutes } from "../ modules/reassignment/reassignment.route";

const router = express.Router();

const modulesRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/project",
    route: ProjectRoutes,
  },
  {
    path: "/team",
    route: TeamRoutes,
  },
  {
    path: "/task",
    route: TaskRoutes,
  },
  {
    path: "/member",
    route: MemberRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
  {
    path: "/activity",
    route: ActivityRoutes,
  },
  {
    path: "/reassignment",
    route: ReassignmentRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
