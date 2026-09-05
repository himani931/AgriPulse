const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");
const agriData = require("../data/agriData");

router.post("/chat", async (req, res) => {
  try {
    const { prompt, language = "English" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY is not defined in .env");
      return res.status(500).json({
        error: "Server configuration error: GEMINI_API_KEY is missing in server/.env",
      });
    }

    // Initialize SDK inside the handler so the loaded environment variable is guaranteed
    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
You are "AgriPulse Saathi", an expert Indian agricultural and procurement AI advisor.
Use the verified context below to answer farmer queries accurately.
Respond in ${language === "Hindi" ? "Hindi (Devanagari script)" : "clear English with simple terminology"}.

--- OFFICIAL AGRICULTURAL CONTEXT ---
MSP DATA:
${JSON.stringify(agriData?.mspRates || [], null, 2)}

CENTRAL & STATE SCHEMES:
${JSON.stringify(agriData?.governmentSchemes || [], null, 2)}
-------------------------------------

RULES:
1. Always state exact MSP rates and scheme eligibility when asked.
2. Keep responses concise, supportive, and formatted using bold text and bullet points.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("AI Route Error Details:", error);
    res.status(500).json({
      error: error.message || "Failed to generate AI response from Gemini.",
    });
  }
});

module.exports = router;