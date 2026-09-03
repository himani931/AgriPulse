const express = require("express");
const router = express.Router();

router.post("/chat", (req, res) => {
  const { message } = req.body;
  const lowerMsg = message.toLowerCase();

  let response =
    "I'm AgriPulse Saathi. How can I help you with mandis, slot bookings, or MSP today?";

  if (
    lowerMsg.includes("gehun") ||
    lowerMsg.includes("wheat") ||
    lowerMsg.includes("msp")
  ) {
    response =
      "The official Government MSP for Wheat is ₹2,585 per quintal. For 40 quintals, your total gross payout will be ₹1,02,366.";
  } else if (
    lowerMsg.includes("mandi") ||
    lowerMsg.includes("nearest") ||
    lowerMsg.includes("pass")
  ) {
    response =
      "Anaj Mandi Procurement Center (18 km away) is currently available with 87 slots open and an estimated wait time of only 12 minutes.";
  } else if (
    lowerMsg.includes("slot") ||
    lowerMsg.includes("book") ||
    lowerMsg.includes("token")
  ) {
    response =
      "You can request a procurement slot directly from the 'Find Mandi' tab. Once accepted by the mandi operator, your QR token (e.g. AP-MB-A78291) will be generated.";
  }

  res.json({
    reply: response,
    officialSource: lowerMsg.includes("msp")
      ? "Min. of Consumer Affairs & Public Distribution (2026-27 Circular)"
      : null,
  });
});

module.exports = router;
