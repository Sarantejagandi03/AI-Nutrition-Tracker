import express from "express";
import { addAIMeal, addBarcodeMeal, addDatabaseMeal, addManualMeal, getMeals, removeMeal } from "../controllers/mealController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getMeals);
router.post("/manual", addManualMeal);
router.post("/barcode", addBarcodeMeal);
router.post("/lookup", addDatabaseMeal);
router.post("/analyze", addAIMeal);
router.delete("/:id", removeMeal);

export default router;
