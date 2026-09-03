const mongoose = require("mongoose");

const mandiSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Available", "Limited Capacity", "Congested", "Closed"],
      default: "Available",
    },
    acceptedCommodities: [{ type: String }],
    dailyCapacityQuintals: { type: Number, required: true },
    remainingCapacityQuintals: { type: Number, required: true },
    availableSlotsCount: { type: Number, required: true },
    avgWaitMinutes: { type: Number, default: 15 },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Mandi", mandiSchema);
