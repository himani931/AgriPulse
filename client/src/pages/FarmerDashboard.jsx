import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  ArrowRight,
  QrCode,
  FileCheck,
  AlertCircle,
  Sparkles,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Advanced AI Mandi Comparison & Recommendation Hub Component
function AiMandiComparisonSection({ farmerCrop, userCoords }) {
  const navigate = useNavigate();
  const [mandisData, setMandisData] = useState([
    {
      _id: "mandi-azadpur",
      name: "Azadpur Mandi",
      location: "Azadpur, Delhi",
      coordinates: { lat: 28.7041, lng: 77.1725 },
      distanceKm: 4.2,
      avgWaitMinutes: 12,
      netPayout: "₹1,04,200",
      congestion: "Low Traffic",
      score: 96,
      badge: "Best Overall Value",
      reasons: [
        "Shortest queue clearance rate currently active",
        "Higher quality grading bonus applied (+₹1,800)",
        "Only 4.2 km from your registered coordinates",
      ],
    },
    {
      _id: "mandi-okhla",
      name: "Okhla Grain Yard",
      location: "South Delhi, Delhi",
      coordinates: { lat: 28.5355, lng: 77.261 },
      distanceKm: 9.8,
      avgWaitMinutes: 25,
      netPayout: "₹1,02,900",
      congestion: "Moderate",
      score: 82,
      badge: "Alternative Hub",
      reasons: [
        "Stable weighbridge speed",
        "Slightly longer transit distance (+5.6 km)",
      ],
    },
    {
      _id: "mandi-ghaziabad",
      name: "Sahibabad Grain Mandi",
      location: "Ghaziabad, NCR",
      coordinates: { lat: 28.6692, lng: 77.4538 },
      distanceKm: 14.5,
      avgWaitMinutes: 40,
      netPayout: "₹1,05,000",
      congestion: "High Congestion",
      score: 74,
      badge: "Max Payout / Long Wait",
      reasons: [
        "Offers highest gross incentive",
        "Estimated gate wait time exceeds 40 minutes",
      ],
    },
  ]);

  const bestMandi = mandisData[0]; // Top scored by AI

  const handleNavigateToMap = (mandi) => {
    navigate("/farmer/find-mandi", {
      state: {
        selectedMandiId: mandi._id,
        targetCoordinates: mandi.coordinates,
        mandiName: mandi.name,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 w-fit mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> AI Market
            Intelligence & Comparative Analysis
          </span>
          <h2 className="text-lg font-bold text-slate-800">
            Smart Mandi Comparison Engine for {farmerCrop || "Wheat"}
          </h2>
          <p className="text-xs text-slate-500">
            Real-time evaluation of transit distance, weighbridge congestion,
            and net MSP returns.
          </p>
        </div>
        <span className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-xl text-slate-600 self-start md:self-auto">
          Updated 2 mins ago
        </span>
      </div>

      {/* Spotlight AI Recommendation Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden space-y-4">
        <div className="absolute right-4 top-4 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-300 text-xs font-bold font-mono">
          {bestMandi.score}% Match Score — Top Recommendation
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
            {bestMandi.badge}
          </span>
          <h3 className="text-2xl font-bold mt-0.5">{bestMandi.name}</h3>
          <p className="text-xs text-slate-300 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />{" "}
            {bestMandi.location} ({bestMandi.distanceKm} km away)
          </p>
        </div>

        {/* Why Choose It Bullet Points */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/20 space-y-2">
          <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4" /> Why AI Recommends This Hub:
          </span>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {bestMandi.reasons.map((reason, idx) => (
              <li
                key={idx}
                className="text-xs text-slate-200 flex items-start gap-2 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/10"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Wait:{" "}
              {bestMandi.avgWaitMinutes} mins
            </span>
            <span className="flex items-center gap-1 font-semibold text-emerald-300">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Net
              Payout: {bestMandi.netPayout}
            </span>
          </div>
          <button
            onClick={() => handleNavigateToMap(bestMandi)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer shadow-md"
          >
            Select & Book Slot <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Comparative Matrix Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Full Regional Mandi Comparison Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Mandi Hub</th>
                <th className="p-3">Distance</th>
                <th className="p-3">Est. Wait Time</th>
                <th className="p-3">Traffic Condition</th>
                <th className="p-3">Net Payout (40 qtl)</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mandisData.map((mandi, idx) => (
                <tr
                  key={mandi._id}
                  className={idx === 0 ? "bg-emerald-50/40 font-medium" : ""}
                >
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{mandi.name}</div>
                    <div className="text-[11px] text-slate-400">
                      {mandi.location}
                    </div>
                  </td>
                  <td className="p-3 font-mono">{mandi.distanceKm} km</td>
                  <td className="p-3 font-mono text-amber-700">
                    {mandi.avgWaitMinutes} mins
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        mandi.congestion === "Low Traffic"
                          ? "bg-emerald-100 text-emerald-800"
                          : mandi.congestion === "Moderate"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {mandi.congestion}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-700">
                    {mandi.netPayout}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleNavigateToMap(mandi)}
                      className="bg-slate-100 hover:bg-emerald-700 hover:text-white text-slate-700 font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                    >
                      {idx === 0 ? "Book Recommended" : "Select"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function FarmerDashboard() {
  const [activeSlot, setActiveSlot] = useState({
    token: "AP-MB-A78291",
    mandi: "Azadpur Mandi",
    commodity: "Wheat (40 qtl)",
    date: "Today, 11:30 AM - 12:00 PM",
    status: "Accepted",
    queuePosition: 7,
    estPayout: "₹1,04,200",
  });

  const [userCoords, setUserCoords] = useState({ lat: 28.6139, lng: 77.209 });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Namaste, Ramesh Patel 👋
            </h1>
            <p className="text-sm text-slate-500">
              Mandi Hub Center | Aadhaar: [Aadhaar Redacted]
            </p>
          </div>
          <Link
            to="/farmer/find-mandi"
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            Book New Procurement Slot <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Slot Status Card */}
        {activeSlot && (
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-700/60 px-3 py-1 rounded-full text-emerald-200 border border-emerald-500/30">
                  Active Booking
                </span>
                <h2 className="text-2xl font-bold mt-2">
                  {activeSlot.commodity}
                </h2>
                <p className="text-sm text-emerald-200">{activeSlot.mandi}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-300 block">
                  Token Number
                </span>
                <span className="text-xl font-mono font-bold">
                  {activeSlot.token}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-emerald-700/50 text-sm">
              <div>
                <span className="text-xs text-emerald-300 block">
                  Slot Window
                </span>
                <span className="font-semibold flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" /> {activeSlot.date}
                </span>
              </div>
              <div>
                <span className="text-xs text-emerald-300 block">
                  Live Queue
                </span>
                <span className="font-semibold text-amber-300 mt-0.5 block">
                  Position #{activeSlot.queuePosition}
                </span>
              </div>
              <div>
                <span className="text-xs text-emerald-300 block">
                  Estimated MSP Payout
                </span>
                <span className="font-semibold text-emerald-100 mt-0.5 block">
                  {activeSlot.estPayout}
                </span>
              </div>
              <div>
                <span className="text-xs text-emerald-300 block">Status</span>
                <span className="inline-block bg-emerald-500 text-white text-xs px-2.5 py-0.5 rounded font-medium mt-1">
                  {activeSlot.status}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to={`/farmer/token/${activeSlot.token}`}
                className="inline-flex items-center gap-1.5 bg-white text-emerald-900 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-50 transition"
              >
                <QrCode className="w-4 h-4" /> View QR Pass
              </Link>
              <Link
                to={`/farmer/track/${activeSlot.token}`}
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
              >
                Track Live Queue
              </Link>
            </div>
          </div>
        )}

        {/* AI Mandi Comparison Section Integration */}
        <AiMandiComparisonSection farmerCrop="Wheat" userCoords={userCoords} />

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">
              Total Procurement Sold (Season)
            </span>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              112.4 Quintals
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">
              Total MSP Direct Credits
            </span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">
              ₹2,90,554
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">
              Verified Receipts Available
            </span>
            <Link
              to="/farmer/receipt/1"
              className="text-emerald-700 text-sm font-semibold flex items-center gap-1 mt-2 hover:underline"
            >
              <FileCheck className="w-4 h-4" /> View Latest Receipt
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
