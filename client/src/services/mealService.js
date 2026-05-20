import api from "./api.js";

export const getMeals = async (filters = {}) => {
  const { data: meals } = await api.get("/meals", { params: filters });
  return meals;
};

export const addManualMeal = async (mealPayload) => {
  const { data: meal } = await api.post("/meals/manual", mealPayload);
  return meal;
};

export const lookupMeal = async (lookupPayload) => {
  const { data: meal } = await api.post("/meals/lookup", lookupPayload);
  return meal;
};

export const analyzeMeal = async (promptPayload) => {
  const { data: meal } = await api.post("/meals/analyze", promptPayload);
  return meal;
};

export const addBarcodeMeal = async (barcodePayload) => {
  const { data: meal } = await api.post("/meals/barcode", barcodePayload);
  return meal;
};

export const deleteMeal = async (id) => {
  const { data: deleteResult } = await api.delete(`/meals/${id}`);
  return deleteResult;
};

export const getSummary = async (filters = {}) => {
  const { data: summary } = await api.get("/analytics/summary", { params: filters });
  return summary;
};
