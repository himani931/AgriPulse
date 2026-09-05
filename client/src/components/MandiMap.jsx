import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

const createCustomPin = (status) => {
  let pinColor = '#10b981';
  if (status === 'Limited') pinColor = '#f59e0b';
  if (status === 'Congested') pinColor = '#ef4444';
  if (status === 'New') pinColor = '#3b82f6'; // Blue for pending/new pin

  const svgIcon = `
    <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 0C7.61116 0 0 7.61116 0 17C0 29.75 17 42 17 42C17 42 34 29.75 34 17C34 7.61116 26.3888 0 17 0Z" fill="${pinColor}"/>
      <circle cx="17" cy="17" r="7" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-mandi-marker',
    html: svgIcon,
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    popupAnchor: [0, -38]
  });
};

function RecenterMap({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 11, { duration: 1.2 });
    }
  }, [coords, map]);
  return null;
}

// Sub-component allowing click-to-pick coordinates
function MapClickSetter({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng);
      }
    }
  });
  return null;
}

export default function MandiMap({ mandis, selectedMandi, onSelectMandi, onMapClick, newPinCoords }) {
  const defaultPosition = selectedMandi?.coordinates
    ? [selectedMandi.coordinates.lat, selectedMandi.coordinates.lng]
    : [29.6857, 76.9905];

  return (
    <div className="h-80 md:h-[400px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm relative z-0">
      <MapContainer center={defaultPosition} zoom={9} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedMandi?.coordinates && (
          <RecenterMap coords={[selectedMandi.coordinates.lat, selectedMandi.coordinates.lng]} />
        )}

        {onMapClick && <MapClickSetter onMapClick={onMapClick} />}

        {/* Render newly clicked pin preview */}
        {newPinCoords && (
          <Marker position={[newPinCoords.lat, newPinCoords.lng]} icon={createCustomPin('New')}>
            <Popup>
              <span className="text-xs font-semibold text-blue-700">New Mandi Target Coordinates</span>
            </Popup>
          </Marker>
        )}

        {/* Existing Mandi Pins */}
        {mandis.map((m) => {
          if (!m.coordinates?.lat || !m.coordinates?.lng) return null;

          return (
            <Marker
              key={m._id || m.name}
              position={[m.coordinates.lat, m.coordinates.lng]}
              icon={createCustomPin(m.status)}
              eventHandlers={{
                click: () => onSelectMandi && onSelectMandi(m),
              }}
            >
              <Popup>
                <div className="text-xs p-1 space-y-1">
                  <span className="font-bold text-slate-800 text-sm block">{m.name}</span>
                  <p className="text-slate-600">{m.location}</p>
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-200 text-slate-700">
                    <span>Slots Left: <strong>{m.availableSlotsCount || 40}</strong></span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}