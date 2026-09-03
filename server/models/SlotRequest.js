const mongoose = require("mongoose");

const slotRequestSchema = new mongoose.Schema(
  {
    mandiId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mandi",
      required: true,
    },
    farmerName: { type: String, required: true },
    farmerPhone: { type: String, required: true },
    commodity: { type: String, required: true },
    quantityQuintals: { type: Number, required: true },
    slotTime: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Completed"],
      default: "Pending",
    },
    qrToken: { type: String, default: "" },
    mspPerQuintal: { type: Number, default: 2585 },
    totalPayable: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["Processing", "Credited", "Delayed", "Failed"],
      default: "Processing",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SlotRequest", slotRequestSchema);
