import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    calories: {
      type: Number,
      default: 2200,
      min: 0
    },
    protein: {
      type: Number,
      default: 120,
      min: 0
    },
    carbs: {
      type: Number,
      default: 250,
      min: 0
    },
    fats: {
      type: Number,
      default: 70,
      min: 0
    },
    waterMl: {
      type: Number,
      default: 2500,
      min: 0
    },
    weightKg: {
      type: Number,
      min: 0
    },
    targetWeightKg: {
      type: Number,
      min: 0
    },
    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "athlete"],
      default: "moderate"
    }
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
