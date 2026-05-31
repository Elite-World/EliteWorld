'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import CourseCard from '@/components/CourseCard';
import { CourseCategory } from '@/types';
import {
  Filter,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  Globe,
} from 'lucide-react';

function SearchContent() {
  const { courses } = useAppContext();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'All',
    price: 500,
    level: 'All',
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const categoryMatch =
        filters.category === 'All' || course.category === filters.category;
      const priceMatch = course.price <= Number(filters.price);
      const levelMatch =
        filters.level === 'All' || course.level === filters.level;
      return categoryMatch && priceMatch && levelMatch;
    });
  }, [courses, filters]);

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="sticky top-24 p-8 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl shadow-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-blue-600/10">
                  <Filter className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
              </div>

              <div className="space-y-8">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
                  >
                    Experience Type
                  </label>
                  <div className="relative group">
                    <select
                      id="category"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      className="appearance-none block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                    >
                      <option>All</option>
                      {Object.values(CourseCategory).map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label
                      htmlFor="price"
                      className="block text-xs font-bold text-gray-400 uppercase tracking-widest"
                    >
                      Max Investment
                    </label>
                    <span className="text-blue-600 font-bold text-sm">
                      ${filters.price}
                    </span>
                  </div>
                  <input
                    type="range"
                    id="price"
                    name="price"
                    min="0"
                    max="500"
                    value={filters.price}
                    onChange={handleFilterChange}
                    className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3"
                  >
                    Difficulty
                  </label>
                  <div className="relative group">
                    <select
                      id="level"
                      name="level"
                      value={filters.level}
                      onChange={handleFilterChange}
                      className="appearance-none block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                    >
                      <option>All</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
                    <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                      Global Registry
                    </span>
                  </div>
                </div>
                <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
                  Course{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                    Discovery
                  </span>
                </h1>
                <p className="text-gray-500 font-medium mt-1 uppercase tracking-[0.2em] text-[10px]">
                  {filteredCourses.length} Curated Experiences Available
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 group cursor-pointer px-5 py-3 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg">
                  <SlidersHorizontal className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    Sort by Prestige
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
