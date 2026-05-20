import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as goalApi from "../services/goalService.js";

const initialState = {
  item: null,
  status: "idle",
  error: null
};

export const fetchGoal = createAsyncThunk("goals/fetchGoal", async (_, { rejectWithValue }) => {
  try {
    return await goalApi.getGoal();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const saveGoal = createAsyncThunk("goals/saveGoal", async (goalPayload, { rejectWithValue }) => {
  try {
    return await goalApi.updateGoal(goalPayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGoal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(saveGoal.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(saveGoal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(saveGoal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export default goalsSlice.reducer;
