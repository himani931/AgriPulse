import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { MapPin, Clock, Calendar, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

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
      .then((res) => setMandis(res.data))
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
    
    // Redirect directly to the QR token screen
    navigate(`/farmer/token/${res.data.request.qrToken}`);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mandi Selection List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">Nearby Mandis</h2>
          {mandis.map((mandi) => (
            <div
              key={mandi._id}
              onClick={() => setSelectedMandi(mandi)}
              className={`p-4 bg-white rounded-xl shadow-sm border cursor-pointer transition ${selectedMandi?._id === mandi._id ? "border-emerald-600 bg-emerald-50/30" : "border-slate-200 hover:border-emerald-300"}`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-800">{mandi.name}</h3>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 font-medium rounded-full">
                  {mandi.status}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {mandi.location} (
                {mandi.distanceKm} km away)
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />{" "}
                  {mandi.avgWaitMinutes} mins wait
                </span>
                <span>
                  Slots left: <strong>{mandi.availableSlotsCount}</strong>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Slot Request Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            {selectedMandi
              ? `Request Slot at ${selectedMandi.name}`
              : "Select a Mandi to Request Slot"}
          </h2>
          {selectedMandi && (
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Farmer Name
                  </label>
                  <input
                    type="text"
                    required
                    value={booking.farmerName}
                    onChange={(e) =>
                      setBooking({ ...booking, farmerName: e.target.value })
                    }
                    className="mt-1 w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-emerald-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={booking.farmerPhone}
                    onChange={(e) =>
                      setBooking({ ...booking, farmerPhone: e.target.value })
                    }
                    className="mt-1 w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-emerald-500"
                    placeholder="Enter phone"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Commodity
                  </label>
                  <select
                    value={booking.commodity}
                    onChange={(e) =>
                      setBooking({ ...booking, commodity: e.target.value })
                    }
                    className="mt-1 w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-emerald-500"
                  >
                    {selectedMandi.acceptedCommodities.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">
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
                    className="mt-1 w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 flex justify-between items-center text-sm">
                <div>
                  <p className="text-emerald-900 font-medium">
                    Estimated Value (MSP ₹2,585/qtl)
                  </p>
                  <p className="text-emerald-700 text-xs">
                    Final payout calculation after weighment & grading.
                  </p>
                </div>
                <span className="text-xl font-bold text-emerald-800">
                  ₹{(booking.quantityQuintals * 2585).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Confirm & Get Procurement
                Token
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
