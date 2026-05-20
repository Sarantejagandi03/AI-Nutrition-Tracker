import api from "./api.js";

export const register = async (registerPayload) => {
  const { data: session } = await api.post("/auth/register", registerPayload);
  return session;
};

export const login = async (loginPayload) => {
  const { data: session } = await api.post("/auth/login", loginPayload);
  return session;
};

export const getMe = async () => {
  const { data: userProfile } = await api.get("/auth/me");
  return userProfile;
};
