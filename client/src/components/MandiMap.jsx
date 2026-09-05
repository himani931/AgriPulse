import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix Leaflet's default marker asset loading bug in React/Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MandiMap({ mandis, selectedMandi, onSelectMandi }) {
  const defaultCenter = [29.8, 76.9]; // Centered around Karnal / Kurukshetra belt

  return (
    <div className="h-80 md:h-[420px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-inner z-0">
      <MapContainer center={defaultCenter} zoom={9} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mandis.map((m) => (
          <Marker 
            key={m._id || m.name} 
            position={[m.coordinates.lat, m.coordinates.lng]}
            eventHandlers={{
              click: () => onSelectMandi(m),
            }}
          >
            <Popup>
              <div className="text-xs space-y-1">
                <strong className="block text-slate-900 font-bold">{m.name}</strong>
                <p className="text-slate-600">{m.location}</p>
                <div className="flex items-center gap-1 font-semibold text-emerald-700">
                  <span>Capacity: {m.remainingCapacityQuintals} qtl left</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}