import api from "./api.js";

export const addWater = async (waterPayload) => {
  const { data: waterLog } = await api.post("/water", waterPayload);
  return waterLog;
};
