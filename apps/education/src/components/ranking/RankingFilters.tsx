import React, { useState, useEffect } from 'react';
import {
  Search,
  // Filter,
  X,
  SlidersHorizontal,
  ArrowDownUp,
  ListOrdered,
  Calendar,
  BookOpen,
  Globe,
  ArrowLeft,
  ChevronDown,
  // ChevronRight,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDevStore, useLanguageStore } from '@repo/domain';

interface RankingFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  countries: string[];

  // Tier 1
  rankType: 'General' | 'Subject';
  setRankType: (type: 'General' | 'Subject') => void;

  // Tier 2
  selectedSource: string;
  setSelectedSource: (source: string) => void;
  rankingSources: { value: string; label: string }[];

  // Tier 3
  currentYear: number;
  onYearChange: (year: number) => void;
  availableYears: number[];
  yearsBySource: Record<string, number[]>;

  // Subject Filter
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  subjects?: Record<string, { label: string; value: string }[]>; // Category -> Subjects list
}

const RankingFilters: React.FC<RankingFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCountry,
  setSelectedCountry,
  countries,

  rankType,
  setRankType,

  selectedSource,
  setSelectedSource,
  rankingSources,

  currentYear,
  onYearChange,
  availableYears,

  selectedSubject,
  setSelectedSubject,
  subjects,
}) => {
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  const language = useLanguageStore((state) => state.language);
  const isZh = language === 'zh';

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState<
    'main' | 'country' | 'source' | 'subject'
  >('main');

  // Desktop Subject Menu State
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [subjectSearch, setSubjectSearch] = useState('');

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

  // Reset view when closing
  useEffect(() => {
    if (!isMobileOpen) {
      setTimeout(() => setMobileView('main'), 300);
    }
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Trigger */}
      <div className={`md:hidden flex items-center ${showHiddenElements ? 'justify-between' : 'justify-end'} mb-6`}>
        {showHiddenElements && (
          <div className="flex gap-2 p-1 bg-gray-100 dark:bg-zinc-800 rounded-lg">
            {['General', 'Subject'].map((type) => (
              <button
                key={type}
                onClick={() => setRankType(type as 'General' | 'Subject')}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                  rankType === type
                    ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full text-sm font-medium shadow-sm active:scale-95 transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {isZh ? '筛选' : 'Filters'}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white dark:bg-zinc-900 z-50 overflow-hidden border-l border-gray-200 dark:border-zinc-800 shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex flex-col h-full bg-white dark:bg-zinc-900">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-zinc-800 shrink-0">
                  {mobileView === 'main' ? (
                    <span className="font-semibold text-lg text-gray-900 dark:text-white">
                      {isZh ? '筛选' : 'Filters'}
                    </span>
                  ) : (
                    <button
                      onClick={() => setMobileView('main')}
                      className="flex items-center gap-1 text-blue-600 font-medium"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      {isZh ? '返回' : 'Back'}
                    </button>
                  )}
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto min-h-0">
                  {mobileView === 'main' && (
                    <div className="p-4 space-y-6">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder={isZh ? '搜索大学...' : 'Search university...'}
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 text-base"
                        />
                      </div>

                      {showHiddenElements && (
                        <div className="flex p-1 bg-gray-100 dark:bg-zinc-800 rounded-xl">
                          {['General', 'Subject'].map((type) => (
                            <button
                              key={type}
                              onClick={() =>
                                setRankType(type as 'General' | 'Subject')
                              }
                              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                                rankType === type
                                  ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm'
                                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                              }`}
                            >
                              {type} Ranking
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Globe className="w-4 h-4" /> {isZh ? '国家/地区' : 'Country'}
                        </label>
                        <button
                          onClick={() => setMobileView('country')}
                          className="w-full p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl text-left text-base flex justify-between items-center"
                        >
                          <span
                            className={
                              selectedCountry
                                ? 'text-gray-900 dark:text-gray-100'
                                : 'text-gray-500'
                            }
                          >
                            {selectedCountry || (isZh ? '所有国家' : 'All Countries')}
                          </span>
                          <ArrowDownUp className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <ListOrdered className="w-4 h-4" /> {isZh ? '排名数据源' : 'Ranking Source'}
                        </label>
                        <button
                          onClick={() => setMobileView('source')}
                          className="w-full p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl text-left text-base flex justify-between items-center"
                        >
                          <span className="text-gray-900 dark:text-gray-100">
                            {rankingSources.find(
                              (s) => s.value === selectedSource,
                            )?.label || selectedSource}
                          </span>
                          <ArrowDownUp className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>

                      {rankType === 'Subject' && subjects && (
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> {isZh ? '专业领域' : 'Subject'}
                          </label>
                          <button
                            onClick={() => setMobileView('subject')}
                            className="w-full p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl text-left text-base flex justify-between items-center"
                          >
                            <span
                              className={
                                selectedSubject
                                  ? 'text-gray-900 dark:text-gray-100'
                                  : 'text-gray-500'
                              }
                            >
                              {selectedSubject
                                ? Object.values(subjects)
                                    .flat()
                                    .find((s) => s.value === selectedSubject)
                                    ?.label || selectedSubject
                                : (isZh ? '选择专业' : 'Select Subject')}
                            </span>
                            <ArrowDownUp className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> {isZh ? '年份' : 'Year'}
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {availableYears.map((year) => (
                            <button
                              key={year}
                              onClick={() => onYearChange(year)}
                              className={`py-2 rounded-lg text-sm font-medium transition-all ${
                                currentYear === year
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-gray-300'
                              }`}
                            >
                              {year}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {mobileView === 'country' && (
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                      <button
                        onClick={() => {
                          setSelectedCountry('');
                          setMobileView('main');
                        }}
                        className={`w-full text-left p-4 text-base ${
                          selectedCountry === ''
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {isZh ? '所有国家/地区' : 'All Countries'}
                      </button>
                      {countries.map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setSelectedCountry(c);
                            setMobileView('main');
                          }}
                          className={`w-full text-left p-4 text-base ${
                            selectedCountry === c
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}

                  {mobileView === 'source' && (
                    <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                      {rankingSources.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => {
                            setSelectedSource(s.value);
                            setMobileView('main');
                          }}
                          className={`w-full text-left p-4 text-base ${
                            selectedSource === s.value
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-medium'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {mobileView === 'subject' && subjects && (
                    <div className="pb-4">
                      {Object.entries(subjects)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map(([category, subs]) => (
                          <div key={category}>
                            <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky top-0">
                              {category}
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                              {subs.map((sub) => (
                                <button
                                  key={sub.value}
                                  onClick={() => {
                                    setSelectedSubject(sub.value);
                                    setMobileView('main');
                                  }}
                                  className={`w-full text-left p-4 text-base ${
                                    selectedSubject === sub.value
                                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-medium'
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}
                                >
                                  {sub.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                {mobileView === 'main' && (
                  <div className="p-4 border-t border-gray-100 dark:border-zinc-800 shrink-0">
                    <button
                      onClick={() => setIsMobileOpen(false)}
                      className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl active:scale-[0.98] transition-all"
                    >
                      {isZh ? '显示结果' : 'View Returns'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Controls */}
      <div className="hidden md:flex flex-col gap-6 mb-8">
        {/* Tier 1 Tabs */}
        {showHiddenElements && (
          <div className="flex gap-8 border-b border-gray-200 dark:border-zinc-800">
            {['General', 'Subject'].map((type) => (
              <button
                key={type}
                onClick={() => setRankType(type as 'General' | 'Subject')}
                className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
                  rankType === type
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {type} Ranking
              </button>
            ))}
          </div>
        )}

        {/* Tier 2 & Filters */}
        <div className="flex flex-col gap-4">
          {/* Top Row: Search + Country + Source + (Subject) */}
          <div className="flex items-start gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={isZh ? '搜索大学...' : 'Search university...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none"
              />
            </div>

            <div className="relative w-[180px]">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 appearance-none outline-none cursor-pointer"
              >
                <option value="">{isZh ? '所有国家/地区' : 'All Countries'}</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ArrowDownUp className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none opacity-50" />
            </div>

            <div className="relative w-[220px]">
              <ListOrdered className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500/20 appearance-none outline-none cursor-pointer"
              >
                {rankingSources.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ArrowDownUp className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none opacity-50" />
            </div>
          </div>

          {/* Tier 3 Row: Year + (Subject if active) */}
          <div className="flex items-start justify-between">
            {rankType === 'Subject' && subjects && (
              <div className="relative flex-1 max-w-[360px] mr-4 z-20">
                {/* Backdrop for closing menu */}
                {showSubjectMenu && (
                  <div
                    className="fixed inset-0 z-10 bg-transparent"
                    onClick={() => setShowSubjectMenu(false)}
                  />
                )}

                <div
                  className="relative z-20 cursor-pointer"
                  onClick={() => {
                    setShowSubjectMenu(!showSubjectMenu);
                    setSubjectSearch('');
                  }}
                >
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <div
                    className={`w-full pl-9 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-zinc-800 rounded-xl border border-transparent transition-all flex items-center justify-between ${
                      showSubjectMenu
                        ? 'ring-2 ring-blue-500/20 bg-white dark:bg-zinc-700'
                        : 'hover:bg-gray-100 dark:hover:bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`truncate ${
                        selectedSubject
                          ? 'text-gray-900 dark:text-gray-100 font-medium'
                          : 'text-gray-500'
                      }`}
                    >
                      {selectedSubject
                        ? Object.values(subjects)
                            .flat()
                            .find((s) => s.value === selectedSubject)?.label ||
                          selectedSubject
                        : (isZh ? '选择学科专业' : 'Select Subject')}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                        showSubjectMenu ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Searchable Dropdown */}
                <AnimatePresence>
                  {showSubjectMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-full left-0 mt-2 w-[400px] z-50 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700 overflow-hidden flex flex-col max-h-[400px]"
                    >
                      {/* Search Input */}
                      <div className="p-3 border-b border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-800 sticky top-0 z-10">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                          <input
                            autoFocus
                            type="text"
                            placeholder={isZh ? '寻找专业...' : 'Find a subject...'}
                            value={subjectSearch}
                            onChange={(e) => setSubjectSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-zinc-900 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                          />
                        </div>
                      </div>

                      {/* Subject List */}
                      <div className="overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-700">
                        {Object.entries(subjects).map(([category, subs]) => {
                          const filteredSubs = subs.filter((s) =>
                            s.label
                              .toLowerCase()
                              .includes(subjectSearch.toLowerCase()),
                          );

                          if (filteredSubs.length === 0) return null;

                          return (
                            <div key={category} className="mb-2 last:mb-0">
                              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider sticky top-0 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm z-10">
                                {category}
                              </div>
                              <div className="space-y-0.5">
                                {filteredSubs.map((subject) => (
                                  <button
                                    key={subject.value}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedSubject(subject.value);
                                      setShowSubjectMenu(false);
                                      setSubjectSearch('');
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-all flex items-center justify-between group ${
                                      selectedSubject === subject.value
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-gray-100'
                                    }`}
                                  >
                                    <span className="truncate">
                                      {subject.label}
                                    </span>
                                    {selectedSubject === subject.value && (
                                      <Check className="w-3.5 h-3.5 shrink-0" />
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                        {Object.values(subjects)
                          .flat()
                          .filter((s) =>
                            s.label
                              .toLowerCase()
                              .includes(subjectSearch.toLowerCase()),
                          ).length === 0 && (
                          <div className="p-8 text-center text-gray-500 text-sm">
                            {isZh ? `未找到匹配 "${subjectSearch}" 的专业` : `No subjects found matching "${subjectSearch}"`}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar ml-auto">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {isZh ? '年份:' : 'Year:'}
              </span>
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => onYearChange(year)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    currentYear === year
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-100 dark:border-zinc-700'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RankingFilters;
