import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, QrCode, FileCheck, AlertCircle } from 'lucide-react';

export default function FarmerDashboard() {
  const [activeSlot, setActiveSlot] = useState({
    token: "AP-MB-A78291",
    mandi: "Anaj Mandi Procurement Center",
    commodity: "Wheat (40 qtl)",
    date: "Today, 11:30 AM - 12:00 PM",
    status: "Accepted",
    queuePosition: 7,
    estPayout: "₹1,02,366"
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Namaste, Ramesh Patel 👋</h1>
            <p className="text-sm text-slate-500">Mandi: Karnal Center | Aadhaar: XXXX-XXXX-4819</p>
          </div>
          <Link 
            to="/farmer/find-mandi" 
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            Book New Procurement Slot <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Live Slot Status Card */}
        {activeSlot ? (
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider bg-emerald-700/60 px-3 py-1 rounded-full text-emerald-200 border border-emerald-500/30">
                  Active Booking
                </span>
                <h2 className="text-2xl font-bold mt-2">{activeSlot.commodity}</h2>
                <p className="text-sm text-emerald-200">{activeSlot.mandi}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-emerald-300 block">Token Number</span>
                <span className="text-xl font-mono font-bold">{activeSlot.token}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-emerald-700/50 text-sm">
              <div>
                <span className="text-xs text-emerald-300 block">Slot Window</span>
                <span className="font-semibold flex items-center gap-1 mt-0.5"><Clock className="w-3.5 h-3.5" /> {activeSlot.date}</span>
              </div>
              <div>
                <span className="text-xs text-emerald-300 block">Live Queue</span>
                <span className="font-semibold text-amber-300 mt-0.5 block">Position #{activeSlot.queuePosition} (6 ahead)</span>
              </div>
              <div>
                <span className="text-xs text-emerald-300 block">Estimated MSP Payout</span>
                <span className="font-semibold text-emerald-100 mt-0.5 block">{activeSlot.estPayout}</span>
              </div>
              <div>
                <span className="text-xs text-emerald-300 block">Status</span>
                <span className="inline-block bg-emerald-500 text-white text-xs px-2.5 py-0.5 rounded font-medium mt-1">
                  {activeSlot.status}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link to={`/farmer/token/${activeSlot.token}`} className="inline-flex items-center gap-1.5 bg-white text-emerald-900 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-50 transition">
                <QrCode className="w-4 h-4" /> View QR Pass
              </Link>
              <Link to={`/farmer/track/${activeSlot.token}`} className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold transition">
                Track Live Queue
              </Link>
              <Link to="/farmer/ledger" className="inline-flex items-center gap-1.5 bg-emerald-900/50 hover:bg-emerald-900 text-white px-4 py-2 rounded-lg text-xs font-semibold border border-emerald-600/40 transition">
                Audit Log
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600">No active procurement bookings found.</p>
          </div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total Procurement Sold (Season)</span>
            <p className="text-2xl font-bold text-slate-800 mt-1">112.4 Quintals</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Total MSP Direct Credits</span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">₹2,90,554</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-xs text-slate-500 font-medium">Verified Receipts Available</span>
            <Link to="/farmer/receipt/1" className="text-emerald-700 text-sm font-semibold flex items-center gap-1 mt-2 hover:underline">
              <FileCheck className="w-4 h-4" /> View Latest Receipt
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}