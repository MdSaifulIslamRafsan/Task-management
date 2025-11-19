import express from "express";
import { UserRoutes } from "../ modules/User/user.route";
import { AuthRoutes } from "../ modules/Auth/AuthRoutes";
import { ProjectRoutes } from "../ modules/project/project.route";
import { teamRoutes } from "../ modules/team/team.route";

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
    route: teamRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
