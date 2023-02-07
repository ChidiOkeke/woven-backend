import { Router } from "express";
import contractRoute from "./contract.js";
import profileRoute from "./profile.js";
import jobRoute from "./job.js";
import adminRoute from "./admin.js";

const router = Router();

const defaultRoutes = [
  {
    path: "/contracts",
    route: contractRoute,
  },
  {
    path: "/profile",
    route: profileRoute,
  },
  {
    path: "/jobs",
    route: jobRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
