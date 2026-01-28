'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Use a DivIcon with CSS to create a marker causing zero network issues
const createCustomIcon = () =>
  L.divIcon({
    className: 'bg-transparent',
    html: `<div class="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-lg pointer-events-none"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12], // Center the icon
    popupAnchor: [0, -12], // Popup above the icon
  });

interface UniversityMapProps {
  name: string;
  country?: string;
  locations?: { label: string; lat: number; lng: number }[];
}

const UniversityMap: React.FC<UniversityMapProps> = ({
  // name,
  // country,
  locations = [],
}) => {
  const mapRef = React.useRef<L.Map | null>(null);
  const [activeLocationIndex, setActiveLocationIndex] = React.useState(0);

  const markers = locations.map((loc) => ({
    name: loc.label,
    lat: loc.lat,
    lng: loc.lng,
  }));

  const center: [number, number] =
    markers.length > 0 ? [markers[0].lat, markers[0].lng] : [20, 0];
  const zoom = markers.length > 0 ? 14 : 2;

  const handleFlyTo = (index: number, lat: number, lng: number) => {
    setActiveLocationIndex(index);
    mapRef.current?.flyTo([lat, lng], 16, {
      duration: 1.5,
      easeLinearity: 0.25,
    });
  };

  return (
    <div className="w-full h-full relative z-0 group">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%', borderRadius: '1.5rem' }}
        className="z-0 focus:outline-none"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker, idx) => (
          <Marker
            key={idx}
            position={[marker.lat, marker.lng]}
            icon={createCustomIcon()}
            eventHandlers={{
              click: () => handleFlyTo(idx, marker.lat, marker.lng),
            }}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating Campus Controls */}
      {markers.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-1000 flex gap-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-1.5 rounded-full shadow-xl border border-gray-200 dark:border-zinc-700 transition-all opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {markers.map((loc, idx) => {
            const isActive = activeLocationIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleFlyTo(idx, loc.lat, loc.lng)}
                className={`
                  px-4 py-2 text-xs font-semibold rounded-full transition-all flex items-center gap-2 whitespace-nowrap
                  ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
                  }
                `}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-white' : 'bg-blue-500'
                  }`}
                />
                {loc.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UniversityMap;
