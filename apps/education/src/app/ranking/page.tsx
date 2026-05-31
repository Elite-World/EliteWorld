import React from 'react';
import { Metadata } from 'next';
import RankingList from '@/components/ranking/RankingList';
import { HeroSection } from '@repo/ui';
import RankingMap from '@/components/ranking/RankingMap';
// import { UniversityRanking } from '@repo/domain';
import {
  getRankingList,
  getGlobalRankingMeta,
} from '@repo/domain/services/ranking-service';

export const metadata: Metadata = {
  title: 'Global University Rankings | Elite World Education',
  description:
    'Explore top universities worldwide ranked by QS and THE metrics. Filter by country and subject.',
};

export const dynamic = 'force-dynamic'; // Ensure fresh data if DB changes

export default async function RankingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const yearParam = params.year as string | undefined;
  const sourceParam = (params.source as string) || 'qs';
  const rankTypeParam = (params.rankType as 'General' | 'Subject') || 'General';
  const subjectParam = params.subject as string | undefined;
  const countryParam = params.country as string | undefined;

  const selectedYear = yearParam ? parseInt(yearParam, 10) : undefined;

  const [universities, meta] = await Promise.all([
    getRankingList(selectedYear, sourceParam, rankTypeParam, subjectParam),
    getGlobalRankingMeta(),
  ]);

  // Flatten generic years to find a default if needed
  const allGeneralYears = Array.from(
    new Set(Object.values(meta.years.general).flat()),
  ).sort((a, b) => b - a);

  const displayYear = selectedYear || allGeneralYears[0] || 2025;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      <HeroSection
        mode="page"
        title="Global University Rankings"
        // subtitle="Explore top universities worldwide ranked by QS and THE metrics. Filter by country and subject."
        className=""
      />

      <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-36 relative z-20">
        <RankingMap universities={universities} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10">
        <RankingList
          initialUniversities={universities}
          currentYear={displayYear}
          initialSource={sourceParam}
          initialRankType={rankTypeParam}
          initialSubject={subjectParam}
          initialCountry={countryParam}
          meta={meta}
        />
      </div>
    </div>
  );
}
