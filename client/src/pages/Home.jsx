import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Tractor,
  Building2,
  Clock,
  QrCode,
  FileText,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6 bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-600/40 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> Government MSP
            Procurement Portal
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Smart Procurement. <br />
            <span className="text-emerald-300">Transparent MSP.</span> Empowered
            Farmers.
          </h1>

          <p className="text-base md:text-lg text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate long mandi queues, reserve verified delivery slots, and
            track real-time weighments and direct benefit payments with
            cryptographic transparency.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-8 py-3.5 rounded-2xl transition flex items-center gap-2 shadow-lg text-sm"
            >
              Get Started / Sign In <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Core Platform Highlights */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl font-bold text-slate-800">
            Unified Procurement Lifecycle
          </h2>
          <p className="text-xs text-slate-500">
            Connecting farmgate logistics directly to official government
            procurement systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">
              Smart Queue Scheduling
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Book specific arrival windows to reduce yard bottleneck delays
              from days to mere minutes.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">
              Dynamic QR Gate Passes
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automated gate scan verification ensures fast yard check-in and
              encrypted identity validation.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">
              Digital MSP Invoicing
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Automatic payout calculation against certified weighbridge
              readings with direct benefit transfer tracking.
            </p>
          </div>
        </div>

        {/* Portal Entry Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Farmer Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-3.5 w-fit bg-emerald-100 text-emerald-800 rounded-2xl">
                <Tractor className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Farmer Workspace
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Discover nearby procurement centers on an interactive map,
                reserve guaranteed slots, track live truck progress, and
                download official payment receipts.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />{" "}
                  Interactive Mandi Map & Capacity Tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Digital
                  QR Token Generation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />{" "}
                  Real-time Yard Timeline
                </li>
              </ul>
            </div>
            <Link
              to="/login"
              className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-center text-xs transition block"
            >
              Sign In as Farmer
            </Link>
          </div>

          {/* Procurement Officer Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="p-3.5 w-fit bg-slate-100 text-slate-800 rounded-2xl">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">
                Procurement Portal
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Streamline yard intake, verify incoming vehicle tokens, record
                certified gross scale weights and crop quality metrics, and log
                audit entries.
              </p>
              <ul className="space-y-2 text-xs font-semibold text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700" /> Instant QR
                  Token Gate Scanner
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700" />{" "}
                  Weighbridge Scale & Grading Console
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-700" />{" "}
                  Cryptographic Dispute Audit Trail
                </li>
              </ul>
            </div>
            <Link
              to="/login"
              className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-center text-xs transition block"
            >
              Sign In as Procurement Officer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
