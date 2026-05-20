import asyncHandler from "../utils/asyncHandler.js";
import { addWaterLog } from "../services/waterService.js";

export const addWater = asyncHandler(async (req, res) => {
  const waterLog = await addWaterLog(req.user._id, req.body);
  res.status(201).json(waterLog);
});
