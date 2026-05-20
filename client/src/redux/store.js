import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import goalsReducer from "./goalsSlice.js";
import mealsReducer from "./mealsSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meals: mealsReducer,
    goals: goalsReducer
  }
});
