import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Check, X, QrCode, Scale, Users, Layers } from 'lucide-react';

export default function MandiDashboard() {
  const [requests, setRequests] = useState([
    { id: "AP-MB-A78291", farmer: "Ramesh Patel", commodity: "Wheat", qty: "40 qtl", time: "11:30 AM", status: "Arrived" },
    { id: "AP-MB-B92014", farmer: "Sukhdev Singh", commodity: "Mustard", qty: "25 qtl", time: "11:45 AM", status: "In Queue" },
    { id: "AP-MB-C10382", farmer: "Anil Sharma", commodity: "Wheat", qty: "50 qtl", time: "12:00 PM", status: "Pending" }
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Mandi Metrics */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Mandi Operator Portal</h1>
            <p className="text-sm text-slate-500">Anaj Mandi Procurement Center — Karnal</p>
          </div>
          <button className="bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-emerald-800">
            <QrCode className="w-4 h-4" /> Scan Farmer Token
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500">Today's Total Slots</span>
            <p className="text-xl font-bold text-slate-800 mt-1">84</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500">Active Trucks in Mandi</span>
            <p className="text-xl font-bold text-amber-600 mt-1">17</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500">Procured Quantity</span>
            <p className="text-xl font-bold text-emerald-700 mt-1">420 qtl</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500">Remaining Capacity</span>
            <p className="text-xl font-bold text-slate-700 mt-1">80 qtl</p>
          </div>
        </div>

        {/* Live Slot Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" /> Incoming Farmer Arrivals & Slots
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Token Ref</th>
                  <th className="p-3">Farmer Name</th>
                  <th className="p-3">Commodity & Qty</th>
                  <th className="p-3">Time Window</th>
                  <th className="p-3">Current Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 font-mono font-semibold text-slate-800">{row.id}</td>
                    <td className="p-3 text-slate-800">{row.farmer}</td>
                    <td className="p-3">{row.commodity} ({row.qty})</td>
                    <td className="p-3">{row.time}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        row.status === 'Arrived' ? 'bg-emerald-100 text-emerald-800' :
                        row.status === 'In Queue' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button className="px-3 py-1 text-xs bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition font-medium">
                        Record Weighment
                      </button>
                      <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}