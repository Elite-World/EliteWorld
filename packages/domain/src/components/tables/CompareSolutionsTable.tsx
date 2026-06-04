'use client';

import { useState, useMemo } from 'react';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMagnifyingGlass, HiXMark } from 'react-icons/hi2';
import { SolutionCard, PopulatedSolution } from '../shared/SolutionCard';
import { CountryFlag } from '../shared/CountryFlag';

interface CompareSolutionsTableProps {
  solutions: PopulatedSolution[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Solutions' },
  { id: 'residency', label: 'Residency' },
  { id: 'citizenship', label: 'Citizenship' },
  { id: 'long_term_visa', label: 'Long-Term Visas' },
  { id: 'corporate', label: 'Corporate' },
];

export function CompareSolutionsTable({ solutions }: CompareSolutionsTableProps) {
  const isDark = useThemeStore((state) => state.isDark);
  
  // State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  // Derived Data
  const filteredSolutions = useMemo(() => {
    return solutions.filter((sol) => {
      if (activeCategory !== 'all' && sol.category !== activeCategory) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const countryName = sol.country_id?.name?.en?.toLowerCase() || '';
        const solName = sol.name?.en?.toLowerCase() || '';
        if (!countryName.includes(query) && !solName.includes(query)) return false;
      }
      return true;
    });
  }, [solutions, activeCategory, searchQuery]);

  const selectedSolutions = useMemo(() => {
    return solutions.filter(s => selectedIds.includes(s._id.toString()));
  }, [solutions, selectedIds]);

