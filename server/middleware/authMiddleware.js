import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

const getBearerToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
};

export const protect = asyncHandler(async (req, _res, next) => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    const error = new Error("Not authorized, token missing");
    error.statusCode = 401;
    throw error;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      const error = new Error("Not authorized, user not found");
      error.statusCode = 401;
      throw error;
    }

    next();
  } catch (error) {
    error.statusCode = 401;
    error.message = "Not authorized, token failed";
    throw error;
  }
});
