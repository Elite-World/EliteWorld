'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import CourseCard from '@/components/CourseCard';
import { CourseCategory } from '@/types';
import {
  Sparkles,
  Languages,
  Code2,
  BrainCircuit,
  Palette,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Globe,
  Trophy,
  Users,
  Zap,
  Target,
} from 'lucide-react';

const categoryIcons: Record<CourseCategory, React.ElementType> = {
  [CourseCategory.SUMMER_CAMP]: Sparkles,
  [CourseCategory.LANGUAGE]: Languages,
  [CourseCategory.CODING]: Code2,
  [CourseCategory.AI]: BrainCircuit,
  [CourseCategory.DRAWING]: Palette,
  [CourseCategory.BUSINESS]: BarChart3,
};

const CategoryIcon: React.FC<{ category: CourseCategory }> = ({ category }) => {
  const Icon = categoryIcons[category];
  return (
    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
  );
};

export default function HomePage() {
  const { courses } = useAppContext();

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-screen min-h-[800px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Video/Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.png"
            alt="Elite Library"
            fill
            className="object-cover scale-105 animate-slow-zoom"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 text-white px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              The Pinnacle of Global Learning
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] animate-slide-up">
            CURATE YOUR <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-blue-400 bg-size-[200%_auto] animate-gradient">
              PRESTIGE
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-12 text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed animate-fade-in delay-200">
            Exclusive learning experiences for the architects of tomorrow.
            Access world-class expertise in a borderless digital ecosystem.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-500">
            <Link href="/search">
              <button className="group relative bg-white text-black font-black py-5 px-12 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 flex items-center gap-3 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 uppercase tracking-widest text-xs">
                  Begin Journey
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-500" />
              </button>
            </Link>
            <button className="backdrop-blur-xl bg-white/5 border border-white/10 text-white font-black py-5 px-12 rounded-2xl hover:bg-white/10 transition-all duration-500 uppercase tracking-widest text-xs">
              Apply to Instruct
            </button>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto border-t border-white/10 pt-12 animate-fade-in delay-700">
            <div>
              <p className="text-3xl font-black tracking-tighter">500+</p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">
                Elite Mentors
              </p>
            </div>
            <div>
              <p className="text-3xl font-black tracking-tighter">50K+</p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">
                Global Alumni
              </p>
            </div>
            <div>
              <p className="text-3xl font-black tracking-tighter">98%</p>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-2">
                Success Velocity
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer">
          <div className="w-1 h-12 bg-linear-to-b from-blue-500 to-transparent rounded-full" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[120px] rounded-full -mr-20 -mt-20" />

        <div className="flex flex-col items-center mb-24 text-center">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
              <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                Specializations
              </span>
            </div>
          </div>
          <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-6 leading-tight">
            Elite{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Domains
            </span>
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            Precisely tuned curricula across high-impact verticals designed for
            accelerated professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(CourseCategory).map((category, index) => (
            <Link
              href={`/search?category=${encodeURIComponent(category)}`}
              key={category}
              className="group relative p-10 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-[3rem] hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 group-hover:bg-blue-600/10 blur-3xl transition-all" />

              <div className="flex items-start justify-between mb-8">
                <div className="p-5 rounded-3xl bg-blue-600/5 text-blue-600 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                  <CategoryIcon category={category} />
                </div>
                <div className="text-[10px] font-black text-gray-300 dark:text-gray-700 tracking-[0.3em]">
                  0{index + 1}
                </div>
              </div>

              <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-4 group-hover:text-blue-600 transition-colors">
                {category}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8">
                Master the advanced protocols of {category.toLowerCase()} with
                our intensive, expert-led training modules.
              </p>

              <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                Explore Curriculum <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="bg-gray-50 dark:bg-white/2 border-y border-gray-100 dark:border-white/5 py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-20">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Trophy className="w-5 h-5 text-purple-600" />
                <div className="px-2 py-0.5 rounded-md bg-purple-600/10 border border-purple-600/20">
                  <span className="text-[8px] font-black uppercase tracking-widest text-purple-600">
                    Signature Tracks
                  </span>
                </div>
              </div>
              <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
                Featured{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-blue-600">
                  Experiences
                </span>
              </h2>
            </div>
            <Link
              href="/search"
              className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all shadow-xl hover:shadow-2xl"
            >
              View Global Registry
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>

      {/* Elite Standards Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                  The Elite Protocol
                </span>
              </div>
            </div>
            <h2 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase mb-8 leading-[1.1]">
              Engineered for <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                Maximum Impact
              </span>
            </h2>
            <p className="text-lg text-gray-500 font-medium mb-12 max-w-xl leading-relaxed">
              We don&apos;t just teach. We architect your ascent. Every course
              on our platform undergoes a rigorous 24-point validation process
              to ensure institutional grade quality and practical relevance.
            </p>

            <div className="space-y-8">
              {[
                {
                  icon: Globe,
                  title: 'Global Network',
                  text: 'Direct access to alumni across 80+ countries and world-class faculty.',
                },
                {
                  icon: Zap,
                  title: 'Accelerated Learning',
                  text: 'Proprietary methodology designed to shrink mastery time by 40%.',
                },
                {
                  icon: Users,
                  title: 'Private Community',
                  text: 'Lifetime access to an exclusive network of high-achievers and visionaries.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 shadow-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-linear-to-r from-blue-600 to-purple-600 rounded-[4rem] blur-[100px] opacity-10 animate-pulse" />
            <div className="relative aspect-square rounded-[4rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-2xl">
              <Image
                src="/images/hero-bg.png"
                alt="Elite Standards"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12 right-12 p-8 backdrop-blur-3xl bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-black text-white uppercase tracking-widest text-xs">
                      Standard of Excellence
                    </h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">
                      Certified Tier 1 Provider
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="relative p-20 rounded-[4rem] bg-[#0a0a0a] overflow-hidden group text-center border border-white/5">
          <div className="absolute inset-0 bg-linear-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
          <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />

          <div className="relative z-10">
            <h2 className="text-6xl font-black text-white tracking-tighter uppercase mb-8 leading-tight">
              Ready to{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                Transcend?
              </span>
            </h2>
            <p className="text-gray-400 font-medium max-w-xl mx-auto mb-12 text-lg">
              Join the upper echelon of global learners today. Your elite future
              starts with a single decision.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/search">
                <button className="bg-white text-black font-black py-5 px-12 rounded-2xl hover:scale-105 transition-all duration-500 uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                  Activate Membership <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
