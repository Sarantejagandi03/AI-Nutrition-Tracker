import Meal from "../models/Meal.js";
import dayBounds from "../utils/dayBounds.js";
import { analyzeMealWithAI } from "./aiService.js";
import { estimateManualMealNutrition, lookupBarcodeNutrition, lookupMealNutritionByName } from "./nutritionService.js";

const macroFields = ["calories", "protein", "carbs", "fats"];

const normalizeMacroPayload = (mealPayload) => ({
  calories: Math.max(0, Math.round(Number(mealPayload.calories) || 0)),
  protein: Math.max(0, Number(mealPayload.protein) || 0),
  carbs: Math.max(0, Number(mealPayload.carbs) || 0),
  fats: Math.max(0, Number(mealPayload.fats) || 0)
});

const hasCompleteMacros = (mealPayload) => macroFields.every((field) => mealPayload[field] !== undefined && mealPayload[field] !== "");

export const createManualMeal = async (userId, mealPayload) => {
  if (!mealPayload.name) {
    const error = new Error("Meal name is required");
    error.statusCode = 400;
    throw error;
  }

  const nutrition = hasCompleteMacros(mealPayload) ? normalizeMacroPayload(mealPayload) : await estimateManualMealNutrition(mealPayload);

  return Meal.create({
    user: userId,
    name: mealPayload.name,
    description: mealPayload.description,
    source: "manual",
    mealType: mealPayload.mealType || "snack",
    servingSize: mealPayload.servingSize || nutrition.servingSize || "1 serving",
    consumedAt: mealPayload.consumedAt || new Date(),
    ...nutrition
  });
};

export const createBarcodeMeal = async (userId, barcodePayload) => {
  const nutrition = await lookupBarcodeNutrition(barcodePayload.barcode);

  return Meal.create({
    user: userId,
    name: nutrition.name,
    barcode: barcodePayload.barcode,
    source: "barcode",
    mealType: barcodePayload.mealType || "snack",
    servingSize: nutrition.servingSize,
    consumedAt: barcodePayload.consumedAt || new Date(),
    calories: nutrition.calories,
    protein: nutrition.protein,
    carbs: nutrition.carbs,
    fats: nutrition.fats
  });
};

export const createDatabaseMeal = async (userId, lookupPayload) => {
  const searchTerm = lookupPayload.name || lookupPayload.query;
  const nutrition = await lookupMealNutritionByName(searchTerm);

  return Meal.create({
    user: userId,
    name: nutrition.name,
    barcode: nutrition.barcode,
    source: "database",
    mealType: lookupPayload.mealType || "snack",
    servingSize: nutrition.servingSize,
    consumedAt: lookupPayload.consumedAt || new Date(),
    calories: nutrition.calories,
    protein: nutrition.protein,
    carbs: nutrition.carbs,
    fats: nutrition.fats
  });
};

export const createAIMeal = async (userId, aiPayload) => {
  const mealAnalysis = await analyzeMealWithAI(aiPayload.description);

  return Meal.create({
    user: userId,
    name: mealAnalysis.name,
    description: aiPayload.description,
    source: "ai",
    mealType: aiPayload.mealType || "snack",
    servingSize: mealAnalysis.servingSize,
    consumedAt: aiPayload.consumedAt || new Date(),
    calories: mealAnalysis.calories,
    protein: mealAnalysis.protein,
    carbs: mealAnalysis.carbs,
    fats: mealAnalysis.fats
  });
};

export const listMeals = async (userId, filters = {}) => {
  const mealFilter = { user: userId };

  if (filters.date) {
    const { start, end } = dayBounds(filters.date);
    mealFilter.consumedAt = { $gte: start, $lt: end };
  }

  return Meal.find(mealFilter).sort({ consumedAt: -1, createdAt: -1 });
};

export const deleteMeal = async (userId, mealId) => {
  const meal = await Meal.findOneAndDelete({ _id: mealId, user: userId });

  if (!meal) {
    const error = new Error("Meal not found");
    error.statusCode = 404;
    throw error;
  }

  return meal;
};

export const getMealTotals = async (userId, dateValue = new Date()) => {
  const { start, end } = dayBounds(dateValue);

  const [dailyTotals] = await Meal.aggregate([
    {
      $match: {
        user: userId,
        consumedAt: { $gte: start, $lt: end }
      }
    },
    {
      $group: {
        _id: null,
        calories: { $sum: "$calories" },
        protein: { $sum: "$protein" },
        carbs: { $sum: "$carbs" },
        fats: { $sum: "$fats" },
        count: { $sum: 1 }
      }
    }
  ]);

  return {
    calories: Math.round(dailyTotals?.calories || 0),
    protein: Math.round((dailyTotals?.protein || 0) * 10) / 10,
    carbs: Math.round((dailyTotals?.carbs || 0) * 10) / 10,
    fats: Math.round((dailyTotals?.fats || 0) * 10) / 10,
    count: dailyTotals?.count || 0
  };
};
