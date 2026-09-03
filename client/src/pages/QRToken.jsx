import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '../components/Navbar';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function QRToken() {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);

  useEffect(() => {
    // Fetch live slot info using token ID
    axios.get(`http://localhost:5000/api/mandis/slot/${id}`)
      .then(res => setSlot(res.data))
      .catch(() => {
        // Fallback demo state if MongoDB record doesn't exist
        setSlot({
          qrToken: id || "AP-MB-A78291",
          farmerName: "Ramesh Patel",
          commodity: "Wheat",
          quantityQuintals: 40,
          slotTime: "Today, 11:30 AM - 12:00 PM",
          totalPayable: 103400,
          status: "Accepted"
        });
      });
  }, [id]);

  if (!slot) return <div className="p-8 text-center text-slate-500">Loading token pass...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-4">
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" /> Validated Slot Pass
        </span>
        <h2 className="text-xl font-bold text-slate-800">Mandi Gate Entry Pass</h2>
        <p className="text-xs text-slate-500">Show this QR code upon arrival at the weighbridge gate.</p>

        <div className="my-6 flex justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
          <QRCodeSVG value={slot.qrToken} size={190} />
        </div>

        <div className="text-sm space-y-2.5 text-slate-600 bg-slate-50 p-4 rounded-xl text-left border border-slate-100">
          <div className="flex justify-between"><span>Token Ref:</span> <strong className="font-mono text-slate-800">{slot.qrToken}</strong></div>
          <div className="flex justify-between"><span>Farmer Name:</span> <strong className="text-slate-800">{slot.farmerName}</strong></div>
          <div className="flex justify-between"><span>Declared Crop:</span> <strong className="text-slate-800">{slot.commodity} ({slot.quantityQuintals} qtl)</strong></div>
          <div className="flex justify-between"><span>Entry Window:</span> <strong className="text-slate-800">{slot.slotTime}</strong></div>
          <div className="flex justify-between"><span>Est. MSP Gross:</span> <strong className="text-emerald-700">₹{slot.totalPayable?.toLocaleString()}</strong></div>
        </div>

        <Link 
          to={`/farmer/track/${slot.qrToken}`}
          className="w-full mt-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
        >
          Track Gate & Queue Position <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}