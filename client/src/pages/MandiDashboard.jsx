import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MandiMap from '../components/MandiMap';
import axios from 'axios';
import { QrCode, Scale, Users, CheckCircle2, X, PlusCircle, MapPin } from 'lucide-react';

export default function MandiDashboard() {
  const [mandis, setMandis] = useState([]);
  const [isAddMandiOpen, setIsAddMandiOpen] = useState(false);
  const [newCoords, setNewCoords] = useState({ lat: 29.69, lng: 76.98 });
  
  const [newMandiForm, setNewMandiForm] = useState({
    name: '',
    location: '',
    dailyCapacityQuintals: 500,
    avgWaitMinutes: 15,
    acceptedCommodities: 'Wheat, Mustard'
  });

  const [requests, setRequests] = useState([
    { id: "AP-MB-A78291", farmer: "Ramesh Patel", commodity: "Wheat", declaredQty: 40.0, actualQty: 0, time: "11:30 AM", status: "Arrived" },
    { id: "AP-MB-B92014", farmer: "Sukhdev Singh", commodity: "Mustard", declaredQty: 25.0, actualQty: 0, time: "11:45 AM", status: "In Queue" }
  ]);

  // Load current mandis
  const fetchMandis = () => {
    axios.get('http://localhost:5000/api/mandis')
      .then(res => setMandis(res.data))
      .catch(() => {
        setMandis([
          {
            _id: "mandi-1",
            name: "Anaj Mandi Procurement Center",
            location: "Karnal, Haryana",
            status: "Available",
            availableSlotsCount: 87,
            coordinates: { lat: 29.6857, lng: 76.9905 }
          }
        ]);
      });
  };

  useEffect(() => {
    fetchMandis();
  }, []);

  const handleMapClick = (latlng) => {
    setNewCoords({ lat: Number(latlng.lat.toFixed(4)), lng: Number(latlng.lng.toFixed(4)) });
  };

  const handleCreateMandi = async (e) => {
    e.preventDefault();
    const payload = {
      ...newMandiForm,
      lat: newCoords.lat,
      lng: newCoords.lng,
      acceptedCommodities: newMandiForm.acceptedCommodities.split(',').map(c => c.trim())
    };

    try {
      await axios.post('http://localhost:5000/api/mandis/add-mandi', payload);
      alert("New Mandi successfully registered on the map!");
      setIsAddMandiOpen(false);
      fetchMandis();
    } catch (err) {
      // Offline fallback state update for demonstration
      const mockSaved = {
        _id: `mandi-${Date.now()}`,
        name: payload.name,
        location: payload.location,
        coordinates: { lat: payload.lat, lng: payload.lng },
        status: "Available",
        availableSlotsCount: 50
      };
      setMandis(prev => [...prev, mockSaved]);
      setIsAddMandiOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Procurement Officer Operations</h1>
            <p className="text-xs text-slate-500">Manage yard traffic, weighbridge logs, and register new mandi points.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsAddMandiOpen(true)}
              className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> Add Mandi to Map
            </button>
            <button className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-sm">
              <QrCode className="w-4 h-4" /> Scan Arrival Token
            </button>
          </div>
        </div>

        {/* Live Active Mandis Map View */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-700" /> Active Regional Mandis Network
          </h2>
          <MandiMap mandis={mandis} />
        </div>

        {/* Incoming Farmer Queue Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" /> Incoming Farmer Yard Queue
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Token Ref</th>
                  <th className="p-3">Farmer Name</th>
                  <th className="p-3">Commodity</th>
                  <th className="p-3">Declared Weight</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((row) => (
                  <tr key={row.id}>
                    <td className="p-3 font-mono font-bold text-slate-800">{row.id}</td>
                    <td className="p-3 font-medium text-slate-800">{row.farmer}</td>
                    <td className="p-3">{row.commodity}</td>
                    <td className="p-3">{row.declaredQty} qtl</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Mandi to Map Modal */}
      {isAddMandiOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Register New Procurement Mandi</h3>
                <p className="text-xs text-slate-500">Click on the mini-map to drop coordinates or enter details manually.</p>
              </div>
              <button onClick={() => setIsAddMandiOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Clickable Map to Pick GPS Coordinates */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700">Click Map to Pick Mandi GPS Location</span>
              <MandiMap 
                mandis={mandis} 
                onMapClick={handleMapClick} 
                newPinCoords={newCoords} 
              />
              <p className="text-[11px] text-emerald-700 font-mono">
                Selected GPS: {newCoords.lat}, {newCoords.lng}
              </p>
            </div>

            <form onSubmit={handleCreateMandi} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mandi Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Kaithal Grain Hub" 
                    value={newMandiForm.name} 
                    onChange={(e) => setNewMandiForm({...newMandiForm, name: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">District / State</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Kaithal, Haryana" 
                    value={newMandiForm.location} 
                    onChange={(e) => setNewMandiForm({...newMandiForm, location: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Daily Cap (Quintals)</label>
                  <input 
                    type="number" 
                    required 
                    value={newMandiForm.dailyCapacityQuintals} 
                    onChange={(e) => setNewMandiForm({...newMandiForm, dailyCapacityQuintals: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Avg Wait (Mins)</label>
                  <input 
                    type="number" 
                    value={newMandiForm.avgWaitMinutes} 
                    onChange={(e) => setNewMandiForm({...newMandiForm, avgWaitMinutes: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Accepted Crops</label>
                  <input 
                    type="text" 
                    placeholder="Wheat, Mustard" 
                    value={newMandiForm.acceptedCommodities} 
                    onChange={(e) => setNewMandiForm({...newMandiForm, acceptedCommodities: e.target.value})}
                    className="w-full border border-slate-300 rounded-xl p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setIsAddMandiOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold"
                >
                  Save & Publish to Map
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}