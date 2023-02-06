import express from "express";
import { createContract, getContract, getContracts } from "../controllers/contract.js";
import getProfile from "../middlewares/getProfile.js";

const router = express.Router();

router.route("/").get(getProfile,getContracts);

router.route("/:id").get(getProfile, getContract);
export default router;
