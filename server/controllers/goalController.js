import asyncHandler from "../utils/asyncHandler.js";
import { getGoal, updateGoal } from "../services/goalService.js";

export const getUserGoal = asyncHandler(async (req, res) => {
  const currentGoal = await getGoal(req.user._id);
  res.json(currentGoal);
});

export const updateUserGoal = asyncHandler(async (req, res) => {
  const updatedGoal = await updateGoal(req.user._id, req.body);
  res.json(updatedGoal);
});
