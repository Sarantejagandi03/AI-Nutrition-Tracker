import asyncHandler from "../utils/asyncHandler.js";
import { getDailySummary } from "../services/analyticsService.js";

export const getSummary = asyncHandler(async (req, res) => {
  const dailySummary = await getDailySummary(req.user._id, req.query.date);
  res.json(dailySummary);
});
