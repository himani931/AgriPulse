import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import MandiMap from "../components/MandiMap";
import CheckInScannerModal from "../components/CheckInScannerModal";
import axios from "axios";
import {
  QrCode,
  Scale,
  Users,
  CheckCircle2,
  X,
  PlusCircle,
  MapPin,
} from "lucide-react";

// Use environment variable with fallback for local development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialMandiFormState = {
  name: "",
  location: "",
  dailyCapacityQuintals: 500,
  avgWaitMinutes: 15,
  acceptedCommodities: "Wheat, Mustard",
};

export default function MandiDashboard() {
  const [mandis, setMandis] = useState([]);
  const [isAddMandiOpen, setIsAddMandiOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [newCoords, setNewCoords] = useState({ lat: 28.6139, lng: 77.209 }); // Default Delhi center

  const [newMandiForm, setNewMandiForm] = useState(initialMandiFormState);

  const [requests, setRequests] = useState([
    {
      id: "AP-MB-A78291",
      farmer: "Ramesh Patel",
      commodity: "Wheat",
      declaredQty: 40.0,
      actualQty: 0,
      time: "11:30 AM",
      status: "Arrived",
    },
    {
      id: "AP-MB-B92014",
      farmer: "Sukhdev Singh",
      commodity: "Mustard",
      declaredQty: 25.0,
      actualQty: 0,
      time: "11:45 AM",
      status: "In Queue",
    },
  ]);

  const fetchMandis = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/mandis`);
      if (res.data && res.data.length > 0) {
        setMandis(res.data);
      }
    } catch (err) {
      // Fallback unified list matching map queries if backend is offline
      setMandis([
        {
          _id: "mandi-azadpur",
          name: "Azadpur Mandi",
          location: "Azadpur, Delhi",
          status: "Available",
          availableSlotsCount: 75,
          coordinates: { lat: 28.7041, lng: 77.175 },
          acceptedCommodities: ["Wheat", "Mustard", "Vegetables"],
        },
      ]);
    }
  };

  useEffect(() => {
    fetchMandis();
  }, []);

  const handleMapClick = (latlng) => {
    setNewCoords({
      lat: Number(latlng.lat.toFixed(4)),
      lng: Number(latlng.lng.toFixed(4)),
    });
  };

  const handleCreateMandi = async (e) => {
    e.preventDefault();
    const payload = {
      ...newMandiForm,
      lat: newCoords.lat,
      lng: newCoords.lng,
      acceptedCommodities: newMandiForm.acceptedCommodities
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    try {
      await axios.post(`${API_BASE_URL}/api/mandis/add-mandi`, payload);
      alert(
        "New Mandi successfully registered! It is now instantly visible on the Farmer Find Mandi map.",
      );
      setIsAddMandiOpen(false);
      setNewMandiForm(initialMandiFormState);
      fetchMandis();
    } catch (err) {
      const mockSaved = {
        _id: `mandi-${Date.now()}`,
        name: payload.name,
        location: payload.location,
        coordinates: { lat: payload.lat, lng: payload.lng },
        status: "Available",
        availableSlotsCount: 50,
        acceptedCommodities: payload.acceptedCommodities,
      };
      setMandis((prev) => [...prev, mockSaved]);
      setIsAddMandiOpen(false);
      setNewMandiForm(initialMandiFormState);
      alert("Mandi added locally (Backend offline fallback).");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6 flex-1 w-full">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Procurement Officer Operations
            </h1>
            <p className="text-xs text-slate-500">
              Manage yard traffic, weighbridge logs, and register new mandi hubs
              in real-time.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsScannerOpen(true)}
              className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <QrCode className="w-4 h-4" /> Scan Gate Token
            </button>
            <button
              onClick={() => setIsAddMandiOpen(true)}
              className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Add Mandi to Map
            </button>
          </div>
        </div>

        {/* Live Active Mandis Map View */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700" /> Live Regional
              Mandis Network (Shared with Farmers)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              {mandis.length} Active Hubs Synchronized
            </span>
          </div>
          <MandiMap mandis={mandis} />
        </div>

        {/* Incoming Farmer Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" /> Incoming Farmer Yard
            Queue
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Token Ref</th>
                  <th className="p-3">Farmer Name</th>
                  <th className="p-3">Commodity</th>
                  <th className="p-3">Declared Weight</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((row) => (
                  <tr key={row.id}>
                    <td className="p-3 font-mono font-bold text-slate-800">
                      {row.id}
                    </td>
                    <td className="p-3 font-medium text-slate-800">
                      {row.farmer}
                    </td>
                    <td className="p-3">{row.commodity}</td>
                    <td className="p-3">{row.declaredQty} qtl</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Check-In Scanner Modal Component */}
      <CheckInScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onSuccess={() => {
          // Optional: Refresh queue table after successful scan
        }}
      />

      {/* Add Mandi Modal */}
      {isAddMandiOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-base">
                  Register New Procurement Mandi
                </h3>
                <p className="text-xs text-slate-500">
                  Click on the mini-map to pin exact GPS coordinates for
                  farmers.
                </p>
              </div>
              <button
                onClick={() => setIsAddMandiOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700">
                Click Map to Pick Mandi GPS Location
              </span>
              <MandiMap
                mandis={mandis}
                onMapClick={handleMapClick}
                newPinCoords={newCoords}
              />
              <p className="text-[11px] text-emerald-700 font-mono">
                Selected Coordinates: {newCoords.lat}, {newCoords.lng}
              </p>
            </div>

            <form onSubmit={handleCreateMandi} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Mandi Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Okhla Grain Yard"
                    value={newMandiForm.name}
                    onChange={(e) =>
                      setNewMandiForm({ ...newMandiForm, name: e.target.value })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    District / Location
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. South Delhi"
                    value={newMandiForm.location}
                    onChange={(e) =>
                      setNewMandiForm({
                        ...newMandiForm,
                        location: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Daily Cap (Quintals)
                  </label>
                  <input
                    type="number"
                    required
                    value={newMandiForm.dailyCapacityQuintals}
                    onChange={(e) =>
                      setNewMandiForm({
                        ...newMandiForm,
                        dailyCapacityQuintals: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Avg Wait (Mins)
                  </label>
                  <input
                    type="number"
                    value={newMandiForm.avgWaitMinutes}
                    onChange={(e) =>
                      setNewMandiForm({
                        ...newMandiForm,
                        avgWaitMinutes: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Accepted Crops
                  </label>
                  <input
                    type="text"
                    placeholder="Wheat, Mustard"
                    value={newMandiForm.acceptedCommodities}
                    onChange={(e) =>
                      setNewMandiForm({
                        ...newMandiForm,
                        acceptedCommodities: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl p-2.5 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddMandiOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  Save & Publish to Map
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
