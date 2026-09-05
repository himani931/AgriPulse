import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { History, Shield, Search, Filter, AlertOctagon, CheckCircle2 } from 'lucide-react';

export default function TransactionLedger() {
  const [events, setEvents] = useState([
    {
      id: "LOG-10948",
      tokenRef: "AP-MB-A78291",
      action: "Payment Settled via PFMS DBT",
      actor: "Bank Gateway / UIDAI",
      status: "Verified",
      details: "Amount: ₹1,02,366 credited to A/C ending 4819",
      hash: "8f3b...a109",
      timestamp: "2026-09-03 11:20:14"
    },
    {
      id: "LOG-10947",
      tokenRef: "AP-MB-A78291",
      action: "Moisture & Quality Grading",
      actor: "Quality Inspector (Grade-1)",
      status: "Passed",
      details: "Moisture: 11.5% | Result: Grade A Wheat",
      hash: "4a21...bc88",
      timestamp: "2026-09-03 11:15:02"
    },
    {
      id: "LOG-10946",
      tokenRef: "AP-MB-A78291",
      action: "Weighbridge Scale Cert",
      actor: "Scale Weighbridge #2",
      status: "Recorded",
      details: "Certified Gross: 39.60 Quintals",
      hash: "e5d9...2180",
      timestamp: "2026-09-03 11:07:44"
    },
    {
      id: "LOG-10945",
      tokenRef: "AP-MB-A78291",
      action: "Gate Entry QR Scanned",
      actor: "Security Gate Officer",
      status: "Arrived",
      details: "Vehicle Reg: HR-05-AB-4910",
      hash: "78ac...d412",
      timestamp: "2026-09-03 10:59:10"
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredEvents = events.filter((evt) => {
    const matchesSearch = evt.tokenRef.toLowerCase().includes(search.toLowerCase()) || 
                          evt.action.toLowerCase().includes(search.toLowerCase()) ||
                          evt.actor.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || evt.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <History className="w-6 h-6 text-emerald-700" /> Immutable Procurement Ledger
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Cryptographically timestamped event log for dispute resolution and procurement integrity.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-800">
            <Shield className="w-4 h-4 text-emerald-600" /> SHA-256 Audit Trail Active
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input 
              type="text" 
              placeholder="Search token, event, or officer..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            {['All', 'Verified', 'Passed', 'Recorded', 'Arrived'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedFilter === filter 
                    ? 'bg-emerald-800 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Event Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Token Reference</th>
                  <th className="p-3.5">Action / Step</th>
                  <th className="p-3.5">Responsible Actor</th>
                  <th className="p-3.5">Parameters & Remarks</th>
                  <th className="p-3.5">Proof Hash</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">{evt.timestamp}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-800">{evt.tokenRef}</td>
                    <td className="p-3.5 font-semibold text-slate-900">{evt.action}</td>
                    <td className="p-3.5 text-slate-600">{evt.actor}</td>
                    <td className="p-3.5 text-slate-500">{evt.details}</td>
                    <td className="p-3.5 font-mono text-[10px] text-emerald-800 bg-emerald-50/60 rounded px-1.5 py-0.5">{evt.hash}</td>
                    <td className="p-3.5 text-right">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        evt.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                        evt.status === 'Passed' ? 'bg-blue-100 text-blue-800' :
                        evt.status === 'Recorded' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" /> {evt.status}
                      </span>
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