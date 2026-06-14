'use client';;
import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';
import DirectoryCard from './DirectoryCard';

interface UniversityDirectoryClientProps {
  initialUniversities: any[];
  locale?: string;
}

function UniversityDirectoryContent({
  initialUniversities,
  locale,
}: UniversityDirectoryClientProps) {
  const searchParams = useSearchParams();
  const initialCountry = searchParams.get('country') || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);

  // Sync state if URL changes (e.g. back navigation)
  useEffect(() => {
    const countryParam = searchParams.get('country');
    if (countryParam !== null && countryParam !== selectedCountry) {
      setSelectedCountry(countryParam);
    }
  }, [searchParams, selectedCountry]);
  const [visibleCount, setVisibleCount] = useState(50);

  const countries = useMemo(() => {
    const uniqueCountries = new Set(initialUniversities.map((u) => u.country));
    return Array.from(uniqueCountries).sort();
  }, [initialUniversities]);

  const filteredUniversities = useMemo(() => {
    const result = initialUniversities.filter((uni) => {
      const matchesSearch = uni.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry
        ? uni.country === selectedCountry
        : true;
      return matchesSearch && matchesCountry;
    });

    result.sort((a, b) => a.name.localeCompare(b.name, 'en'));

    return result;
  }, [initialUniversities, searchQuery, selectedCountry]);

  const displayedUniversities = useMemo(() => {
    return filteredUniversities.slice(0, visibleCount);
  }, [filteredUniversities, visibleCount]);

  const hasMore = visibleCount < filteredUniversities.length;

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-blue-900/5 border border-gray-100 dark:border-zinc-800 mb-12">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={locale === 'zh' ? '按名称搜索大学...' : 'Search universities by name...'}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(50);
              }}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-zinc-800/50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-zinc-800 transition outline-none"
            />
          </div>

          <div className="w-full md:w-72 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setVisibleCount(50);
              }}
              className="w-full pl-12 pr-10 py-4 bg-gray-50 dark:bg-zinc-800/50 border-0 rounded-2xl appearance-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-zinc-800 transition outline-none"
            >
              <option value="">{locale === 'zh' ? '所有国家' : 'All Countries'}</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Header info */}
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-2">
        <span>
          {locale === 'zh' ? `显示 ${displayedUniversities.length} / ${filteredUniversities.length} 所大学` : `Showing ${displayedUniversities.length} of ${filteredUniversities.length} universities`}
        </span>
      </div>
      {/* Grid */}
      <>
        <div
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-in fade-in duration-500">
          {displayedUniversities.map((uni) => (
            <DirectoryCard key={uni.id} university={uni} />
          ))}
        </div>
      </>
      {/* Load More */}
      {hasMore && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 50)}
            className="px-8 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 font-medium rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 hover:shadow-md transition active:scale-95"
          >
            {locale === 'zh' ? '加载更多大学' : 'Load More Universities'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function UniversityDirectoryClient(props: UniversityDirectoryClientProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center">{props.locale === 'zh' ? '正在加载目录...' : 'Loading directory...'}</div>}>
      <UniversityDirectoryContent {...props} />
    </Suspense>
  );
}
