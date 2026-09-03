import React from "react";
import Navbar from "../components/Navbar";
import { Download, ShieldCheck, CheckCircle } from "lucide-react";

export default function PaymentReceipt() {
  const receipt = {
    transactionId: "PR-928374",
    farmer: "Raj Kumar",
    mandi: "Anaj Mandi Procurement Center",
    commodity: "Wheat",
    declaredQty: "40.0 qtl",
    acceptedQty: "39.6 qtl",
    grade: "Grade A (Moisture 11.8%)",
    mspRate: "₹2,585 / qtl",
    finalAmount: "₹1,02,366",
    paymentRef: "PAY-928374",
    status: "Credited",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Digital Procurement Receipt
            </h2>
            <p className="text-xs text-slate-500">
              Txn ID: {receipt.transactionId}
            </p>
          </div>
          <span className="flex items-center gap-1 bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" /> {receipt.status}
          </span>
        </div>

        {/* Calculation Details */}
        <div className="space-y-3 text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex justify-between">
            <span>Farmer Name:</span>
            <strong className="text-slate-800">{receipt.farmer}</strong>
          </div>
          <div className="flex justify-between">
            <span>Procurement Mandi:</span>
            <strong className="text-slate-800">{receipt.mandi}</strong>
          </div>
          <div className="flex justify-between">
            <span>Commodity & Grade:</span>
            <strong className="text-slate-800">
              {receipt.commodity} ({receipt.grade})
            </strong>
          </div>
          <div className="flex justify-between">
            <span>Accepted Quantity:</span>
            <strong className="text-slate-800">{receipt.acceptedQty}</strong>
          </div>
          <div className="flex justify-between">
            <span>Government MSP Rate:</span>
            <strong className="text-slate-800">{receipt.mspRate}</strong>
          </div>
          <hr className="my-2 border-slate-200" />
          <div className="flex justify-between text-base font-bold text-slate-800">
            <span>Final Payable Amount:</span>
            <span className="text-emerald-700">{receipt.finalAmount}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-slate-500 pt-2">
          <span className="flex items-center gap-1 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Record
            Integrity Verified
          </span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1 bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            <Download className="w-3.5 h-3.5" /> Print / Download
          </button>
        </div>
      </div>
    </div>
  );
}
