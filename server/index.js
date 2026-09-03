const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const mandiRoutes = require("./routes/mandiRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/mandis", mandiRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("AgriPulse API is running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas (AgriPulse Database)"))
  .catch((err) => console.error(" MongoDB Connection Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
