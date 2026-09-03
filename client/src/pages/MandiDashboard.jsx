import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {
  QrCode,
  Scale,
  Users,
  CheckCircle2,
  AlertTriangle,
  X,
} from "lucide-react";

export default function MandiDashboard() {
  const [requests, setRequests] = useState([
    {
      id: "AP-MB-A78291",
      farmer: "Ramesh Patel",
      commodity: "Wheat",
      declaredQty: 40.0,
      actualQty: 0,
      time: "11:30 AM",
      status: "Arrived",
      grade: "",
    },
    {
      id: "AP-MB-B92014",
      farmer: "Sukhdev Singh",
      commodity: "Mustard",
      declaredQty: 25.0,
      actualQty: 0,
      time: "11:45 AM",
      status: "In Queue",
      grade: "",
    },
    {
      id: "AP-MB-C10382",
      farmer: "Anil Sharma",
      commodity: "Wheat",
      declaredQty: 50.0,
      actualQty: 0,
      time: "12:00 PM",
      status: "Pending",
      grade: "",
    },
  ]);

  const [activeModalItem, setActiveModalItem] = useState(null);
  const [scaleReading, setScaleReading] = useState("");
  const [moistureContent, setMoistureContent] = useState("");
  const [grade, setGrade] = useState("Grade A");

  const openWeighmentModal = (item) => {
    setActiveModalItem(item);
    setScaleReading(item.declaredQty);
    setMoistureContent("11.5");
  };

  const handleSaveWeighment = (e) => {
    e.preventDefault();
    const updated = requests.map((item) => {
      if (item.id === activeModalItem.id) {
        return {
          ...item,
          actualQty: parseFloat(scaleReading),
          grade: `${grade} (${moistureContent}% moist)`,
          status: "Weighment Done",
        };
      }
      return item;
    });

    setRequests(updated);
    setActiveModalItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Mandi Operator Portal
            </h1>
            <p className="text-sm text-slate-500">
              Anaj Mandi Procurement Center — Karnal
            </p>
          </div>
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition">
            <QrCode className="w-4 h-4" /> Scan Arrival Token
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">
              Today's Scheduled Slots
            </span>
            <p className="text-2xl font-bold text-slate-800 mt-1">84</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">
              Trucks in Mandi
            </span>
            <p className="text-2xl font-bold text-amber-600 mt-1">17</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">
              Procured Today
            </span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">
              420.5 qtl
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">
              Yard Capacity Left
            </span>
            <p className="text-2xl font-bold text-slate-700 mt-1">79.5 qtl</p>
          </div>
        </div>

        {/* Live Slot Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" /> Incoming Farmer Queue
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Token Ref</th>
                  <th className="p-3">Farmer Name</th>
                  <th className="p-3">Commodity</th>
                  <th className="p-3">Declared / Actual</th>
                  <th className="p-3">Time Window</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-mono font-semibold text-slate-800">
                      {row.id}
                    </td>
                    <td className="p-3 text-slate-800 font-medium">
                      {row.farmer}
                    </td>
                    <td className="p-3">{row.commodity}</td>
                    <td className="p-3">
                      {row.declaredQty} qtl
                      {row.actualQty > 0 && (
                        <span className="text-emerald-700 font-bold">
                          {" "}
                          → {row.actualQty} qtl
                        </span>
                      )}
                    </td>
                    <td className="p-3">{row.time}</td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                          row.status === "Weighment Done"
                            ? "bg-blue-100 text-blue-800"
                            : row.status === "Arrived"
                              ? "bg-emerald-100 text-emerald-800"
                              : row.status === "In Queue"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {row.status !== "Weighment Done" ? (
                        <button
                          onClick={() => openWeighmentModal(row)}
                          className="px-3 py-1.5 text-xs bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition font-medium flex items-center gap-1 ml-auto"
                        >
                          <Scale className="w-3.5 h-3.5" /> Record Weighment
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Weighment & Quality Assessment Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-800">
                  Weighbridge Scale Verification
                </h3>
                <p className="text-xs text-slate-500">
                  Token: {activeModalItem.id} ({activeModalItem.farmer})
                </p>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWeighment} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-700 font-medium">
                  Certified Scale Weight (Quintals)
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={scaleReading}
                  onChange={(e) => setScaleReading(e.target.value)}
                  className="mt-1 w-full border border-slate-300 rounded-lg p-2.5 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <span className="text-xs text-slate-400">
                  Declared weight by farmer: {activeModalItem.declaredQty} qtl
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium">
                    Quality Grade
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Grade A">Grade A (Standard)</option>
                    <option value="Grade B">Grade B (Minor Dockage)</option>
                    <option value="Grade C">Grade C (Sub-standard)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-medium">
                    Moisture (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={moistureContent}
                    onChange={(e) => setMoistureContent(e.target.value)}
                    className="mt-1 w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                <div className="flex justify-between font-semibold text-emerald-900">
                  <span>Calculated MSP Payout:</span>
                  <span>
                    ₹{((parseFloat(scaleReading) || 0) * 2585).toLocaleString()}
                  </span>
                </div>
                <p className="text-emerald-700">
                  Official Rate: ₹2,585/qtl (Direct Bank Transfer via PFMS)
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="w-1/2 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white transition font-medium"
                >
                  Approve & Sign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
