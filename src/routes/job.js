import express from "express";
import { getJob } from "../controllers/job.js";

const router = express.Router();

router.route("/").get(getJob);

export default router;
