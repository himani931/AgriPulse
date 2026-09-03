import React from "react";
import Navbar from "../components/Navbar";
import { CheckCircle2, Clock, MapPin, Scale, ShieldCheck } from "lucide-react";

export default function TrackProcurement() {
  const steps = [
    { title: "Request Accepted", time: "09:45 AM", completed: true },
    { title: "Farmer Arrived", time: "10:58 AM", completed: true },
    { title: "QR Verified", time: "10:59 AM", completed: true },
    {
      title: "Weighment Recorded",
      time: "11:07 AM",
      completed: true,
      info: "Actual: 39.6 qtl (Declared: 40.0 qtl)",
    },
    {
      title: "Quality Assessment",
      time: "11:15 AM",
      completed: true,
      info: "Grade A | Moisture: 11.8%",
    },
    {
      title: "MSP Payment Calculated",
      time: "11:20 AM",
      completed: false,
      current: true,
    },
    { title: "Payment Completed", time: "--", completed: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 space-y-6">
        {/* Live Queue Banner */}
        <div className="bg-emerald-800 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-wider bg-emerald-700 px-3 py-1 rounded-full text-emerald-200">
              Live Status
            </span>
            <h2 className="text-2xl font-bold mt-2">Queue Position: #7</h2>
            <p className="text-sm text-emerald-100 flex items-center gap-1 mt-1">
              <Clock className="w-4 h-4" /> Estimated wait time: ~18 minutes (6
              farmers ahead)
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-200 block">Token Ref</span>
            <span className="text-xl font-mono font-bold text-white">
              AP-MB-A78291
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Procurement Step Tracker
          </h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-8">
                <div
                  className={`absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.completed
                      ? "bg-emerald-600 text-white"
                      : step.current
                        ? "bg-amber-500 text-white ring-4 ring-amber-100"
                        : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-slate-800">
                      {step.title}
                    </h4>
                    <span className="text-xs text-slate-500">{step.time}</span>
                  </div>
                  {step.info && (
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      {step.info}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
