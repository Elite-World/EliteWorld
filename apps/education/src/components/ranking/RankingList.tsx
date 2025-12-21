'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniversityRanking } from '@repo/web-shared';
import RankingCard from './RankingCard';
import RankingFilters from './RankingFilters';

interface RankingListProps {
  initialUniversities: UniversityRanking[];
}

const RankingList: React.FC<RankingListProps> = ({ initialUniversities }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [sortOption, setSortOption] = useState('rank-asc');

  // Extract unique countries for filter dropdown
  const countries = useMemo(() => {
    const uniqueCountries = new Set(initialUniversities.map((u) => u.country));
    return Array.from(uniqueCountries).sort();
  }, [initialUniversities]);

  // Filter and sort universities
  const filteredUniversities = useMemo(() => {
    let result = initialUniversities.filter((uni) => {
      const matchesSearch = uni.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry
        ? uni.country === selectedCountry
        : true;
      return matchesSearch && matchesCountry;
    });

    // Sort logic
    result.sort((a, b) => {
      switch (sortOption) {
        case 'rank-asc':
          return a.rank - b.rank;
        case 'rank-desc':
          return b.rank - a.rank;
        case 'score-desc':
          return b.overallScore - a.overallScore;
        case 'score-asc':
          return a.overallScore - b.overallScore;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return result;
  }, [initialUniversities, searchQuery, selectedCountry, sortOption]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters Section */}
      <RankingFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        sortOption={sortOption}
        setSortOption={setSortOption}
        countries={countries}
      />

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-1">
        <span>Showing {filteredUniversities.length} universities</span>
      </div>

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni, index) => (
              <RankingCard key={uni.id} university={uni} index={index} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-gray-500 dark:text-gray-400"
            >
              No universities found matching your criteria.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RankingList;
