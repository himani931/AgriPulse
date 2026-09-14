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
router.post("/add-mandi", async (req, res) => {
  try {
    const {
      name,
      location,
      lat,
      lng,
      dailyCapacityQuintals,
      acceptedCommodities,
      avgWaitMinutes,
    } = req.body;

    if (!name || !location || !lat || !lng) {
      return res
        .status(400)
        .json({ error: "Name, location, and coordinates are required." });
    }

    const newMandi = new Mandi({
      name,
      location,
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      dailyCapacityQuintals: Number(dailyCapacityQuintals) || 500,
      remainingCapacityQuintals: Number(dailyCapacityQuintals) || 500,
      availableSlotsCount: 50,
      avgWaitMinutes: Number(avgWaitMinutes) || 15,
      status: "Available",
      acceptedCommodities:
        acceptedCommodities && acceptedCommodities.length > 0
          ? acceptedCommodities
          : ["Wheat", "Mustard"],
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
    res.status(201).json({
      message: "Slot request submitted successfully",
      request: newRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get slot details by QR Token or Mongo ID
router.get("/slot/:token", async (req, res) => {
  try {
    const slot = await SlotRequest.findOne({
      $or: [{ qrToken: req.params.token }, { _id: req.params.token }],
    }).populate("mandiId");
    if (!slot) return res.status(404).json({ error: "Token not found" });
    res.json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update slot status (e.g., Arrived, Weighment Done, Completed)
router.patch("/slot/:id/update-status", async (req, res) => {
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
      { new: true },
    );
    res.json(updatedSlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const LedgerEvent = require("../models/LedgerEvent");

// Get audit ledger events
router.get("/ledger", async (req, res) => {
  try {
    const events = await LedgerEvent.find().sort({ timestamp: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Verify and Check-In Farmer Token via QR / Ref
router.post("/check-in-token", async (req, res) => {
  try {
    const { tokenRef } = req.body;

    // Find slot request by token reference or ID
    const slot = await SlotRequest.findOne({
      $or: [
        { tokenRef: tokenRef },
        { _id: tokenRef.match(/^[0-9a-fA-F]{24}$/) ? tokenRef : null },
      ],
    });

    if (!slot) {
      return res
        .status(404)
        .json({ error: "Invalid Token. No matching procurement slot found." });
    }

    if (slot.status === "Completed") {
      return res
        .status(400)
        .json({ error: "Token already processed and closed." });
    }

    slot.status = "Arrived";
    slot.checkInTime = new Date();
    await slot.save();

    res.json({
      success: true,
      message: "Farmer successfully checked in at yard gate!",
      slot,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Process Weighbridge Scale & Calculate Net MSP Settlement
router.post("/weighbridge-process", async (req, res) => {
  try {
    const {
      tokenRef,
      grossWeightQuintals,
      tareWeightQuintals,
      moisturePercent,
      commodity,
    } = req.body;

    const netWeight = Number(
      (grossWeightQuintals - (tareWeightQuintals || 0)).toFixed(2),
    );

    // Official Gazette MSP Floor Rates mapping
    const mspRates = { Wheat: 2585, Mustard: 5950, Gram: 5650, Paddy: 2320 };
    const ratePerQtl = mspRates[commodity] || 2585;

    const grossValue = netWeight * ratePerQtl;

    // Optimal Moisture Thresholds: Wheat = 12.0%, Mustard = 8.0%, Paddy = 17.0%
    const maxMoisture =
      commodity === "Mustard" ? 8.0 : commodity === "Paddy" ? 17.0 : 12.0;
    const isMoistureHigh = moisturePercent > maxMoisture;
    const moisturePenaltyPct = isMoistureHigh
      ? Number(((moisturePercent - maxMoisture) * 0.75).toFixed(2))
      : 0;

    const deductionAmount = Math.round((grossValue * moisturePenaltyPct) / 100);
    const totalPayable = grossValue - deductionAmount;

    // Generate Audit Ledger Entry
    const auditRecord = {
      tokenRef:
        tokenRef || `AP-MB-${Math.floor(100000 + Math.random() * 900000)}`,
      commodity,
      netWeightQuintals: netWeight,
      ratePerQuintal: ratePerQtl,
      grossValue,
      moisturePercent,
      deductionAmount,
      totalPayable,
      dbtStatus: "Dispatched",
      timestamp: new Date(),
      cryptographicHash:
        "0x" +
        Array.from({ length: 32 }, () =>
          Math.floor(Math.random() * 16).toString(16),
        ).join(""),
    };

    res.json({
      success: true,
      message:
        "Weighbridge log processed and DBT ledger generated successfully!",
      auditRecord,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: AI Smart Recommendation for Mandi Selection based on proximity and wait times
router.get("/recommend", async (req, res) => {
  try {
    const { lat, lng, commodity } = req.query;

    if (!lat || !lng || !commodity) {
      return res
        .status(400)
        .json({ error: "Latitude, longitude, and commodity are required." });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // Find mandis that accept the commodity
    let mandis = await Mandi.find({
      acceptedCommodities: { $regex: new RegExp(commodity, "i") },
    });

    // Fallback to all mandis if no exact commodity match is found
    if (!mandis || mandis.length === 0) {
      mandis = await Mandi.find();
      if (!mandis || mandis.length === 0) {
        return res
          .status(404)
          .json({ error: "No active mandi centers found." });
      }
    }

    const scoredMandis = mandis.map((mandi) => {
      const mandiCoords = mandi.coordinates || { lat: 28.6139, lng: 77.209 };

      // Calculate approximate distance in kilometers
      const dLat = mandiCoords.lat - userLat;
      const dLng = mandiCoords.lng - userLng;
      const distanceKm = Math.sqrt(dLat * dLat + dLng * dLng) * 111;

      // Scoring breakdown: Distance (50%), Wait Time (30%), Capacity (20%)
      const distanceScore = Math.max(0, 100 - distanceKm * 2);
      const waitTimeScore = Math.max(
        0,
        100 - (mandi.avgWaitMinutes || 15) * 1.5,
      );
      const capacityScore = Math.min(
        100,
        ((mandi.remainingCapacityQuintals || 500) /
          (mandi.dailyCapacityQuintals || 500)) *
          100,
      );

      const totalScore =
        distanceScore * 0.5 + waitTimeScore * 0.3 + capacityScore * 0.2;

      return {
        ...mandi.toObject(),
        distanceKm: Number(distanceKm.toFixed(1)),
        suitabilityScore: Math.round(totalScore),
      };
    });

    // Sort by highest suitability score and return top match
    scoredMandis.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
    res.json(scoredMandis[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
