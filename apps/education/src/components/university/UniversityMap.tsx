'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Use a DivIcon for the main university
const createMainIcon = (slug?: string) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dr435quj2';
  const logoSrc = slug ? `https://res.cloudinary.com/${cloudName}/image/upload/${slug}.png` : '';
  
  return L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-14 h-14 bg-white dark:bg-zinc-800 rounded-full border-4 border-red-600 shadow-xl overflow-hidden flex items-center justify-center z-50">
          <img src="${logoSrc}" alt="logo" class="w-10 h-10 object-contain" onerror="this.src='https://ui-avatars.com/api/?name=${slug}&background=random'" />
        </div>
      </div>
    `,
    iconSize: [56, 56],
    iconAnchor: [28, 28],
    popupAnchor: [0, -28],
  });
};

// Use a DivIcon for neighboring universities
const createNeighborIcon = (titleE: string) => {
  const slug = titleE.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dr435quj2';
  const logoSrc = `https://res.cloudinary.com/${cloudName}/image/upload/${slug}.png`;

  return L.divIcon({
    className: 'bg-transparent',
    html: `
      <div class="w-10 h-10 bg-white/90 dark:bg-zinc-800/90 rounded-full border-2 border-gray-300 dark:border-gray-600 shadow-md overflow-hidden flex items-center justify-center hover:scale-110 transition-transform">
        <img src="${logoSrc}" alt="logo" class="w-7 h-7 object-contain opacity-90" onerror="this.style.display='none'" />
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

interface UniversityMapProps {
  name: string;
  slug?: string;
  country?: string;
  locations?: { label: string; lat: number; lng: number }[];
  nearbyUniversities?: any[];
}

const UniversityMap: React.FC<UniversityMapProps> = ({
  name,
  slug,
  locations = [],
  nearbyUniversities = [],
}) => {
  const mapRef = React.useRef<L.Map | null>(null);

  // The main university's location (fallback to some default if missing)
  const centerLat = locations.length > 0 ? locations[0].lat : 42.3601;
  const centerLng = locations.length > 0 ? locations[0].lng : -71.0942;
  const center: [number, number] = [centerLat, centerLng];

  // Map limits
  const zoom = 6; // Zoomed out to show the network

  return (
    <div className="w-full h-full relative z-0 group rounded-3xl overflow-hidden bg-[#e0eff8] dark:bg-[#0f172a]">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        className="z-0 focus:outline-none"
      >
        {/* Abstract Minimalist Map Layer (Carto Light No Labels) */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          className="map-tiles"
        />

        <style>{`
          /* Custom CSS filter to give it that FP blue tint */
          .map-tiles {
            filter: hue-rotate(190deg) saturate(1.5) brightness(0.95) contrast(1.1);
          }
          .leaflet-container {
            background: #e0eff8 !important;
          }
          .dark .map-tiles {
            filter: invert(1) hue-rotate(180deg) saturate(1.5) brightness(0.8) contrast(1.2);
          }
          .dark .leaflet-container {
            background: #0f172a !important;
          }
        `}</style>

        {/* Draw Polylines to Neighbors */}
        {Array.isArray(nearbyUniversities) && nearbyUniversities.slice(0, 30).map((neighbor, idx) => {
          if (!neighbor.latitude || !neighbor.longitude) return null;
          return (
            <Polyline
              key={`line-${idx}`}
              positions={[center, [neighbor.latitude, neighbor.longitude]]}
              color="#9ca3af" // gray-400
              weight={1}
              opacity={0.6}
            />
          );
        })}

        {/* Draw Neighbor Markers */}
        {Array.isArray(nearbyUniversities) && nearbyUniversities.slice(0, 30).map((neighbor, idx) => {
          if (!neighbor.latitude || !neighbor.longitude) return null;
          return (
            <Marker
              key={`marker-${idx}`}
              position={[neighbor.latitude, neighbor.longitude]}
              icon={createNeighborIcon(neighbor.titleE)}
            >
              <Popup className="rounded-xl font-sans">
                <div className="font-bold text-gray-900">{neighbor.titleC}</div>
                <div className="text-xs text-gray-500 mb-1">{neighbor.titleE}</div>
                <div className="text-xs font-semibold text-indigo-600">{neighbor.rank}</div>
                <div className="text-xs text-gray-400">{neighbor.titleD}</div>
              </Popup>
            </Marker>
          );
        })}

        {/* Draw Central Marker (On Top) */}
        <Marker position={center} icon={createMainIcon(slug)} zIndexOffset={1000}>
          <Popup className="rounded-xl font-sans">
            <div className="font-bold text-gray-900">{name}</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default UniversityMap;
