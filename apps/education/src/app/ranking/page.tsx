import React from 'react';
import { Metadata } from 'next';
import RankingList from '@/components/ranking/RankingList';
import RankingHero from '@/components/ranking/RankingHero';
import { rankingsData, UniversityRanking } from '@repo/web-shared';

export const metadata: Metadata = {
  title: 'Global University Rankings | Elite World Education',
  description:
    'Explore top universities worldwide ranked by QS and THE metrics. Filter by country and subject.',
};

export default function RankingPage() {
  const universities: UniversityRanking[] =
    rankingsData.universities as UniversityRanking[];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      <RankingHero />

      {/* Main Content */}
      <RankingList initialUniversities={universities} />
    </div>
  );
}
