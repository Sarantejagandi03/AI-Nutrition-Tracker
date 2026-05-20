import api from "./api.js";

export const getGoal = async () => {
  const { data: goal } = await api.get("/goals");
  return goal;
};

export const updateGoal = async (goalPayload) => {
  const { data: goal } = await api.put("/goals", goalPayload);
  return goal;
};
