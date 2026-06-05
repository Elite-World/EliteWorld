'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
  ScaleControl,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Course } from '@/types';
import { Plus, Minus, Maximize2, X } from 'lucide-react';

// Fix for default marker icon in react-leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// A helper component to programmatically change the map view
function MapUpdater({ center }: { center: { lat: number; lng: number } }) {
  const map = useMap();
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom(), {
      animate: true,
    });
  }, [center.lat, center.lng, map]);
  return null;
}

// Helper component to fix Leaflet rendering when container size changes
function MapResizeHandler({ isFullscreen }: { isFullscreen: boolean }) {
  const map = useMap();
  useEffect(() => {
    // Aggressively invalidate size on mount and fullscreen toggle for mobile browsers
    const timeouts = [100, 300, 600, 1000].map((ms) =>
      setTimeout(() => map.invalidateSize(), ms),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isFullscreen, map]);
  return null;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Helper to broadcast map bounds when user pans/zooms
function MapBoundsListener({
  onBoundsChange,
}: {
  onBoundsChange?: (bounds: MapBounds) => void;
}) {
  const map = useMapEvents({
    moveend: () => updateBounds(),
    zoomend: () => updateBounds(),
  });

  const updateBounds = useCallback(() => {
    if (!onBoundsChange) return;
    const bounds = map.getBounds();
    onBoundsChange({
      north: bounds.getNorthEast().lat,
      south: bounds.getSouthWest().lat,
      east: bounds.getNorthEast().lng,
      west: bounds.getSouthWest().lng,
    });
  }, [map, onBoundsChange]);

  // Initial bounds on mount
  useEffect(() => {
    // Wait a tiny bit for map container to settle its dimensions
    const timeout = setTimeout(() => {
      updateBounds();
    }, 100);
    return () => clearTimeout(timeout);
  }, [updateBounds]);

  return null;
}

// Custom controls for Zoom and Fullscreen
function CustomMapControls({
  isFullscreen,
  toggleFullscreen,
}: {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}) {
  const map = useMap();

  return (
    <div className="absolute top-4 right-4 z-400 flex flex-col gap-3">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFullscreen();
        }}
        className="bg-white dark:bg-[#1A1A1A] text-gray-800 dark:text-gray-200 p-2.5 rounded-full shadow-md border border-gray-100 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all flex items-center justify-center"
        aria-label="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <X className="w-5 h-5" />
        ) : (
          <Maximize2 className="w-5 h-5" />
        )}
      </button>

      <div className="bg-white dark:bg-[#1A1A1A] flex flex-col rounded-3xl shadow-md border border-gray-100 dark:border-white/10 overflow-hidden">
        <button
          onClick={(e) => {
            e.preventDefault();
            map.zoomIn();
          }}
          className="text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center border-b border-gray-100 dark:border-white/10"
          aria-label="Zoom In"
        >
          <Plus className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            map.zoomOut();
          }}
          className="text-gray-800 dark:text-gray-200 p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center"
          aria-label="Zoom Out"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

interface SearchMapInnerProps {
  courses: Course[];
  center: { lat: number; lng: number };
  onBoundsChange?: (bounds: MapBounds) => void;
  isMobileMode?: boolean;
}

export default function SearchMapInner({
  courses,
  center,
  onBoundsChange,
  isMobileMode,
}: SearchMapInnerProps) {
  // Use a ref to store the initial center to avoid re-rendering the whole map container on center change
  const initialCenter = useRef(center);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // We toggle a fixed overlay styling when fullscreen
  // Placing it below the header and filters, with padding around the edges for a "contained" look
  const containerClasses = isFullscreen
    ? 'fixed top-[153px] left-4 right-4 bottom-4 lg:left-8 lg:right-8 lg:bottom-8 z-40 bg-white dark:bg-[#0a0a0a] shadow-2xl rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10'
    : isMobileMode
      ? 'w-full h-full relative'
      : 'w-full h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg relative';

  return (
    <>
      {isFullscreen && (
        <div className="fixed inset-0 z-30 bg-gray-50/80 dark:bg-[#0a0a0a]/80 backdrop-blur-sm animate-in fade-in duration-300" />
      )}
      <div className={containerClasses}>
        <MapContainer
          center={[initialCenter.current.lat, initialCenter.current.lng]}
          zoom={12}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <MapUpdater center={center} />
          <MapResizeHandler isFullscreen={isFullscreen} />
          <MapBoundsListener onBoundsChange={onBoundsChange} />
          <CustomMapControls
            isFullscreen={isFullscreen}
            toggleFullscreen={() => setIsFullscreen(!isFullscreen)}
          />

          {courses.map((course) => {
            // If course has no real coordinates, skip it (e.g., Online)
            if (course.coordinates.lat === 0 && course.coordinates.lng === 0)
              return null;

            return (
              <Marker
                key={course.id}
                position={[course.coordinates.lat, course.coordinates.lng]}
              >
                <Popup>
                  <div className="font-sans">
                    <div className="font-bold text-gray-900 truncate max-w-[200px]">
                      {course.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${course.price} {course.priceUnit}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Custom attribution control in bottom right */}
          <div className="leaflet-bottom leaflet-right">
            <div className="leaflet-control-attribution leaflet-control">
              <a
                href="https://leafletjs.com"
                title="A JS library for interactive maps"
              >
                Leaflet
              </a>{' '}
              | &copy;{' '}
              <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap
              </a>{' '}
              contributors
            </div>
          </div>

          {/* Map Scale */}
          <ScaleControl position="bottomleft" imperial={true} metric={true} />
        </MapContainer>
      </div>
    </>
  );
}
