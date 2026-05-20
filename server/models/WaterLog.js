import mongoose from "mongoose";

const waterLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    amountMl: {
      type: Number,
      required: true,
      min: 0
    },
    consumedAt: {
      type: Date,
      default: Date.now,
      index: true
    }
  },
  { timestamps: true }
);

const WaterLog = mongoose.model("WaterLog", waterLogSchema);

export default WaterLog;
