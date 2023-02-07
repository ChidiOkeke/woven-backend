import express from "express";
import { getBestProfession, getBestClient } from "../controllers/admin.js";

const router = express.Router();

router.route("/best-profession").get(getBestProfession);
router.route("/best-client").get(getBestClient);

export default router;
