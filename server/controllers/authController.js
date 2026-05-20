import asyncHandler from "../utils/asyncHandler.js";
import { getCurrentUser, loginUser, registerUser } from "../services/authService.js";

export const register = asyncHandler(async (req, res) => {
  const session = await registerUser(req.body);
  res.status(201).json(session);
});

export const login = asyncHandler(async (req, res) => {
  const session = await loginUser(req.body);
  res.json(session);
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: getCurrentUser(req.user) });
});
