import React from "react";
import { QRCodeSVG } from "qrcode.react";
import Navbar from "../components/Navbar";

export default function QRToken() {
  const tokenData = "AP-MB-A78291"; // Example token string

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-md border border-slate-200 text-center">
        <h2 className="text-xl font-bold text-slate-800">Procurement Token</h2>
        <p className="text-xs text-slate-500 mt-1">
          Show this QR code upon arrival at the mandi center.
        </p>

        <div className="my-6 flex justify-center p-4 bg-slate-50 rounded-xl border border-slate-100">
          <QRCodeSVG value={tokenData} size={180} />
        </div>

        <div className="text-sm space-y-2 text-slate-600 bg-slate-50 p-4 rounded-xl text-left">
          <div className="flex justify-between">
            <span>Token ID:</span>{" "}
            <strong className="text-slate-800">{tokenData}</strong>
          </div>
          <div className="flex justify-between">
            <span>Farmer:</span>{" "}
            <strong className="text-slate-800">Raj Kumar</strong>
          </div>
          <div className="flex justify-between">
            <span>Commodity:</span>{" "}
            <strong className="text-slate-800">Wheat (40 qtl)</strong>
          </div>
          <div className="flex justify-between">
            <span>Slot Window:</span>{" "}
            <strong className="text-slate-800">11:30 AM - 12:00 PM</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
