import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as authApi from "../services/authService.js";

const storedUser = localStorage.getItem("nutrition_user");
const storedToken = localStorage.getItem("nutrition_token");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
  status: "idle",
  error: null
};

const persistSession = (session) => {
  localStorage.setItem("nutrition_token", session.token);
  localStorage.setItem("nutrition_user", JSON.stringify(session.user));
};

export const registerUser = createAsyncThunk("auth/register", async (registerPayload, { rejectWithValue }) => {
  try {
    return await authApi.register(registerPayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (loginPayload, { rejectWithValue }) => {
  try {
    return await authApi.login(loginPayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("nutrition_user");
      localStorage.removeItem("nutrition_token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        persistSession(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.token = action.payload.token;
        persistSession(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
