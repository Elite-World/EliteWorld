'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniversityRanking } from '@repo/web-shared';
import RankingCard from './RankingCard';
import RankingFilters from './RankingFilters';
import RankingDetailModal from './RankingDetailModal';

interface RankingListProps {
  initialUniversities: UniversityRanking[];
}

const RankingList: React.FC<RankingListProps> = ({ initialUniversities }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedSource, setSelectedSource] = useState('qs'); // Default source

  // Modal State
  const [selectedUniversity, setSelectedUniversity] =
    useState<UniversityRanking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUniversityClick = (uni: UniversityRanking) => {
    setSelectedUniversity(uni);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedUniversity(null), 300); // Clear after animation
  };

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

      // Filter by existence in the selected ranking source
      // If ranks map is missing or selectedSource not in it, filter out
      const hasRank = uni.ranks && uni.ranks[selectedSource] !== undefined;

      return matchesSearch && matchesCountry && hasRank;
    });

    // Sort logic: Sort by rank in selected source, then by name
    result.sort((a, b) => {
      const rankA = (a.ranks && a.ranks[selectedSource]) || 999999;
      const rankB = (b.ranks && b.ranks[selectedSource]) || 999999;

      if (rankA !== rankB) {
        return (rankA as number) - (rankB as number);
      }
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });

    return result;
  }, [initialUniversities, searchQuery, selectedCountry, selectedSource]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Filters Section */}
      <RankingFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        countries={countries}
      />

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-1">
        <span>
          Showing {filteredUniversities.length} universities from{' '}
          {selectedSource.toUpperCase()}
        </span>
      </div>

      {/* List - Grid Layout Override */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredUniversities.length > 0 ? (
            filteredUniversities.map((uni, index) => (
              <RankingCard
                key={uni.id}
                university={uni}
                index={index}
                onClick={handleUniversityClick}
                selectedSource={selectedSource}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center py-20 text-gray-500 dark:text-gray-400"
            >
              <div className="text-lg">No universities found</div>
              <p className="text-sm mt-2">Try adjusting your filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal Integration */}
      <RankingDetailModal
        university={selectedUniversity}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RankingList;
