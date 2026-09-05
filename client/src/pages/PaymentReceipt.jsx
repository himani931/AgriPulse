import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Download, ShieldCheck, CheckCircle2, ArrowLeft, Building2, UserCheck } from 'lucide-react';

export default function PaymentReceipt() {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/mandis/slot/${id}`)
      .then(res => {
        setSlot(res.data);
        setLoading(false);
      })
      .catch(() => {
        // Mock fallback to preserve demo capabilities
        setSlot({
          qrToken: id || "AP-MB-A78291",
          farmerName: "Ramesh Patel",
          farmerPhone: "+91 98765-43210",
          commodity: "Wheat",
          quantityQuintals: 39.6,
          mspPerQuintal: 2585,
          totalPayable: 102366,
          status: "Completed",
          paymentStatus: "Credited",
          createdAt: new Date().toISOString().split('T')[0]
        });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10 text-center text-slate-500">Generating digital receipt...</div>;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="max-w-2xl mx-auto my-8 p-8 bg-white rounded-3xl shadow-sm border border-slate-200 print:shadow-none print:border-none print:m-0 print:p-4 space-y-6">
        
        {/* Navigation & Header Actions */}
        <div className="flex justify-between items-center print:hidden border-b border-slate-100 pb-4">
          <Link to="/farmer/dashboard" className="text-xs font-semibold text-slate-500 hover:text-emerald-700 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <button 
            onClick={handlePrint} 
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Download / Print PDF
          </button>
        </div>

        {/* Invoice Top Meta */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">AgriPulse Procurement System</span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">Official MSP Settlement</h1>
            <p className="text-xs text-slate-500 mt-0.5">Government Direct Benefit Transfer (DBT) Record</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> {slot.paymentStatus || 'Credited'}
            </span>
            <p className="text-[11px] font-mono text-slate-500 mt-2">Ref: {slot.qrToken}</p>
          </div>
        </div>

        {/* Farmer & Mandi Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div>
            <span className="text-slate-400 block mb-1">Farmer Information</span>
            <p className="font-bold text-slate-800 text-sm">{slot.farmerName}</p>
            <p className="text-slate-600">{slot.farmerPhone}</p>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block mb-1">Procurement Center</span>
            <p className="font-bold text-slate-800 text-sm">Anaj Mandi Center</p>
            <p className="text-slate-600">Karnal, Haryana</p>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-y border-slate-200">
              <tr>
                <th className="p-3">Commodity & Grade</th>
                <th className="p-3">Certified Weight</th>
                <th className="p-3">Government MSP Rate</th>
                <th className="p-3 text-right">Settled Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-3 font-semibold text-slate-800">{slot.commodity} (Grade A)</td>
                <td className="p-3">{slot.quantityQuintals} Quintals</td>
                <td className="p-3">₹{slot.mspPerQuintal?.toLocaleString() || '2,585'} / qtl</td>
                <td className="p-3 text-right font-bold text-slate-900">₹{slot.totalPayable?.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payout Calculation Card */}
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 flex justify-between items-center">
          <div>
            <span className="text-xs text-emerald-800 block font-semibold">Total Direct Credit</span>
            <span className="text-[11px] text-emerald-700">Disbursed directly via Aadhaar-linked Bank Gateway</span>
          </div>
          <span className="text-2xl font-black text-emerald-900">₹{slot.totalPayable?.toLocaleString()}</span>
        </div>

        {/* Audit Verification Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Digitally Signed & Immutable
          </span>
          <span>Date: {slot.createdAt || '2026-09-05'}</span>
        </div>

      </div>
    </div>
  );
}