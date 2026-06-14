'use client';

import React, { Suspense } from 'react';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import CourseCarousel from '@/components/CourseCarousel';
import { CourseCategory } from '@/types';
import { MOCK_INSTITUTIONS } from '@/data/mockData';
import {
  Sparkles,
  ArrowRight,
  Building2,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

function SearchContent() {
  const { courses } = useAppContext();
  const router = useRouter();

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="pt-4"></div>

      {/* Featured Courses Section */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] pb-12 pt-4 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Trophy className="w-5 h-5 text-purple-600" />
                <div className="px-2 py-0.5 rounded-md bg-purple-600/10 border border-purple-600/20">
                  <span className="text-[8px] font-black uppercase tracking-widest text-purple-600">
                    Signature Tracks
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
                Featured{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                  Experiences
                </span>
              </h2>
            </div>
            <button
              onClick={() =>
                document
                  .getElementById('search-catalog')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition shadow-xl hover:shadow-2xl"
            >
              View Global Registry
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <CourseCarousel courses={courses.slice(0, 6)} gapYClass="gap-y-6" />
        </div>
      </div>

      {/* Top Institutions Section */}
      <div className="bg-gray-50 dark:bg-white/2 border-t border-gray-100 dark:border-white/5 py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-8">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
                  <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                    B2B Marketplace
                  </span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
                Elite{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  Institutions
                </span>
              </h2>
            </div>
            <button className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition shadow-xl hover:shadow-2xl">
              Partner With Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {MOCK_INSTITUTIONS.map((institution) => (
              <div
                key={institution.id}
                className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-[3rem] p-8 flex flex-col sm:flex-row items-center gap-8 group hover:shadow-2xl hover:border-blue-500/30 transition duration-500 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 group-hover:bg-blue-600/10 blur-3xl transition" />
                <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-gray-50 dark:border-[#2A2A2A] shadow-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={institution.logoUrl}
                    alt={institution.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center sm:text-left relative z-10">
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter mb-2 group-hover:text-blue-600 transition-colors">
                    {institution.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 line-clamp-2">
                    {institution.description}
                  </p>
                  <div className="mt-6 flex items-center justify-center sm:justify-start gap-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {
                        courses.filter(
                          (c) => c.institutionId === institution.id,
                        ).length
                      }{' '}
                      Courses
                    </span>
                    <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 cursor-pointer">
                      View Profile
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        id="search-catalog"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative"
      >
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
            Explore Top Pick{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Experiences
            </span>
          </h2>
        </div>

        {Object.values(CourseCategory).map((category) => {
          const categoryCourses = courses.filter(
            (c) => c.category === category,
          );
          if (categoryCourses.length === 0) return null;

          return (
            <div key={category} className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <div
                  className="flex items-center gap-1 group/title cursor-pointer"
                  onClick={() => {
                    router.push(`/s?category=${encodeURIComponent(category)}`);
                  }}
                >
                  <h2 className="text-[22px] font-semibold text-[#222222] dark:text-white leading-tight group-hover/title:underline">
                    Explore top {category} programs
                  </h2>
                  <ChevronRight className="w-5 h-5 mt-1 text-[#222222] dark:text-white transition-transform group-hover/title:translate-x-1" />
                </div>
                <div className="hidden sm:flex gap-2 shrink-0">
                  <button className="p-2 rounded-full border border-gray-200 dark:border-white/10 hover:shadow-md transition text-[#222222] dark:text-white bg-white dark:bg-black opacity-50 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full border border-gray-200 dark:border-white/10 hover:shadow-md transition text-[#222222] dark:text-white bg-white dark:bg-black">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <CourseCarousel courses={categoryCourses.slice(0, 6)} gapYClass="gap-y-10" />
            </div>
          );
        })}
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
