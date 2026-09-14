import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import MandiMap from "../components/MandiMap";
import {
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  Navigation,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FindMandi() {
  const [mandis, setMandis] = useState([]);
  const [selectedMandi, setSelectedMandi] = useState(null);
  const [booking, setBooking] = useState({
    farmerName: "",
    farmerPhone: "",
    commodity: "Wheat",
    quantityQuintals: 40,
    slotTime: "11:30 AM - 12:00 PM",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const passedState = location.state;

  // Raw mandi database matching AI intelligence recommendations
  const fallbackMandis = [
    {
      _id: "mandi-azadpur",
      name: "Azadpur Mandi",
      location: "Azadpur, Delhi",
      distanceKm: 4.2,
      avgWaitMinutes: 12,
      availableSlotsCount: 87,
      netPayout: "₹1,04,200",
      congestion: "Low Traffic",
      score: 96,
      badge: "Best Overall Value",
      status: "Available",
      coordinates: { lat: 28.7041, lng: 77.1725 },
      acceptedCommodities: ["Wheat", "Mustard", "Barley"],
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
      distanceKm: 9.8,
      avgWaitMinutes: 25,
      availableSlotsCount: 22,
      netPayout: "₹1,02,900",
      congestion: "Moderate",
      score: 82,
      badge: "Alternative Hub",
      status: "Limited",
      coordinates: { lat: 28.5355, lng: 77.261 },
      acceptedCommodities: ["Wheat", "Paddy", "Mustard"],
      reasons: [
        "Stable weighbridge speed",
        "Slightly longer transit distance (+5.6 km)",
      ],
    },
    {
      _id: "mandi-ghaziabad",
      name: "Sahibabad Grain Mandi",
      location: "Ghaziabad, NCR",
      distanceKm: 14.5,
      avgWaitMinutes: 40,
      availableSlotsCount: 6,
      netPayout: "₹1,05,000",
      congestion: "High Congestion",
      score: 74,
      badge: "Max Payout / Long Wait",
      status: "Congested",
      coordinates: { lat: 28.6692, lng: 77.4538 },
      acceptedCommodities: ["Wheat", "Mustard"],
      reasons: [
        "Offers highest gross incentive",
        "Estimated gate wait time exceeds 40 minutes",
      ],
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mandis")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setMandis(res.data);
          // Check if passed from dashboard navigation state
          if (passedState?.selectedMandiId) {
            const matched = res.data.find(
              (m) => m._id === passedState.selectedMandiId,
            );
            setSelectedMandi(matched || res.data[0]);
          } else {
            setSelectedMandi(res.data[0]);
          }
        } else {
          setMandis(fallbackMandis);
          if (passedState?.selectedMandiId) {
            const matched = fallbackMandis.find(
              (m) => m._id === passedState.selectedMandiId,
            );
            setSelectedMandi(matched || fallbackMandis[0]);
          } else {
            setSelectedMandi(fallbackMandis[0]);
          }
        }
      })
      .catch(() => {
        setMandis(fallbackMandis);
        if (passedState?.selectedMandiId) {
          const matched = fallbackMandis.find(
            (m) => m._id === passedState.selectedMandiId,
          );
          setSelectedMandi(matched || fallbackMandis[0]);
        } else {
          setSelectedMandi(fallbackMandis[0]);
        }
      });
  }, [passedState]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMandi) return alert("Please select a mandi first");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/mandis/request-slot",
        {
          ...booking,
          mandiId: selectedMandi._id,
        },
      );
      navigate(`/farmer/token/${res.data.request.qrToken}`);
    } catch (err) {
      // Fallback redirection for testing
      const testToken = `AP-MB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      navigate(`/farmer/token/${testToken}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Interactive Map Section */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-emerald-700" /> Live Mandi
                Geographical Map & AI Radar
              </h2>
              <p className="text-xs text-slate-500">
                Click on any map pin or select a card from below to view gate
                capacity & book a slot.
              </p>
            </div>

            {/* Map Legend */}
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>{" "}
                Available
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>{" "}
                Limited
              </span>
              <span className="flex items-center gap-1.5 text-red-700">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>{" "}
                Congested
              </span>
            </div>
          </div>

          <MandiMap
            mandis={mandis}
            selectedMandi={selectedMandi}
            onSelectMandi={(m) => setSelectedMandi(m)}
          />
        </div>

        {/* Lower Grid: Center List + Booking Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mandi Cards List */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">
              Nearby Procurement Centers
            </h3>
            {mandis.map((mandi) => (
              <div
                key={mandi._id}
                onClick={() => setSelectedMandi(mandi)}
                className={`p-4 bg-white rounded-2xl shadow-sm border cursor-pointer transition ${
                  selectedMandi?._id === mandi._id
                    ? "border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/30"
                    : "border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      {mandi.name}
                    </h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      mandi.status === "Available"
                        ? "bg-emerald-100 text-emerald-800"
                        : mandi.status === "Limited"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {mandi.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                  {mandi.location} ({mandi.distanceKm} km away)
                </p>

                {mandi.badge && (
                  <div className="mt-2 inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-semibold">
                    <Sparkles className="w-3 h-3 text-emerald-600" />{" "}
                    {mandi.badge}
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />{" "}
                    {mandi.avgWaitMinutes}m wait
                  </span>
                  <span>
                    Net Payout:{" "}
                    <strong className="text-emerald-700">
                      {mandi.netPayout || "₹1,02,000"}
                    </strong>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">
                  {selectedMandi
                    ? `Reserve Slot at ${selectedMandi.name}`
                    : "Select a Mandi on the Map"}
                </h3>
                {selectedMandi?.score && (
                  <span className="bg-emerald-100 text-emerald-800 font-mono text-xs px-2.5 py-1 rounded-full font-bold">
                    AI Score: {selectedMandi.score}%
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Guaranteed arrival token with automated weighbridge check-in.
              </p>
            </div>

            {selectedMandi && (
              <form
                onSubmit={handleBookingSubmit}
                className="space-y-4 text-xs"
              >
                {selectedMandi.reasons && (
                  <div className="bg-slate-900 text-white p-3.5 rounded-xl space-y-1.5">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wide">
                      <ShieldCheck className="w-3.5 h-3.5" /> AI Recommendation
                      Insights:
                    </span>
                    <ul className="space-y-1">
                      {selectedMandi.reasons.map((r, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-slate-200 flex items-start gap-1.5"
                        >
                          <Zap className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Farmer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={booking.farmerName}
                      onChange={(e) =>
                        setBooking({ ...booking, farmerName: e.target.value })
                      }
                      placeholder="e.g. Ramesh Patel"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      required
                      value={booking.farmerPhone}
                      onChange={(e) =>
                        setBooking({ ...booking, farmerPhone: e.target.value })
                      }
                      placeholder="e.g. 9876543210"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Commodity
                    </label>
                    <select
                      value={booking.commodity}
                      onChange={(e) =>
                        setBooking({ ...booking, commodity: e.target.value })
                      }
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {(
                        selectedMandi.acceptedCommodities || [
                          "Wheat",
                          "Mustard",
                        ]
                      ).map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Quantity (Quintals)
                    </label>
                    <input
                      type="number"
                      required
                      value={booking.quantityQuintals}
                      onChange={(e) =>
                        setBooking({
                          ...booking,
                          quantityQuintals: Number(e.target.value),
                        })
                      }
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 block text-sm">
                      Estimated MSP Gross Value
                    </span>
                    <span className="text-emerald-700 text-[11px]">
                      Calculated at official standard ₹2,585 / quintal
                    </span>
                  </div>
                  <span className="text-xl font-black text-emerald-800">
                    ₹{(booking.quantityQuintals * 2585).toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm text-xs cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm & Generate Token
                  Pass
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
