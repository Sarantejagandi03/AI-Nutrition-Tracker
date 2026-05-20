import WaterLog from "../models/WaterLog.js";
import dayBounds from "../utils/dayBounds.js";

export const addWaterLog = async (userId, waterPayload) => {
  if (!waterPayload.amountMl || Number(waterPayload.amountMl) <= 0) {
    const error = new Error("Water amount must be greater than zero");
    error.statusCode = 400;
    throw error;
  }

  return WaterLog.create({
    user: userId,
    amountMl: Number(waterPayload.amountMl),
    consumedAt: waterPayload.consumedAt || new Date()
  });
};

export const getWaterTotal = async (userId, dateValue = new Date()) => {
  const { start, end } = dayBounds(dateValue);

  const [dailyWater] = await WaterLog.aggregate([
    {
      $match: {
        user: userId,
        consumedAt: { $gte: start, $lt: end }
      }
    },
    {
      $group: {
        _id: null,
        waterMl: { $sum: "$amountMl" }
      }
    }
  ]);

  return dailyWater?.waterMl || 0;
};
