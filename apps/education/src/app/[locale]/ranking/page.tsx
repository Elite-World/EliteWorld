import React from 'react';
import { Metadata } from 'next';
import RankingList from '@/components/ranking/RankingList';
import { HeroSection } from '@repo/ui';
import RankingMap from '@/components/ranking/RankingMap';
// import { UniversityRanking } from '@repo/domain';
import { fetchRankings, fetchMeta } from './actions';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '全球大学排名 | 寰宇精英教育' : 'Global University Rankings | Elite World Education',
    description: isZh
      ? '探索由 QS 和泰晤士高等教育 (THE) 指标排名的全球顶尖大学。支持按国家和专业进行筛选。'
      : 'Explore top universities worldwide ranked by QS and THE metrics. Filter by country and subject.',
  };
}

export const dynamic = 'force-dynamic'; // Ensure fresh data if DB changes

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function RankingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ locale }, urlParams] = await Promise.all([params, searchParams]);
  const isZh = locale === 'zh';

  const yearParam = urlParams.year as string | undefined;
  const sourceParam = (urlParams.source as string) || 'qs';
  const rankTypeParam = (urlParams.rankType as 'General' | 'Subject') || 'General';
  const subjectParam = urlParams.subject as string | undefined;
  const countryParam = urlParams.country as string | undefined;

  const selectedYear = yearParam ? parseInt(yearParam, 10) : undefined;

  const [universities, meta] = await Promise.all([
    fetchRankings(selectedYear, sourceParam, rankTypeParam, subjectParam as string | undefined),
    fetchMeta(),
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
        title={isZh ? '全球大学排名' : 'Global University Rankings'}
        // subtitle={isZh ? '探索由 QS 和泰晤士高等教育 (THE) 指标排名的全球顶尖大学。' : 'Explore top universities worldwide ranked by QS and THE metrics.'}
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
