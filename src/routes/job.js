import express from "express";
import {
  createJob,
  getJobs,
  getUnpaidJobs,
  payForJob,
} from "../controllers/job.js";
import getProfile from "../middlewares/getProfile.js";

const router = express.Router();

router.route("/").get(getJobs).post(createJob);

router.route("/unpaid").get(getProfile, getUnpaidJobs);

router.route("/:job_id/pay").post(getProfile, payForJob);

export default router;
