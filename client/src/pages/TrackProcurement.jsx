import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { CheckCircle2, Clock, ShieldCheck, RefreshCw } from 'lucide-react';

export default function TrackProcurement() {
  const { id } = useParams();
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSlotData = () => {
    axios.get(`http://localhost:5000/api/mandis/slot/${id}`)
      .then(res => {
        setSlot(res.data);
        setLoading(false);
      })
      .catch(err => {
        // Fallback demo state if MongoDB record doesn't match ID
        setSlot({
          qrToken: id || "AP-MB-A78291",
          farmerName: "Ramesh Patel",
          status: "Weighment Done",
          quantityQuintals: 39.6,
          totalPayable: 102366
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSlotData();
  }, [id]);

  // Derive step states dynamically based on the current status
  const currentStatus = slot?.status || "Accepted";

  const getStepStatus = (stepName) => {
    const order = ['Accepted', 'Arrived', 'Weighment Done', 'Completed'];
    const currentIndex = order.indexOf(currentStatus);
    const stepIndex = order.indexOf(stepName);

    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'current';
    return 'upcoming';
  };

  const steps = [
    { key: 'Accepted', title: "Slot Confirmed", time: "Gate Entry Pass Active", completed: getStepStatus('Accepted') === 'completed' || getStepStatus('Accepted') === 'current' },
    { key: 'Arrived', title: "QR Verified at Gate", time: "Vehicle entered premises", completed: getStepStatus('Arrived') === 'completed' || getStepStatus('Arrived') === 'current' },
    { key: 'Weighment Done', title: "Weighbridge Recorded & Graded", time: slot?.quantityQuintals ? `Certified: ${slot.quantityQuintals} qtl (Grade A)` : "Pending Weighment", completed: getStepStatus('Weighment Done') === 'completed' || getStepStatus('Weighment Done') === 'current' },
    { key: 'Completed', title: "Direct MSP Payment Settlement", time: slot?.totalPayable ? `₹${slot.totalPayable.toLocaleString()} via DBT` : "Processing Payout", completed: currentStatus === 'Completed' }
  ];

  if (loading) return <div className="p-10 text-center text-slate-500">Checking mandi live queue...</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-6 space-y-6">
        
        {/* Live Queue Banner */}
        <div className="bg-emerald-900 text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
          <div>
            <span className="text-[11px] uppercase tracking-wider bg-emerald-800 px-3 py-1 rounded-full text-emerald-200 border border-emerald-700 font-semibold">
              Live Mandi Queue
            </span>
            <h2 className="text-2xl font-bold mt-2">Status: {slot.status}</h2>
            <p className="text-sm text-emerald-100 flex items-center gap-1.5 mt-1 font-normal">
              <Clock className="w-4 h-4 text-emerald-300" /> Token Owner: {slot.farmerName}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-emerald-300 block">Token Number</span>
            <span className="text-xl font-mono font-bold text-white">{slot.qrToken}</span>
            <button 
              onClick={fetchSlotData} 
              className="mt-2 text-xs flex items-center gap-1 bg-emerald-800 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-lg transition ml-auto"
            >
              <RefreshCw className="w-3 h-3" /> Refresh
            </button>
          </div>
        </div>

        {/* Step Progression Timeline */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" /> End-to-End Procurement Lifecycle
          </h3>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-8">
                <div className={`absolute left-0 top-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                  step.completed 
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-50' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div className={`flex-1 p-4 rounded-xl border transition ${
                  step.completed ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-slate-800 text-sm">{step.title}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}