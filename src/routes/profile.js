import express from "express";
import { createProfile, getUserProfile } from "../controllers/profile.js";
import getProfile from "../middlewares/getProfile.js";

const router = express.Router();
router.route("/").get(getProfile, getUserProfile).post(createProfile);

export default router;
