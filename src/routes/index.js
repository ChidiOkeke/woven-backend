import { Router } from "express";
import contractRoute from "./contract.js";
import profileRoute from "./profile.js";
import jobRoute from "./job.js";

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
    path: "/job",
    route: jobRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
