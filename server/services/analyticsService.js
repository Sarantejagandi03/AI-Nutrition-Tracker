import Analytics from "../models/Analytics.js";
import { getGoal } from "./goalService.js";
import { getMealTotals } from "./mealService.js";
import { getWaterTotal } from "./waterService.js";

const startOfDay = (dateValue = new Date()) => {
  const date = new Date(dateValue);
  date.setHours(0, 0, 0, 0);
  return date;
};

const percent = (value, target) => {
  if (!target) {
    return 0;
  }

  return Math.min(100, Math.round((value / target) * 100));
};

export const getDailySummary = async (userId, date) => {
  const [goals, mealTotals, waterMl] = await Promise.all([getGoal(userId), getMealTotals(userId, date), getWaterTotal(userId, date)]);
  const analyticsDate = startOfDay(date || new Date());
  const analytics = await Analytics.findOneAndUpdate(
    { user: userId, date: analyticsDate },
    {
      calories: mealTotals.calories,
      protein: mealTotals.protein,
      carbs: mealTotals.carbs,
      fats: mealTotals.fats,
      waterMl
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return {
    date: analytics.date,
    totals: {
      ...mealTotals,
      waterMl
    },
    goals,
    progress: {
      calories: percent(mealTotals.calories, goals.calories),
      protein: percent(mealTotals.protein, goals.protein),
      carbs: percent(mealTotals.carbs, goals.carbs),
      fats: percent(mealTotals.fats, goals.fats),
      waterMl: percent(waterMl, goals.waterMl)
    }
  };
};
