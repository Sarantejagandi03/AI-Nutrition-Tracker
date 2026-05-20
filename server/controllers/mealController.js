import asyncHandler from "../utils/asyncHandler.js";
import { createAIMeal, createBarcodeMeal, createDatabaseMeal, createManualMeal, deleteMeal, listMeals } from "../services/mealService.js";

export const getMeals = asyncHandler(async (req, res) => {
  const meals = await listMeals(req.user._id, req.query);
  res.json(meals);
});

export const addManualMeal = asyncHandler(async (req, res) => {
  const createdMeal = await createManualMeal(req.user._id, req.body);
  res.status(201).json(createdMeal);
});

export const addBarcodeMeal = asyncHandler(async (req, res) => {
  const createdMeal = await createBarcodeMeal(req.user._id, req.body);
  res.status(201).json(createdMeal);
});

export const addDatabaseMeal = asyncHandler(async (req, res) => {
  const createdMeal = await createDatabaseMeal(req.user._id, req.body);
  res.status(201).json(createdMeal);
});

export const addAIMeal = asyncHandler(async (req, res) => {
  const createdMeal = await createAIMeal(req.user._id, req.body);
  res.status(201).json(createdMeal);
});

export const removeMeal = asyncHandler(async (req, res) => {
  const meal = await deleteMeal(req.user._id, req.params.id);
  res.json({ message: "Meal deleted", meal });
});
