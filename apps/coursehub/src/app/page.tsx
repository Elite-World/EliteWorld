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
      {/* Premium CourseHub Hero Section */}
      <div className="relative pt-16 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Ambient Gradients */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-600/20 dark:bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="max-w-2xl text-center lg:text-left mt-4 lg:mt-0">
              {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 mb-6 lg:mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  The Global Standard of Learning
                </span>
              </div> */}
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-[1.1] lg:leading-[0.9] mb-6">
                Master Your <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  Craft.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 lg:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Join thousands of elite learners mastering cutting-edge skills from world-class instructors. Your global journey starts here.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-4">
                <button 
                  onClick={() => document.getElementById('search-catalog')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto group flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 sm:py-4 bg-transparent sm:bg-white sm:dark:bg-[#1A1A1A] border-none sm:border sm:border-gray-200 sm:dark:border-white/10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white sm:rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-300">
                  Become a Partner
                </button>
              </div>
            </div>

            {/* Asymmetric Image Collage (Responsive) */}
            <div className="relative h-62.5 sm:h-112.5 lg:h-150 w-full max-w-lg lg:max-w-none mx-auto mt-6 lg:mt-0">
              <div className="absolute top-0 right-0 w-full h-full lg:top-10 lg:w-[65%] lg:h-[75%] rounded-4xl lg:rounded-[3rem] overflow-hidden shadow-2xl z-10 border border-gray-100 dark:border-white/10 hover:scale-[1.02] transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000" alt="Students collaborating" fill className="object-cover" />
              </div>
              <div className="hidden lg:block absolute bottom-0 left-0 lg:w-[55%] lg:h-[55%] rounded-[3rem] overflow-hidden shadow-2xl z-20 border border-gray-100 dark:border-white/10 hover:scale-[1.02] transition-transform duration-500">
                <Image src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000" alt="Student working on laptop" fill className="object-cover" />
              </div>
              <div className="hidden lg:block absolute top-0 left-[10%] lg:w-[40%] h-[40%] rounded-[3rem] overflow-hidden shadow-2xl z-0 border border-gray-100 dark:border-white/10 opacity-70 blur-[1px] hover:blur-none hover:opacity-100 transition-all duration-500">
                <Image src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000" alt="Group discussion" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="bg-gray-50 dark:bg-[#0a0a0a] pb-12 pt-4 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-end gap-4 mb-6">
            <div className="text-left">
              <div className="flex items-center justify-start gap-2 mb-3">
                <Trophy className="w-4 h-4 text-purple-600" />
                <div className="px-2 py-0.5 rounded-md bg-purple-600/10 border border-purple-600/20">
                  <span className="text-[8px] font-black uppercase tracking-widest text-purple-600">
                    Signature Tracks
                  </span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
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
              className="group flex items-center gap-1 sm:gap-3 shrink-0 sm:px-8 sm:py-4 sm:bg-white sm:dark:bg-[#1A1A1A] sm:border border-gray-100 dark:border-white/5 sm:rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 sm:text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all duration-500 sm:shadow-xl sm:hover:shadow-2xl"
            >
              <span className="hidden sm:inline">View Global Registry</span>
              <span className="sm:hidden">View All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <CourseCarousel courses={courses.slice(0, 6)} gapYClass="gap-y-6" />
        </div>
      </div>

      {/* Top Institutions Section */}
      <div className="bg-gray-50 dark:bg-white/2 border-t border-gray-100 dark:border-white/5 py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row justify-between items-end gap-4 mb-6">
            <div className="text-left">
              <div className="flex items-center justify-start gap-2 mb-3">
                <Building2 className="w-4 h-4 text-blue-600" />
                <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
                  <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                    B2B Marketplace
                  </span>
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
                Elite{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  Institutions
                </span>
              </h2>
            </div>
            <button className="group flex items-center gap-1 sm:gap-3 shrink-0 sm:px-8 sm:py-4 sm:bg-white sm:dark:bg-[#1A1A1A] sm:border border-gray-100 dark:border-white/5 sm:rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500 sm:text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all duration-500 sm:shadow-xl sm:hover:shadow-2xl">
              <span className="hidden sm:inline">Partner With Us</span>
              <span className="sm:hidden">Join Us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10">
            {MOCK_INSTITUTIONS.map((institution) => (
              <div
                key={institution.id}
                className="bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-4xl sm:rounded-[3rem] p-6 sm:p-8 flex flex-row items-center gap-5 sm:gap-8 group hover:shadow-2xl hover:border-blue-500/30 transition duration-500 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 group-hover:bg-blue-600/10 blur-3xl transition" />
                <div className="relative w-16 h-16 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-gray-50 dark:border-[#2A2A2A] shadow-xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={institution.logoUrl}
                    alt={institution.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left relative z-10 flex-1">
                  <h3 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white tracking-tighter mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">
                    {institution.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 line-clamp-2">
                    {institution.description}
                  </p>
                  <div className="mt-3 sm:mt-6 flex flex-wrap items-center justify-start gap-2 sm:gap-4">
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {courses.filter((c) => c.institutionId === institution.id).length} Courses
                    </span>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-blue-600 cursor-pointer shrink-0">
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
                  <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white leading-tight group-hover/title:underline">
                    Explore top {category} programs
                  </h2>
                  <ChevronRight className="w-5 h-5 mt-1 text-[#222222] dark:text-white transition-transform group-hover/title:translate-x-1" />
                </div>
                <div className="hidden sm:flex gap-2 shrink-0">
                  <button className="p-2 rounded-full border border-gray-200 dark:border-white/10 hover:shadow-md transition duration-500 text-gray-900 dark:text-white bg-white dark:bg-black opacity-50 cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-full border border-gray-200 dark:border-white/10 hover:shadow-md transition duration-500 text-gray-900 dark:text-white bg-white dark:bg-black">
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
