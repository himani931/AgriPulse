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

// POST: Register a new Mandi center
router.post('/add-mandi', async (req, res) => {
  try {
    const { 
      name, 
      location, 
      lat, 
      lng, 
      dailyCapacityQuintals, 
      acceptedCommodities, 
      avgWaitMinutes 
    } = req.body;

    if (!name || !location || !lat || !lng) {
      return res.status(400).json({ error: 'Name, location, and coordinates are required.' });
    }

    const newMandi = new Mandi({
      name,
      location,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      },
      dailyCapacityQuintals: Number(dailyCapacityQuintals) || 500,
      remainingCapacityQuintals: Number(dailyCapacityQuintals) || 500,
      availableSlotsCount: 50,
      avgWaitMinutes: Number(avgWaitMinutes) || 15,
      status: 'Available',
      acceptedCommodities: acceptedCommodities && acceptedCommodities.length > 0 
        ? acceptedCommodities 
        : ['Wheat', 'Mustard']
    });

    const savedMandi = await newMandi.save();
    res.status(201).json(savedMandi);
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
// Get slot details by QR Token or Mongo ID
router.get('/slot/:token', async (req, res) => {
  try {
    const slot = await SlotRequest.findOne({ 
      $or: [{ qrToken: req.params.token }, { _id: req.params.token }] 
    }).populate('mandiId');
    if (!slot) return res.status(404).json({ error: 'Token not found' });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update slot status (e.g., Arrived, Weighment Done, Completed)
router.patch('/slot/:id/update-status', async (req, res) => {
  try {
    const { status, recordedWeight, qualityGrade } = req.body;
    const updateData = { status };

    if (recordedWeight) {
      updateData.quantityQuintals = recordedWeight;
      updateData.totalPayable = recordedWeight * 2585; // Recalculate MSP payout
    }

    const updatedSlot = await SlotRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedSlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const LedgerEvent = require('../models/LedgerEvent');

// Get audit ledger events
router.get('/ledger', async (req, res) => {
  try {
    const events = await LedgerEvent.find().sort({ timestamp: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
