import Goal from "../models/Goal.js";

const allowedFields = ["calories", "protein", "carbs", "fats", "waterMl", "weightKg", "targetWeightKg", "activityLevel"];

export const getGoal = async (userId) => {
  return Goal.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
};

export const updateGoal = async (userId, goalPayload) => {
  const updates = {};

  allowedFields.forEach((field) => {
    if (goalPayload[field] !== undefined && goalPayload[field] !== "") {
      updates[field] = goalPayload[field];
    }
  });

  return Goal.findOneAndUpdate({ user: userId }, updates, {
    new: true,
    upsert: true,
    runValidators: true,
    setDefaultsOnInsert: true
  });
};
