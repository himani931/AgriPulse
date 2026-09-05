import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MapPin, Clock, Calendar, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import MandiMap from '../components/MandiMap';

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mandis")
      .then((res) => {
        setMandis(res.data);
        if (res.data.length > 0) setSelectedMandi(res.data[0]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMandi) return alert("Please select a mandi first");
    
    try {
      const res = await axios.post('http://localhost:5000/api/mandis/request-slot', {
        ...booking,
        mandiId: selectedMandi._id
      });
      navigate(`/farmer/token/${res.data.request.qrToken}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Interactive Map Header */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Find Procurement Centers</h1>
              <p className="text-xs text-slate-500">Live operational capacity, wait times, and route maps</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Available</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Limited</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Congested</span>
            </div>
          </div>
          <MandiMap 
            mandis={mandis} 
            selectedMandi={selectedMandi} 
            onSelectMandi={(m) => setSelectedMandi(m)} 
          />
        </div>

        {/* Lower Grid: Selection List + Booking Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Mandi Selection List */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800">Procurement Centers Nearby</h2>
            {mandis.map((mandi) => (
              <div
                key={mandi._id}
                onClick={() => setSelectedMandi(mandi)}
                className={`p-4 bg-white rounded-xl shadow-sm border cursor-pointer transition ${
                  selectedMandi?._id === mandi._id 
                    ? "border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600" 
                    : "border-slate-200 hover:border-emerald-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-slate-800 text-sm">{mandi.name}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    mandi.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {mandi.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {mandi.location} ({mandi.distanceKm} km away)
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {mandi.avgWaitMinutes}m wait
                  </span>
                  <span>Slots Left: <strong className="text-emerald-700">{mandi.availableSlotsCount}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Slot Request Form */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-800 mb-1">
              {selectedMandi ? `Request Delivery Slot — ${selectedMandi.name}` : "Select a Mandi to Request Slot"}
            </h2>
            <p className="text-xs text-slate-500 mb-5">Fill in your harvest details to generate your digital gate pass.</p>

            {selectedMandi ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Farmer Name</label>
                    <input
                      type="text"
                      required
                      value={booking.farmerName}
                      onChange={(e) => setBooking({ ...booking, farmerName: e.target.value })}
                      className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. Ramesh Patel"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Phone Number (SMS alerts)</label>
                    <input
                      type="text"
                      required
                      value={booking.farmerPhone}
                      onChange={(e) => setBooking({ ...booking, farmerPhone: e.target.value })}
                      className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Commodity</label>
                    <select
                      value={booking.commodity}
                      onChange={(e) => setBooking({ ...booking, commodity: e.target.value })}
                      className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {selectedMandi.acceptedCommodities.map((c, i) => (
                        <option key={i} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700">Quantity (Quintals)</label>
                    <input
                      type="number"
                      required
                      value={booking.quantityQuintals}
                      onChange={(e) => setBooking({ ...booking, quantityQuintals: Number(e.target.value) })}
                      className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex justify-between items-center text-sm">
                  <div>
                    <p className="text-emerald-900 font-bold">Estimated MSP Value (₹2,585/qtl)</p>
                    <p className="text-emerald-700 text-xs">Final credit calculated upon weighing and moisture test.</p>
                  </div>
                  <span className="text-2xl font-black text-emerald-800">
                    ₹{(booking.quantityQuintals * 2585).toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm text-sm"
                >
                  <CheckCircle className="w-4 h-4" /> Confirm & Generate Token Pass
                </button>
              </form>
            ) : (
              <div className="p-12 text-center text-slate-400 text-sm">
                Please click on a mandi from the list or map above to unlock booking.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}