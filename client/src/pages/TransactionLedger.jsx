import React from "react";
import Navbar from "../components/Navbar";
import { History, Shield } from "lucide-react";

export default function TransactionLedger() {
  const events = [
    {
      timestamp: "2026-09-03 11:20:14",
      action: "Payment Completed",
      actor: "System / Bank Gateway",
      status: "Success",
      ref: "PAY-928374",
    },
    {
      timestamp: "2026-09-03 11:15:02",
      action: "Quality Verification Recorded",
      actor: "Mandi Inspector Grade-1",
      status: "Grade A Passed",
      ref: "QUAL-10293",
    },
    {
      timestamp: "2026-09-03 11:07:44",
      action: "Weighment Recorded",
      actor: "Weighbridge Scale #2",
      status: "39.6 qtl",
      ref: "WEIGH-8839",
    },
    {
      timestamp: "2026-09-03 10:59:10",
      action: "QR Code Scanned & Verified",
      actor: "Gate Operator",
      status: "Verified",
      ref: "AP-MB-A78291",
    },
    {
      timestamp: "2026-09-03 09:45:00",
      action: "Slot Request Approved",
      actor: "Mandi Administrator",
      status: "Confirmed",
      ref: "REQ-48192",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" /> Transaction Audit
              Ledger
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Append-only event log for complete transparency and dispute
              resolution.
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-medium">
            <Shield className="w-3.5 h-3.5" /> Audit Proof Enabled
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600 border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Action Event</th>
                <th className="p-3">Responsible Actor</th>
                <th className="p-3">Status / Value</th>
                <th className="p-3">Reference ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((evt, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 font-mono text-xs">{evt.timestamp}</td>
                  <td className="p-3 font-medium text-slate-800">
                    {evt.action}
                  </td>
                  <td className="p-3 text-xs">{evt.actor}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-700 font-medium">
                      {evt.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-xs text-slate-500">
                    {evt.ref}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
