const express = require("express");
const router = express.Router();
const Mandi = require("../models/Mandi");
const SlotRequest = require("../models/SlotRequest");

// Get all mandis
router.get("/", async (req, res) => {
  try {
    const mandis = await Mandi.find();
    res.json(mandis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a new procurement slot request
router.post("/request-slot", async (req, res) => {
  try {
    const {
      mandiId,
      farmerName,
      farmerPhone,
      commodity,
      quantityQuintals,
      slotTime,
    } = req.body;
    const mspPerQuintal = 2585; // Default MSP for Wheat
    const totalPayable = quantityQuintals * mspPerQuintal;
    const qrToken = `AP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const newRequest = new SlotRequest({
      mandiId,
      farmerName,
      farmerPhone,
      commodity,
      quantityQuintals,
      slotTime,
      mspPerQuintal,
      totalPayable,
      qrToken,
      status: "Accepted",
    });

    await newRequest.save();
    res
      .status(201)
      .json({
        message: "Slot request submitted successfully",
        request: newRequest,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
