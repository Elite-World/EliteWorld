'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';

const UniversityMap = dynamic(() => import('./UniversityMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-zinc-800 rounded-3xl animate-pulse">
      <MapPin className="w-8 h-8 text-gray-400" />
    </div>
  ),
});

interface UniversityLocationTabProps {
  name: string;
  country: string;
  locations?: { label: string; lat: number; lng: number }[];
}

export const UniversityLocationTab: React.FC<UniversityLocationTabProps> = ({
  name,
  country,
  locations,
}) => {
  return (
    <div className="bg-white dark:bg-zinc-900 p-2 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm h-[400px] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-0">
      <UniversityMap name={name} country={country} locations={locations} />
    </div>
  );
};
