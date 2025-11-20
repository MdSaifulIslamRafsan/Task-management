import express from "express";
import { UserRoutes } from "../ modules/User/user.route";
import { AuthRoutes } from "../ modules/Auth/AuthRoutes";
import { ProjectRoutes } from "../ modules/project/project.route";

import { TaskRoutes } from "../ modules/task/task.route";
import { TeamRoutes } from "../ modules/team/team.route";
import { MemberRoutes } from "../ modules/member/member.route";

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
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
