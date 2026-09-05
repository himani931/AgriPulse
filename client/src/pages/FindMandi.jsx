import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import MandiMap from "../components/MandiMap";
import { MapPin, Clock, Calendar, CheckCircle, Navigation } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  // Mock initial mandis with coordinates if backend is offline
  const fallbackMandis = [
    {
      _id: "mandi-1",
      name: "Anaj Mandi Procurement Center",
      location: "Karnal, Haryana",
      distanceKm: 18,
      avgWaitMinutes: 12,
      availableSlotsCount: 87,
      status: "Available",
      coordinates: { lat: 29.6857, lng: 76.9905 },
      acceptedCommodities: ["Wheat", "Mustard", "Barley"],
    },
    {
      _id: "mandi-2",
      name: "Kurukshetra Grain Terminal",
      location: "Kurukshetra, Haryana",
      distanceKm: 34,
      avgWaitMinutes: 28,
      availableSlotsCount: 22,
      status: "Limited",
      coordinates: { lat: 29.9695, lng: 76.8783 },
      acceptedCommodities: ["Wheat", "Paddy", "Mustard"],
    },
    {
      _id: "mandi-3",
      name: "Panipat Krishi Upaj Mandi",
      location: "Panipat, Haryana",
      distanceKm: 42,
      avgWaitMinutes: 45,
      availableSlotsCount: 6,
      status: "Congested",
      coordinates: { lat: 29.3909, lng: 76.9635 },
      acceptedCommodities: ["Wheat", "Mustard"],
    }
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mandis")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setMandis(res.data);
          setSelectedMandi(res.data[0]);
        } else {
          setMandis(fallbackMandis);
          setSelectedMandi(fallbackMandis[0]);
        }
      })
      .catch(() => {
        setMandis(fallbackMandis);
        setSelectedMandi(fallbackMandis[0]);
      });
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMandi) return alert("Please select a mandi first");

    try {
      const res = await axios.post("http://localhost:5000/api/mandis/request-slot", {
        ...booking,
        mandiId: selectedMandi._id,
      });
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
                <Navigation className="w-5 h-5 text-emerald-700" /> Live Mandi Geographical Map
              </h2>
              <p className="text-xs text-slate-500">
                Click on any map pin or select a card from below to view gate capacity & book a slot.
              </p>
            </div>
            
            {/* Map Legend */}
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span> Available
              </span>
              <span className="flex items-center gap-1.5 text-amber-700">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span> Limited
              </span>
              <span className="flex items-center gap-1.5 text-red-700">
                <span className="w-3 h-3 rounded-full bg-red-500"></span> Congested
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
            <h3 className="text-base font-bold text-slate-800">Nearby Procurement Centers</h3>
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
                  <h4 className="font-bold text-slate-800 text-sm">{mandi.name}</h4>
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
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {mandi.location} (
                  {mandi.distanceKm} km away)
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {mandi.avgWaitMinutes}m wait
                  </span>
                  <span>
                    Slots Left: <strong className="text-emerald-700">{mandi.availableSlotsCount}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {selectedMandi
                  ? `Reserve Slot at ${selectedMandi.name}`
                  : "Select a Mandi on the Map"}
              </h3>
              <p className="text-xs text-slate-500">
                Guaranteed arrival token with automated weighbridge check-in.
              </p>
            </div>

            {selectedMandi && (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Farmer Name</label>
                    <input
                      type="text"
                      required
                      value={booking.farmerName}
                      onChange={(e) => setBooking({ ...booking, farmerName: e.target.value })}
                      placeholder="e.g. Ramesh Patel"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      required
                      value={booking.farmerPhone}
                      onChange={(e) => setBooking({ ...booking, farmerPhone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Commodity</label>
                    <select
                      value={booking.commodity}
                      onChange={(e) => setBooking({ ...booking, commodity: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    >
                      {(selectedMandi.acceptedCommodities || ["Wheat", "Mustard"]).map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Quantity (Quintals)</label>
                    <input
                      type="number"
                      required
                      value={booking.quantityQuintals}
                      onChange={(e) => setBooking({ ...booking, quantityQuintals: Number(e.target.value) })}
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-emerald-900 block text-sm">Estimated MSP Gross Value</span>
                    <span className="text-emerald-700 text-[11px]">Calculated at official standard ₹2,585 / quintal</span>
                  </div>
                  <span className="text-xl font-black text-emerald-800">
                    ₹{(booking.quantityQuintals * 2585).toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-sm text-xs"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm & Generate Token Pass
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}