import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as mealApi from "../services/mealService.js";
import * as waterApi from "../services/waterService.js";

const initialState = {
  items: [],
  summary: null,
  status: "idle",
  actionStatus: "idle",
  error: null
};

export const fetchMeals = createAsyncThunk("meals/fetchMeals", async (filters, { rejectWithValue }) => {
  try {
    return await mealApi.getMeals(filters);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchSummary = createAsyncThunk("meals/fetchSummary", async (filters, { rejectWithValue }) => {
  try {
    return await mealApi.getSummary(filters);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createManualMeal = createAsyncThunk("meals/createManual", async (mealPayload, { rejectWithValue }) => {
  try {
    return await mealApi.addManualMeal(mealPayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createDatabaseMeal = createAsyncThunk("meals/createDatabase", async (lookupPayload, { rejectWithValue }) => {
  try {
    return await mealApi.lookupMeal(lookupPayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createAIMeal = createAsyncThunk("meals/createAI", async (promptPayload, { rejectWithValue }) => {
  try {
    return await mealApi.analyzeMeal(promptPayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createBarcodeMeal = createAsyncThunk("meals/createBarcode", async (barcodePayload, { rejectWithValue }) => {
  try {
    return await mealApi.addBarcodeMeal(barcodePayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const removeMeal = createAsyncThunk("meals/removeMeal", async (id, { rejectWithValue }) => {
  try {
    await mealApi.deleteMeal(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const logWater = createAsyncThunk("meals/logWater", async (waterPayload, { rejectWithValue }) => {
  try {
    return await waterApi.addWater(waterPayload);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(createManualMeal.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(createManualMeal.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createManualMeal.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      .addCase(createDatabaseMeal.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(createDatabaseMeal.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createDatabaseMeal.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      .addCase(createAIMeal.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(createAIMeal.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createAIMeal.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      .addCase(createBarcodeMeal.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(createBarcodeMeal.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(createBarcodeMeal.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      .addCase(removeMeal.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(removeMeal.fulfilled, (state, action) => {
        state.actionStatus = "succeeded";
        state.items = state.items.filter((meal) => meal._id !== action.payload);
      })
      .addCase(removeMeal.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      })
      .addCase(logWater.pending, (state) => {
        state.actionStatus = "loading";
        state.error = null;
      })
      .addCase(logWater.fulfilled, (state) => {
        state.actionStatus = "succeeded";
      })
      .addCase(logWater.rejected, (state, action) => {
        state.actionStatus = "failed";
        state.error = action.payload;
      });
  }
});

export default mealsSlice.reducer;