  // Handlers
  const toggleSelection = (solution: PopulatedSolution) => {
    const id = solution._id.toString();
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(sid => sid !== id));
    } else {
      if (selectedIds.length >= 3) {
        // Enforce max 3 limit
        const newIds = [...selectedIds.slice(1), id];
        setSelectedIds(newIds);
      } else {
        setSelectedIds(prev => [...prev, id]);
      }
    }
  };

  const removeSelection = (id: string) => {
    setSelectedIds(prev => prev.filter(sid => sid !== id));
    if (selectedIds.length === 1 && isComparing) {
      setIsComparing(false); // Auto close if nothing left
    }
  };

  // Detailed Comparison View
  if (isComparing) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 pb-32">
        <div className="flex justify-between items-center mb-8">
          <h2 className={cn("text-3xl font-black uppercase tracking-tighter", isDark ? "text-white" : "text-gray-900")}>
            Side-by-Side Comparison
          </h2>
          <button 
            onClick={() => setIsComparing(false)}
            className={cn(
              "px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all",
              isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            )}
          >
            Back to Selection
          </button>
        </div>

        {/* The Comparison Table Grid */}
        <div className={cn(
          "rounded-3xl border shadow-2xl overflow-x-auto",
          isDark ? "bg-[#0a0a0a] border-white/10" : "bg-white border-gray-100"
        )}>
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr>
                <th className="p-6 border-b border-r w-48 sticky left-0 z-20 backdrop-blur-md bg-inherit font-bold uppercase tracking-widest text-xs text-gray-500">
                  Features
                </th>
                {selectedSolutions.map(sol => (
                  <th key={sol._id} className="p-6 border-b min-w-[280px] w-1/3 relative">
                    <button 
                      onClick={() => removeSelection(sol._id)}
                      className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <HiXMark className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-8 h-6 relative shrink-0 rounded overflow-hidden shadow-sm">
                        <CountryFlag 
                          countrySlug={sol.country_id?.slug}
                          countryCode={sol.country_id?.code}
                          countryName={sol.country_id?.name?.en}
                          fallbackUrl={sol.country_id?.flag}
                        />
                      </div>
                      <span className={cn("font-bold text-lg", isDark ? "text-white" : "text-black")}>
                        {sol.country_id?.name?.en}
                      </span>
                    </div>
                    <h3 className={cn("font-black text-xl leading-tight", isDark ? "text-gray-300" : "text-gray-800")}>
                      {sol.name?.en}
                    </h3>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={cn("text-sm", isDark ? "divide-y divide-white/10" : "divide-y divide-gray-100")}>
              
              {/* Category */}
              <tr>
                <td className="p-6 border-r font-bold uppercase tracking-widest text-xs text-gray-500 sticky left-0 z-10 bg-inherit backdrop-blur-md">
                  Category
                </td>
                {selectedSolutions.map(sol => (
                  <td key={sol._id} className="p-6 font-semibold uppercase text-xs tracking-wider text-blue-500">
                    {sol.category.replace('_', ' ')}
                  </td>
                ))}
              </tr>

              {/* Investment */}
              <tr>
                <td className="p-6 border-r font-bold uppercase tracking-widest text-xs text-gray-500 sticky left-0 z-10 bg-inherit backdrop-blur-md">
                  Min. Investment
                </td>
                {selectedSolutions.map(sol => (
                  <td key={sol._id} className={cn("p-6 font-bold text-lg", isDark ? "text-white" : "text-gray-900")}>
                    {sol.requirements?.investment_amount || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Timeframe */}
              <tr>
                <td className="p-6 border-r font-bold uppercase tracking-widest text-xs text-gray-500 sticky left-0 z-10 bg-inherit backdrop-blur-md">
                  Timeframe
                </td>
                {selectedSolutions.map(sol => (
                  <td key={sol._id} className={cn("p-6 font-medium", isDark ? "text-gray-300" : "text-gray-800")}>
                    {sol.requirements?.timeframe || 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Physical Presence */}
              <tr>
                <td className="p-6 border-r font-bold uppercase tracking-widest text-xs text-gray-500 sticky left-0 z-10 bg-inherit backdrop-blur-md">
                  Physical Presence
                </td>
                {selectedSolutions.map(sol => (
                  <td key={sol._id} className={cn("p-6 font-medium", isDark ? "text-gray-300" : "text-gray-800")}>
                    {sol.requirements?.physical_presence || 'None required'}
                  </td>
                ))}
              </tr>

              {/* Description */}
              <tr>
                <td className="p-6 border-r font-bold uppercase tracking-widest text-xs text-gray-500 sticky left-0 z-10 bg-inherit backdrop-blur-md align-top">
                  Overview
                </td>
                {selectedSolutions.map(sol => (
                  <td key={sol._id} className={cn("p-6 font-medium leading-relaxed align-top", isDark ? "text-gray-400" : "text-gray-600")}>
                    {sol.description || 'No description available.'}
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Selection View
  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 pb-48 relative">
      
      {/* Controls Container (Search + Category Filter) */}
      <div className={cn(
        "sticky top-20 z-40 backdrop-blur-xl mb-12 p-4 md:p-6 rounded-[2rem] border shadow-2xl transition-all",
        isDark ? "bg-[#0a0a0a]/80 border-white/10" : "bg-white/80 border-gray-100"
      )}>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex overflow-x-auto w-full md:w-auto hide-scrollbar gap-2 pb-2 md:pb-0">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300",
                    isActive 
                      ? (isDark ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]" : "bg-black text-white shadow-[0_0_20px_rgba(0,0,0,0.15)]")
                      : (isDark ? "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10" : "bg-gray-50 text-gray-500 hover:text-black hover:bg-gray-100")
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <HiOutlineMagnifyingGlass className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search country or solution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-12 pr-4 py-3 rounded-full text-sm font-medium outline-none transition-all border",
                isDark 
                  ? "bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-white/30" 
                  : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-gray-300"
              )}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSolutions.map((sol, idx) => (
            <motion.div
              key={sol._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: (idx % 10) * 0.05 }}
            >
              <SolutionCard 
                solution={sol} 
                mode="compare"
                isSelected={selectedIds.includes(sol._id.toString())}
                onSelectToggle={toggleSelection}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredSolutions.length === 0 && (
          <div className="col-span-full py-32 text-center">
            <h3 className={cn("text-2xl font-black mb-2", isDark ? "text-white" : "text-gray-900")}>No solutions found</h3>
            <p className={cn(isDark ? "text-gray-400" : "text-gray-500")}>Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>

      {/* Floating Bottom Action Bar */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className={cn(
              "fixed bottom-8 left-1/2 -translate-x-1/2 z-50 p-4 md:p-6 rounded-3xl border shadow-2xl backdrop-blur-xl flex items-center justify-between gap-8 w-[90vw] max-w-2xl",
              isDark ? "bg-[#111]/90 border-white/10" : "bg-white/90 border-gray-200"
            )}
          >
            <div>
              <p className={cn("text-xs font-bold uppercase tracking-widest mb-1", isDark ? "text-gray-400" : "text-gray-500")}>
                {selectedIds.length} / 3 Selected
              </p>
              <div className="flex -space-x-2">
                {selectedSolutions.map(s => (
                  <div key={s._id} className="w-8 h-8 rounded-full border-2 border-white dark:border-[#111] overflow-hidden bg-gray-200 relative shrink-0" title={s.name.en}>
                    <CountryFlag 
                      countrySlug={s.country_id?.slug}
                      countryCode={s.country_id?.code}
                      countryName={s.country_id?.name?.en}
                      fallbackUrl={s.country_id?.flag}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setIsComparing(true)}
              disabled={selectedIds.length < 2}
              className={cn(
                "px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm transition-all",
                selectedIds.length >= 2 
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:scale-105"
                  : "bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed"
              )}
            >
              {selectedIds.length >= 2 ? "Compare Now" : "Select 1 More"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
