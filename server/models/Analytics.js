import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    date: {
      type: Date,
      required: true,
      index: true
    },
    calories: {
      type: Number,
      default: 0
    },
    protein: {
      type: Number,
      default: 0
    },
    carbs: {
      type: Number,
      default: 0
    },
    fats: {
      type: Number,
      default: 0
    },
    waterMl: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

analyticsSchema.index({ user: 1, date: 1 }, { unique: true });

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
