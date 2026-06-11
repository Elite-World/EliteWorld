'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UniversityRanking, useLanguageStore } from '@repo/domain';
import RankingCard from './RankingCard';
import RankingFilters from './RankingFilters';
import { fetchRankings } from '@/app/[locale]/ranking/actions';
import { useRouter } from 'next/navigation';

interface RankingListProps {
  initialUniversities: UniversityRanking[];
  currentYear: number;
  initialSource: string;
  initialRankType: 'General' | 'Subject';
  initialSubject?: string;
  initialCountry?: string;
  meta: {
    generalSources: { value: string; label: string }[];
    subjectSources: { value: string; label: string }[];
    years: {
      general: Record<string, number[]>;
      subject: Record<string, number[]>;
    };
    subjects: Record<
      string,
      Record<string, { label: string; value: string }[]>
    >;
  };
}

const RankingList: React.FC<RankingListProps> = ({
  initialUniversities,
  currentYear: initialYear,
  initialSource,
  initialRankType,
  initialSubject,
  initialCountry,
  meta,
}) => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const language = useLanguageStore((state) => state.language);
  const isZh = language === 'zh';

  // State
  const [universities, setUniversities] =
    useState<UniversityRanking[]>(initialUniversities);
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [rankType, setRankType] = useState<'General' | 'Subject'>(
    initialRankType,
  );
  const [selectedSource, setSelectedSource] = useState(initialSource);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject || '');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(initialCountry || '');
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);

  // Sync external URL changes (e.g., from map clicks) into local state
  useEffect(() => {
    setSelectedCountry(initialCountry || '');
  }, [initialCountry]);



  // Derived Data
  const currentSources =
    rankType === 'General' ? meta.generalSources : meta.subjectSources;

  const yearsBySource =
    rankType === 'General' ? meta.years.general : meta.years.subject;

  const availableYears = yearsBySource[selectedSource] || [];

  // Data Fetching Wrapper
  const updateData = async (
    year: number,
    source: string,
    type: 'General' | 'Subject',
    subject?: string,
    country?: string,
  ) => {
    setIsLoading(true);

    // Update URL
    const params = new URLSearchParams();
    if (year) params.set('year', year.toString());
    if (source) params.set('source', source);
    if (type) params.set('rankType', type);
    if (type === 'Subject' && subject) params.set('subject', subject);
    if (country) params.set('country', country);

    router.replace(`?${params.toString()}`, { scroll: false });

    try {
      const data = await fetchRankings(year, source, type, subject);
      setUniversities(data);
    } catch (error) {
      console.error('Failed to fetch rankings', error);
      setUniversities([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers
  const handleRankTypeChange = (type: 'General' | 'Subject') => {
    setRankType(type);

    const isGeneral = type === 'General';
    const activeSources = isGeneral ? meta.generalSources : meta.subjectSources;
    const defaultSource = activeSources[0]?.value || 'qs';

    setSelectedSource(defaultSource);

    const sourceYears = isGeneral ? meta.years.general[defaultSource] : meta.years.subject[defaultSource];
    const defaultYear = sourceYears ? sourceYears[0] : currentYear;

    setCurrentYear(defaultYear);

    let defaultSubject = undefined;
    if (!isGeneral && meta.subjects[defaultSource]) {
      const allSubjects = Object.values(meta.subjects[defaultSource]).flat();
      defaultSubject = allSubjects[0]?.value || '';
      setSelectedSubject(defaultSubject);
    }

    updateData(
      defaultYear,
      defaultSource,
      type,
      defaultSubject,
      selectedCountry,
    );
  };

  const handleSourceChange = (source: string) => {
    setSelectedSource(source);

    // If changing source, select default year/subject from new metadata structures
    const isGeneral = rankType === 'General';
    const sourceYears = isGeneral ? meta.years.general[source] : meta.years.subject[source];
    const sourceDefaultYear = sourceYears ? sourceYears[0] : currentYear;

    setCurrentYear(sourceDefaultYear);

    // Pick first subject if we switch source in Subject mode
    let defaultSubject = selectedSubject;
    if (!isGeneral && meta.subjects[source]) {
      const allSubjects = Object.values(meta.subjects[source]).flat();
      defaultSubject = allSubjects[0]?.value || '';
      setSelectedSubject(defaultSubject);
    }

    updateData(
      sourceDefaultYear,
      source,
      rankType,
      isGeneral ? undefined : defaultSubject,
      selectedCountry,
    );
  };

  const handleYearChange = (year: number) => {
    setCurrentYear(year);
    updateData(
      year,
      selectedSource,
      rankType,
      selectedSubject,
      selectedCountry,
    );
  };

  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
    updateData(currentYear, selectedSource, rankType, subject, selectedCountry);
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    updateData(currentYear, selectedSource, rankType, selectedSubject, country);
  };

  const handleUniversityClick = (uni: UniversityRanking, profileUrl: string) => {
    router.push(profileUrl);
  };

  const countries = useMemo(() => {
    const uniqueCountries = new Set(universities.map((u) => u.country));
    return Array.from(uniqueCountries).sort();
  }, [universities]);

  const filteredUniversities = useMemo(() => {
    const result = universities.filter((uni) => {
      const matchesSearch = uni.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry
        ? uni.country === selectedCountry
        : true;
      const hasRank = uni.ranks && uni.ranks[selectedSource] !== undefined;
      return matchesSearch && matchesCountry && hasRank;
    });

    result.sort((a, b) => {
      const ranksA = a.ranks || {};
      const ranksB = b.ranks || {};
      const rA = ranksA[selectedSource];
      const rB = ranksB[selectedSource];

      const rankA = typeof rA === 'string' ? parseInt(rA) : rA || 999999;
      const rankB = typeof rB === 'string' ? parseInt(rB) : rB || 999999;

      if (rankA !== rankB) return rankA - rankB;

      const nameA = a.nameEn || a.name || '';
      const nameB = b.nameEn || b.name || '';

      return nameA.localeCompare(nameB, 'en');
    });

    return result;
  }, [universities, searchQuery, selectedCountry, selectedSource]);

  // Reset visible count when filters/search change
  useEffect(() => {
    setVisibleCount(50);
  }, [
    selectedSource,
    currentYear,
    searchQuery,
    selectedCountry,
    rankType,
    selectedSubject,
    universities,
  ]);

  const displayedUniversities = useMemo(() => {
    return filteredUniversities.slice(0, visibleCount);
  }, [filteredUniversities, visibleCount]);

  const hasMore = visibleCount < filteredUniversities.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 50);
  };

  const selectedSourceLabel =
    currentSources.find((s) => s.value === selectedSource)?.label ||
    selectedSource.toUpperCase();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RankingFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCountry={selectedCountry}
        setSelectedCountry={handleCountryChange}
        countries={countries}
        rankType={rankType}
        setRankType={handleRankTypeChange}
        selectedSource={selectedSource}
        setSelectedSource={handleSourceChange}
        rankingSources={currentSources}
        currentYear={currentYear}
        onYearChange={handleYearChange}
        availableYears={availableYears}
        yearsBySource={yearsBySource}
        selectedSubject={selectedSubject}
        setSelectedSubject={handleSubjectChange}
        subjects={meta.subjects[selectedSource]} // Pass subjects only for current source
      />

      <div className="mb-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 px-1">
        <span>
          {isZh ? (
            <>
              正在从 {selectedSourceLabel} {rankType === 'Subject' ? `- ${selectedSubject} ` : ''}({currentYear}) 显示 {filteredUniversities.length} 所大学
            </>
          ) : (
            <>
              Showing {filteredUniversities.length} universities from{' '}
              {selectedSourceLabel}{' '}
              {rankType === 'Subject' ? `- ${selectedSubject} ` : ''}({currentYear})
            </>
          )}
        </span>
        {isLoading && (
          <span className="text-blue-500 animate-pulse">{isZh ? '更新中...' : 'Updating...'}</span>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {displayedUniversities.map((uni, index) => {
            const countrySlug = (uni.country || 'global')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            const nameSlug = (uni.nameEn || uni.name)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            const profileUrl = `/universities/${countrySlug}/${nameSlug}`;

            return (
              <RankingCard
                key={uni.id}
                index={index}
                university={uni}
                onClick={(uni) => handleUniversityClick(uni, profileUrl)}
                selectedSource={selectedSource}
                onRankClick={handleSourceChange}
                hideFooterRanks={rankType === 'Subject'}
                href={profileUrl}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleShowMore}
            className="px-8 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100 font-medium rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 hover:shadow-md transition-all active:scale-95"
          >
            {isZh ? '加载更多大学' : 'Show More Universities'}
          </button>
        </div>
      )}

    </div>
  );
};

export default RankingList;
