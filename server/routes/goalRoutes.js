import express from "express";
import { getUserGoal, updateUserGoal } from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getUserGoal);
router.put("/", updateUserGoal);

export default router;
