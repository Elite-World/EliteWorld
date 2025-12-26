'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Globe,
  Trophy,
  Info,
  BookOpen,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { UniversityRanking } from '@repo/web-shared';
import Link from 'next/link';
import { cn } from '@repo/web-shared';

interface RankingDetailModalProps {
  university: UniversityRanking | null;
  isOpen: boolean;
  onClose: () => void;
}

const RankingDetailModal: React.FC<RankingDetailModalProps> = ({
  university,
  isOpen,
  onClose,
}) => {
  if (!university) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
              className="bg-white dark:bg-[#1c1c1e] w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
            >
              {/* Header Image / Pattern Area */}
              <div className="relative h-48 sm:h-64 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center text-white">
                      <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                        Rank
                      </span>
                      <span className="text-3xl sm:text-4xl font-bold">
                        {university.rank}
                      </span>
                    </div>

                    <div className="flex-1 text-white">
                      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                        {university.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm sm:text-base opacity-90">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{university.country}</span>
                        </div>
                        {university.websiteUrl && (
                          <a
                            href={university.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 hover:underline"
                          >
                            <Globe className="w-4 h-4" />
                            <span>Website</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column: Stats & Quick Info */}
                  <div className="md:col-span-1 space-y-6">
                    {/* Overall Score - Hidden for now */}
                    {/* <div className="p-5 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-700/50">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Trophy className="w-4 h-4" /> Performance
                        </h3>
                        ...
                      </div> */}

                    {/* View Profile CTA */}
                    <Link
                      href={`/universities/${(university.country || 'global')
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '')}/${(
                        university.nameEn || university.name
                      )
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '')}`}
                      className="w-full flex items-center justify-between p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all group"
                    >
                      <span className="font-semibold">View Full Profile</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Subject Highlights */}
                    {university.subjects && university.subjects.length > 0 && (
                      <div className="p-5 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-700/50">
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" /> Top Subjects
                        </h3>
                        <div className="space-y-3">
                          {university.subjects.slice(0, 5).map((sub, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center text-sm"
                            >
                              <span className="text-gray-700 dark:text-gray-300 font-medium truncate flex-1 pr-2">
                                {sub.name}
                              </span>
                              <span className="flex-shrink-0 px-2 py-0.5 bg-white dark:bg-zinc-700 rounded text-gray-900 dark:text-white font-bold border border-gray-100 dark:border-zinc-600">
                                #{sub.rank}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Detailed Text */}
                  <div className="md:col-span-2 space-y-8">
                    {/* Description / Introduction */}
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-blue-500" /> About
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {university.description ||
                          'No description available for this university.'}
                      </p>
                    </section>

                    {/* History - Placeholder or Real Data */}
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-500" /> History
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {university.history ||
                          'Founded with a mission to advance knowledge and educate students in science, technology, and other areas of scholarship that will best serve the nation and the world in the 21st century. The institute is an independent, coeducational, privately endowed university.'}
                      </p>
                    </section>

                    {/* Visit Guide */}
                    <section>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-500" /> Visit
                        Guide
                      </h3>
                      <div className="p-4 bg-gray-50 dark:bg-zinc-800/30 rounded-xl border border-dashed border-gray-200 dark:border-zinc-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {university.visitGuide ||
                            'The campus is open to visitors year-round. Guided tours are available for prospective students and their families. Please check the official website for visitor center hours and tour schedules.'}
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RankingDetailModal;
