'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import the map component with SSR disabled
const SearchMapInner = dynamic(() => import('./SearchMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full rounded-2xl bg-gray-100 dark:bg-[#1A1A1A] animate-pulse flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-lg">
      <div className="text-gray-400 font-semibold tracking-widest uppercase text-sm">Loading Map...</div>
    </div>
  ),
});

interface SearchMapProps {
  courses: any[];
  center: { lat: number; lng: number };
  onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
  isMobileMode?: boolean;
}

export default function SearchMap(props: SearchMapProps) {
  return <SearchMapInner {...props} />;
}
