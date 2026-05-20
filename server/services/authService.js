import User from "../models/User.js";
import Goal from "../models/Goal.js";
import generateToken from "../utils/generateToken.js";

const toSessionUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email
});

export const registerUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    const error = new Error("Name, email, and password are required");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const user = await User.create({ name, email, password });
  await Goal.create({ user: user._id });

  return {
    user: toSessionUser(user),
    token: generateToken(user._id)
  };
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  return {
    user: toSessionUser(user),
    token: generateToken(user._id)
  };
};

export const getCurrentUser = (user) => toSessionUser(user);
