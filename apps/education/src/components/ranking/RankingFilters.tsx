import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ArrowDownUp,
  ListOrdered,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Commonly used ranking sources
export const RANKING_SOURCES = [
  { value: 'qs', label: 'QS World University Rankings' },
  { value: 'the', label: 'THE World University Rankings' },
  { value: 'usnews', label: 'U.S. News Global Universities' },
  { value: 'arwu', label: 'ARWU (Shanghai Ranking)' },
  { value: 'cwur', label: 'CWUR World University Rankings' },
  { value: 'guardian', label: 'The Guardian University Guide' },
];

interface RankingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  countries: string[];
}

const RankingFilters: React.FC<RankingFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  selectedSource,
  setSelectedSource,
  countries,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // Mobile accordion states
  const [expandedSection, setExpandedSection] = useState<
    'country' | 'source' | null
  >(null);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  // Desktop Controls (Native Selects work fine on desktop)
  const DesktopFilterControls = () => (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search university..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all outline-none"
        />
      </div>

      {/* Filters Group */}
      <div className="flex gap-4">
        {/* Country Filter */}
        <div className="relative min-w-[180px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer transition-all outline-none"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <ArrowDownUp className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none opacity-50" />
        </div>

        {/* Ranking Source Filter */}
        <div className="relative min-w-[240px]">
          <ListOrdered className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer transition-all outline-none"
          >
            {RANKING_SOURCES.map((source) => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP: Standard Horizontal Layout */}
      <div className="hidden md:block mb-8 p-4 bg-white/70 dark:bg-zinc-900/70 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 sticky top-20 z-20 backdrop-blur-xl">
        <DesktopFilterControls />
      </div>

      {/* MOBILE: Sticky Header + Drawer Trigger */}
      <div className="md:hidden sticky top-[4.5rem] z-30 mb-6 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-3 px-4 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        <span className="font-semibold text-gray-900 dark:text-white text-sm">
          Filters & Search
        </span>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 transition active:scale-95"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[90%] max-w-sm bg-white dark:bg-[#18181b] z-50 p-6 flex flex-col shadow-2xl md:hidden border-l border-white/10"
            >
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-6">
                {/* Mobile Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search university..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3.5 text-base bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white placeholder:text-gray-400 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Mobile Country Accordion */}
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === 'country' ? null : 'country'
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Filter className="w-4 h-4" /> Country
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {selectedCountry || 'All'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedSection === 'country' && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-1 max-h-60 overflow-y-auto border-t border-gray-200 dark:border-zinc-700">
                          <button
                            onClick={() => {
                              setSelectedCountry('');
                              setExpandedSection(null);
                            }}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              selectedCountry === ''
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                            }`}
                          >
                            All Countries
                          </button>
                          {countries.map((country) => (
                            <button
                              key={country}
                              onClick={() => {
                                setSelectedCountry(country);
                                setExpandedSection(null);
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                selectedCountry === country
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                              }`}
                            >
                              {country}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Ranking Source Accordion */}
                <div className="bg-gray-50 dark:bg-zinc-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === 'source' ? null : 'source'
                      )
                    }
                    className="w-full flex items-center justify-between p-4 text-left"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <ListOrdered className="w-4 h-4" /> Ranking List
                    </span>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium truncate max-w-[120px]">
                      {
                        RANKING_SOURCES.find((s) => s.value === selectedSource)
                          ?.label
                      }
                    </span>
                  </button>

                  <AnimatePresence>
                    {expandedSection === 'source' && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-1 border-t border-gray-200 dark:border-zinc-700">
                          {RANKING_SOURCES.map((source) => (
                            <button
                              key={source.value}
                              onClick={() => {
                                setSelectedSource(source.value);
                                setExpandedSection(null);
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                selectedSource === source.value
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700'
                              }`}
                            >
                              {source.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-100 dark:border-zinc-800 flex gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCountry('');
                    setSelectedSource('qs');
                    setExpandedSection(null);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-900 dark:text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98]"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
                >
                  Show Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default RankingFilters;
