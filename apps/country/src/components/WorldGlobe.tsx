'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useThemeStore } from '@repo/web-shared';
import { motion } from 'framer-motion';

// Dynamically import Globe with no SSR to avoid window issues
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen text-white">
      Loading Globe...
    </div>
  ),
});

export function WorldGlobe() {
  const globeEl = useRef<any>(null);
  const isDark = useThemeStore((state) => state.isDark);
  const [countries, setCountries] = useState({ features: [] });
  const [hoverD, setHoverD] = useState<any | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [arcsData, setArcsData] = useState<any[]>([]);
  const [continents, setContinents] = useState<string[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null,
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // Store position as { x, y } in pixels relative to center. Null means "default centered".
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    // Load country polygons from a reliable public source (50m for better resolution/Singapore)
    fetch('/data/ne_50m_admin_0_countries.geojson')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        // Extract unique continents
        const uniqueContinents = Array.from(
          new Set(data.features.map((f: any) => f.properties.CONTINENT)),
        )
          .filter(Boolean)
          .sort() as string[];
        setContinents(uniqueContinents);
      })
      .catch((error) => {
        console.error('Failed to load country data:', error);
      });
  }, []);

  // Pause rotation when hovering a country
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = !hoverD && !selectedCountry;
    }
  }, [hoverD, selectedCountry]);

  useEffect(() => {
    // Auto-rotate setting
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }
  }, [globeEl.current]);

  const handleGlobeClick = () => {
    if (globeEl.current) {
      // Toggle rotation
      globeEl.current.controls().autoRotate =
        !globeEl.current.controls().autoRotate;
    }
  };

  const handlePolygonClick = (d: any) => {
    setSelectedCountry(d);

    // Stop rotation when a country is selected
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = false;

      // Try to get centroid
      const lat =
        d.properties.label_y ||
        d.properties.LABEL_Y ||
        d.properties.LAT ||
        d.properties.lat;
      const lng =
        d.properties.label_x ||
        d.properties.LABEL_X ||
        d.properties.LONG ||
        d.properties.lon ||
        d.properties.lng;

      // Only fly to country if we have valid coordinates
      if (lat && lng) {
        // Calculate minimal bounding box for zoom level
        let minLat = 90,
          maxLat = -90,
          minLng = 180,
          maxLng = -180;

        // Helper to traverse GeoJSON coordinates (Polygon or MultiPolygon)
        const traverse = (coords: any[]) => {
          // Check if leaf coordinate pair [lng, lat]
          if (
            coords.length === 2 &&
            typeof coords[0] === 'number' &&
            typeof coords[1] === 'number'
          ) {
            const l = coords[0];
            const t = coords[1];
            if (l < minLng) minLng = l;
            if (l > maxLng) maxLng = l;
            if (t < minLat) minLat = t;
            if (t > maxLat) maxLat = t;
          } else {
            coords.forEach((c) => traverse(c));
          }
        };

        if (d.geometry && d.geometry.coordinates) {
          traverse(d.geometry.coordinates);
        }

        const latSpan = Math.abs(maxLat - minLat);
        const lngSpan = Math.abs(maxLng - minLng);
        const maxSpan = Math.max(latSpan, lngSpan);

        // Heuristic for altitude: Small countries need close zoom, large need far.
        // Base 0.1 (very close), add factor of span.
        // Cap at 2.5 (view whole earth) and min 0.15.
        // For Russia (span ~170), alt ~ 4.0 -> clamped to 2.5
        // For Singapore (span ~0.4), alt ~ 0.1 + 0.01 = 0.11.
        let altitude = Math.max(0.15, Math.min(2.5, maxSpan * 0.04 + 0.1));

        globeEl.current.pointOfView({ lat, lng, altitude }, 1000);

        // Generate Arcs
        const potentialTargets = countries.features.filter((f: any) => f !== d);
        const numArcs = Math.floor(Math.random() * 4) + 2; // 2 to 5 arcs
        const newArcs = [];

        for (let i = 0; i < numArcs; i++) {
          const target: any =
            potentialTargets[
              Math.floor(Math.random() * potentialTargets.length)
            ];
          const tLat =
            target.properties.label_y ||
            target.properties.LABEL_Y ||
            target.properties.LAT ||
            target.properties.lat;
          const tLng =
            target.properties.label_x ||
            target.properties.LABEL_X ||
            target.properties.LONG ||
            target.properties.lng;

          if (tLat && tLng) {
            newArcs.push({
              startLat: lat,
              startLng: lng,
              endLat: tLat,
              endLng: tLng,
              color: ['rgba(147, 197, 253, 0.8)', 'rgba(252, 165, 165, 0.8)'][
                Math.floor(Math.random() * 2)
              ],
            });
          }
        }
        setArcsData(newArcs);
      }
    }
  };

  const handleCloseMenu = () => {
    setSelectedCountry(null);
    setArcsData([]); // Clear arcs
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
    }
  };

  const handleContinentSelect = (continent: string | null) => {
    setSelectedContinent(continent);
    setSelectedCountry(null); // Clear country selection when filter changes
    setIsMobileFilterOpen(false); // Close mobile menu after selection
    if (continent === null) {
      // Reset view
      if (globeEl.current) {
        globeEl.current.pointOfView({ altitude: 2.5 }, 1000);
      }
    }
  };

  // Filter countries based on selection
  const visibleCountries = useMemo(() => {
    if (!selectedContinent) return countries.features;
    return countries.features.filter(
      (f: any) => f.properties.CONTINENT === selectedContinent,
    );
  }, [countries, selectedContinent]);

  // Curated pleasing palette
  const colorPalette = [
    '#1e3a8a', // Blue 900
    '#1e40af', // Blue 800
    '#3730a3', // Indigo 800
    '#312e81', // Indigo 900
    '#115e59', // Teal 800
    '#134e4a', // Teal 900
    '#0f172a', // Slate 900
    '#334155', // Slate 700
    '#4c1d95', // Violet 900
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white">
      {/* Continent Filter - Responsive Design */}

      {/* Desktop View: Horizontal Pills */}
      <div className="hidden md:flex absolute top-24 left-0 right-0 z-50 justify-center pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-2 pointer-events-auto overflow-x-auto max-w-[90vw] flex gap-2 scrollbar-none shadow-2xl">
          <button
            onClick={() => handleContinentSelect(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              !selectedContinent
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            All World
          </button>
          {continents.map((c) => (
            <button
              key={c}
              onClick={() => handleContinentSelect(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                selectedContinent === c
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar - Responsive Positioning */}
      <div className="absolute top-24 z-50 w-[90vw] left-1/2 -translate-x-1/2 md:w-80 md:right-4 md:left-auto md:translate-x-0 transition-all duration-300">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search country..."
            className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-full leading-5 bg-gray-900/90 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-900 focus:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm backdrop-blur-md shadow-lg transition-all"
            onChange={(e) => {
              const val = e.target.value.toLowerCase();
              if (!val) {
                setSearchResults([]);
                return;
              }
              const matches = countries.features
                .filter((f: any) =>
                  f.properties.ADMIN.toLowerCase().includes(val),
                )
                .slice(0, 5); // Limit to 5 results
              setSearchResults(matches);
            }}
          />

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute mt-2 w-full bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <ul>
                {searchResults.map((country: any) => (
                  <li key={country.properties.ISO_A2}>
                    <button
                      className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white border-b border-white/5 last:border-0 flex justify-between items-center transition-colors"
                      onClick={() => {
                        handlePolygonClick(country);
                        setSearchResults([]);
                        // Clear input manually
                        const input = document.querySelector(
                          'input[placeholder="Search country..."]',
                        ) as HTMLInputElement;
                        if (input) input.value = '';
                      }}
                    >
                      <span>{country.properties.ADMIN}</span>
                      <span className="text-xs text-gray-500 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                        {country.properties.ISO_A2}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile View: Dropdown Button (Hidden as requested) */}
      {/* <div className="hidden md:hidden absolute top-24 left-4 z-50 pointer-events-auto"> ... </div> */}

      <Globe
        ref={globeEl}
        // globeImageUrl={undefined}
        backgroundImageUrl="/images/night-sky.png"
        lineHoverPrecision={0}
        polygonsData={visibleCountries}
        polygonAltitude={(d: any) => (d === hoverD ? 0.12 : 0.06)}
        polygonCapColor={(d: any) => {
          if (d === hoverD) return 'rgba(59, 130, 246, 1)';
          if (d === selectedCountry) return 'rgba(16, 185, 129, 1)';

          const str = d.properties.ADMIN || '';
          let hash = 0;
          for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
          }
          const index = Math.abs(hash) % colorPalette.length;
          return colorPalette[index];
        }}
        polygonSideColor={() => 'rgba(0, 0, 0, 0.5)'}
        polygonStrokeColor={() => '#555'}
        polygonLabel={({ properties: d }: any) => `
            <div class="bg-gray-900/95 text-white p-3 rounded-lg border border-blue-500/30 backdrop-blur-md shadow-xl min-w-[200px]">
              <div class="font-bold text-lg mb-2 text-blue-100">${
                d.ADMIN
              } <span class="text-xs text-gray-500 font-normal">(${
                d.ISO_A2
              })</span></div>
              <div class="space-y-1.5 text-xs text-gray-300">
                  <div class="flex justify-between gap-4 border-b border-white/10 pb-1">
                    <span>Population</span> 
                    <span class="text-white font-mono">${
                      d.POP_EST ? Number(d.POP_EST).toLocaleString() : 'N/A'
                    }</span>
                  </div>
                  ${
                    d.GDP_MD_EST
                      ? `
                  <div class="flex justify-between gap-4 border-b border-white/10 pb-1">
                    <span>GDP (Est.)</span> 
                    <span class="text-emerald-400 font-mono">$${Number(
                      d.GDP_MD_EST,
                    ).toLocaleString()} M</span>
                  </div>`
                      : ''
                  }
                  ${
                    d.ECONOMY
                      ? `
                  <div class="flex justify-between gap-4 pt-1">
                    <span>Economy</span> 
                    <span class="text-white font-medium text-right max-w-[120px] leading-tight">${d.ECONOMY.replace(
                      /^\d+\.\s*/,
                      '',
                    )}</span>
                  </div>`
                      : ''
                  }
                  ${
                    d.INCOME_GRP
                      ? `
                  <div class="flex justify-between gap-4 pt-1">
                    <span>Income</span> 
                    <span class="text-blue-300 font-medium text-right max-w-[120px] leading-tight">${d.INCOME_GRP.replace(
                      /^\d+\.\s*/,
                      '',
                    )}</span>
                  </div>`
                      : ''
                  }
                  <div class="md:hidden mt-2 pt-2 border-t border-white/10 text-xs font-semibold text-blue-300 flex items-center justify-center gap-1 animate-pulse">
                    Click for more details
                  </div>
              </div>
            </div>
          `}
        onPolygonHover={setHoverD}
        onPolygonClick={handlePolygonClick}
        onGlobeClick={handleGlobeClick}
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={0.4}
        arcDashGap={2}
        arcDashAnimateTime={2000}
        arcStroke={1.5}
      />

      {/* Selected Country Menu Overlay - Draggable & Forced Dark Mode */}
      {selectedCountry && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            x: popupPosition?.x ?? 0,
            y: popupPosition?.y ?? 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: popupPosition?.x ?? 0,
            y: popupPosition?.y ?? 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            x: popupPosition?.x ?? 0,
            y: popupPosition?.y ?? 0,
          }}
          drag
          dragMomentum={false}
          onDragEnd={(_, info) => {
            setPopupPosition({
              x: (popupPosition?.x ?? 0) + info.offset.x,
              y: (popupPosition?.y ?? 0) + info.offset.y,
            });
          }}
          className="absolute top-36 left-4 right-4 md:left-auto md:right-4 bg-gray-900/95 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl text-white md:w-72 z-50 cursor-move"
        >
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent pointer-events-none select-none">
              {selectedCountry.properties.ADMIN}
            </h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseMenu();
              }}
              className="text-gray-400 hover:text-white p-1"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            className="flex flex-col space-y-3 cursor-default"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
              Enter Country Page
            </button>

            <a
              href={`https://immi.eliteworld.top/search?q=${selectedCountry.properties.ADMIN}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-sm text-center transition-all hover:scale-105"
            >
              Immigration Policy
            </a>

            <a
              href={`https://edu.eliteworld.top/search?q=${selectedCountry.properties.ADMIN}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium text-sm text-center transition-all hover:scale-105"
            >
              Education System
            </a>
          </div>
        </motion.div>
      )}

      {/* Instruction Overlay */}
      {!selectedCountry && (
        <div className="absolute bottom-20 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-xs md:text-sm pointer-events-none animate-pulse whitespace-nowrap z-30">
          Click a country to explore • Click background to pause
        </div>
      )}
    </div>
  );
}
