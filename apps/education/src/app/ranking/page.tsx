import React from 'react';
import { Metadata } from 'next';
import RankingList from '@/components/ranking/RankingList';
import { fetchRankings } from '../../services/fetchRankings';

export const metadata: Metadata = {
  title: 'Global University Rankings | Elite World Education',
  description:
    'Explore top universities worldwide ranked by QS and THE metrics. Filter by country and subject.',
};

export default async function RankingPage() {
  const universities = await fetchRankings();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      {/* Header / Hero Section */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Global Rankings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            Discover the world&apos;s best universities. comprehensive rankings
            based on academic reputation, employer reputation, and research
            impact.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <RankingList initialUniversities={universities} />
    </div>
  );
}
