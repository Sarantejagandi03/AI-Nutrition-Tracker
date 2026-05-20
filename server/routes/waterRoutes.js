import express from "express";
import { addWater } from "../controllers/waterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.post("/", addWater);

export default router;
