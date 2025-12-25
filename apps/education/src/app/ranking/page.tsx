import React from 'react';
import { Metadata } from 'next';
import RankingList from '@/components/ranking/RankingList';
import RankingHero from '@/components/ranking/RankingHero';
import RankingMap from '@/components/ranking/RankingMap';
import { UniversityRanking } from '@repo/web-shared';
import { getRankingList } from '@repo/web-shared/services/ranking-service';

export const metadata: Metadata = {
  title: 'Global University Rankings | Elite World Education',
  description:
    'Explore top universities worldwide ranked by QS and THE metrics. Filter by country and subject.',
};

export const dynamic = 'force-dynamic'; // Ensure fresh data if DB changes

export default async function RankingPage() {
  const universities: UniversityRanking[] = await getRankingList();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      <RankingHero />

      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <RankingMap universities={universities} />
      </div>

      {/* Main Content */}
      <RankingList initialUniversities={universities} />
    </div>
  );
}
