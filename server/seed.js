const mongoose = require("mongoose");
require("dotenv").config();
const Mandi = require("./models/Mandi");

const mockMandis = [
  {
    name: "Anaj Mandi Procurement Center",
    location: "Karnal, Haryana",
    distanceKm: 18,
    status: "Available",
    acceptedCommodities: ["Wheat", "Mustard", "Paddy"],
    dailyCapacityQuintals: 500,
    remainingCapacityQuintals: 320,
    availableSlotsCount: 87,
    avgWaitMinutes: 12,
    coordinates: { lat: 29.6857, lng: 76.9905 },
  },
  {
    name: "Grain Market Hub",
    location: "Kurukshetra, Haryana",
    distanceKm: 32,
    status: "Limited Capacity",
    acceptedCommodities: ["Wheat", "Gram"],
    dailyCapacityQuintals: 400,
    remainingCapacityQuintals: 80,
    availableSlotsCount: 15,
    avgWaitMinutes: 45,
    coordinates: { lat: 29.9695, lng: 76.8783 },
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Mandi.deleteMany({});
    await Mandi.insertMany(mockMandis);
    console.log("🌱 Database seeded with sample Mandis!");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
