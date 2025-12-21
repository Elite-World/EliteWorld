import React from 'react';
import { Search, Filter } from 'lucide-react';

interface RankingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  sortOption: string;
  setSortOption: (sort: string) => void;
  countries: string[];
}

const RankingFilters: React.FC<RankingFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  sortOption,
  setSortOption,
  countries,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white dark:bg-zinc-900/50 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm sticky top-20 z-20 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search university..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all"
        />
      </div>

      {/* Country Filter */}
      <div className="relative min-w-[200px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer transition-all"
        >
          <option value="">All Countries</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Sort Filter */}
      <div className="relative min-w-[200px]">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full px-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-gray-100 appearance-none cursor-pointer transition-all"
        >
          <option value="rank-asc">Rank (High to Low)</option>
          <option value="rank-desc">Rank (Low to High)</option>
          <option value="score-desc">Overall Score (High to Low)</option>
          <option value="score-asc">Overall Score (Low to High)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default RankingFilters;
