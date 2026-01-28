import React from 'react';
import { notFound } from 'next/navigation';
import { getUniversity } from '@repo/domain/services/ranking-service';
import {
  // Info,
  MapPin,
  Globe,
  Trophy,
  Users,
  // BookOpen,
  Clock,
  Calendar,
  ExternalLink,
  GraduationCap,
  Building2,
  Award,
  // CheckCircle,
  ArrowRight,
} from 'lucide-react';
// import { RankingChart } from '@/components/ranking/RankingChart';
import { RankingSourceCard } from '@/components/ranking/RankingSourceCard';
import { Metadata } from 'next';
import Image from 'next/image';

// But `apps/education` might consume it via `@repo/ui`.
// I need to check how `apps/education` imports UI components.
// Usually `import { ... } from '@repo/ui'`.
// I added `export * from './components/Tabs';` to `packages/ui/src/index.tsx`.
// So I should import from `@repo/ui`.

import { Tabs as UiTabs } from '@repo/ui';

import { UniversityLocationTab } from '@/components/university/UniversityLocationTab';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ country: string; uni_name: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const university = await getUniversity(resolvedParams.uni_name);
  if (!university) return { title: 'University Not Found' };

  return {
    title: `${university.name} - Ranking & Profile | Elite World`,
    description: `Detailed profile for ${university.name}. Rankings, subjects, and admission info.`,
  };
}

export default async function UniversityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const university = await getUniversity(resolvedParams.uni_name);

  if (!university) {
    notFound();
  }

  // Helper to get initials
  const initials =
    university.nameEn
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2) || 'U';

  // --- TABS CONTENT ---

  // 1. Overview Tab
  const OverviewTab = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        {university.overview && university.overview.length > 0 ? (
          <div className="space-y-8">
            {university.overview.map((section, idx) => (
              <div
                key={idx}
                className={
                  idx > 0
                    ? 'pt-8 border-t border-gray-100 dark:border-zinc-800'
                    : ''
                }
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-500 rounded-full" />{' '}
                  {/* Simpler icon for generic sections */}
                  {section.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          /* Fallback content if overview is missing */
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Auto-Generated Profile
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Detailed overview information is currently being updated for this
              university.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Helper for dynamic stat icons
  const getStatIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('found') || l.includes('year')) return Calendar;
    if (l.includes('student') || l.includes('pupil') || l.includes('enroll'))
      return Users;
    if (l.includes('staff') || l.includes('faculty') || l.includes('teacher'))
      return Building2;
    if (l.includes('female') || l.includes('ratio')) return Users;
    if (
      l.includes('intl') ||
      l.includes('international') ||
      l.includes('foreign')
    )
      return Globe;
    if (
      l.includes('bachelor') ||
      l.includes('undergrad') ||
      l.includes('degree')
    )
      return GraduationCap;
    return Trophy;
  };

  // 2. Key Statistics Tab
  const statsList =
    university.stats?.filter((s) => s.type === 'statistic') || [];
  const highlightsList =
    university.stats?.filter((s) => s.type === 'highlight') || [];

  const StatsTab = (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 2a. Grid for Statistics */}
      {statsList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {statsList.map((stat, idx) => {
            const Icon = getStatIcon(stat.label);
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
              >
                <Icon className="w-8 h-8 text-blue-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.content}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-700 mb-8">
          <p className="text-gray-500">
            Statistic data is currently being updated.
          </p>
        </div>
      )}

      {/* 2b. Highlights Section (Overview Style) */}
      {highlightsList.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8">
          {highlightsList.map((highlight, idx) => (
            <div
              key={idx}
              className={
                idx > 0
                  ? 'pt-8 border-t border-gray-100 dark:border-zinc-800'
                  : ''
              }
            >
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-orange-500" />
                {highlight.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {highlight.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 3. Ranking Tab
  const RankingTab = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Detailed Rankings List */}
      {/* <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Current Rankings
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {university.ranks &&
            Object.entries(university.ranks).map(([source, rank]) => (
              <div
                key={source}
                className="p-4 bg-gray-50 dark:bg-zinc-800/30 rounded-xl border border-gray-100 dark:border-zinc-800"
              >
                <div className="text-sm text-gray-500 uppercase font-semibold mb-1">
                  {source}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  #{rank}
                </div>
              </div>
            ))}
        </div>
      </div> */}

      {/* Historical Chart */}
      {/* {university.rankingHistory && university.rankingHistory.length > 0 && (
        <RankingChart history={university.rankingHistory} />
      )} */}

      {/* Individual Source Cards (New Design) */}
      <div className="space-y-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
        {university.ranks &&
          Object.entries(university.ranks).map(([source, rank]) => (
            <RankingSourceCard
              key={source}
              source={source}
              currentRank={rank}
              history={university.rankingHistory || []}
            />
          ))}
      </div>
    </div>
  );

  // 4. Scholarship Tab
  const ScholarshipTab = (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {university.scholarships && university.scholarships.length > 0 ? (
        university.scholarships.map((sch, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                {sch.name}
              </h4>
              <div className="text-sm text-gray-500 mt-1">{sch.type}</div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <span className="px-4 py-1 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded-full text-sm font-semibold">
                {sch.amount}
              </span>
              <button className="text-blue-600 font-medium text-sm hover:underline">
                Details &rarr;
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-8 text-center bg-gray-50 dark:bg-zinc-800/50 rounded-2xl border border-gray-100 dark:border-zinc-700">
          <p className="text-gray-500">
            No scholarship data available at the moment. Please contact the
            admissions office.
          </p>
        </div>
      )}
    </div>
  );

  // 5. Location Tab (Leaflet Map)
  // 5. Location Tab (Leaflet Map)
  // Definition moved to top level

  // 5. Location Tab (Leaflet Map)
  // 5. Location Tab (Leaflet Map)
  const LocationTab = (
    <UniversityLocationTab
      name={university.name}
      country={university.country}
      locations={university.locationCoords}
    />
  );

  // --- FEATURE FLAGS / VISIBILITY CONTROLS ---
  // Toggle these to true/false to show/hide specific sections
  const SHOW_SECTIONS = {
    overview: true,
    stats: true,
    ranking: true,
    scholarship: true,
    location:
      university.locationCoords && university.locationCoords.length > 0
        ? true
        : false,
    programs: true, // For the bottom section
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: OverviewTab,
      visible: SHOW_SECTIONS.overview,
    },
    {
      id: 'stats',
      label: 'Key Statistics',
      content: StatsTab,
      visible: SHOW_SECTIONS.stats,
    },
    {
      id: 'ranking',
      label: 'Rankings',
      content: RankingTab,
      visible: SHOW_SECTIONS.ranking,
    },
    {
      id: 'scholarship',
      label: 'Scholarships',
      content: ScholarshipTab,
      visible: SHOW_SECTIONS.scholarship,
    },
    {
      id: 'location',
      label: 'Location',
      content: LocationTab,
      visible: SHOW_SECTIONS.location,
    },
  ].filter((tab) => tab.visible);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      {/* Custom Header */}
      <div className="relative bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 pb-12 pt-32 md:pt-40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[150%] bg-linear-to-l from-blue-50 to-transparent dark:from-blue-900/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700 p-3 flex items-center justify-center shrink-0">
              {university.logoUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={university.logoUrl}
                    alt={university.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-300">
                  {initials}
                </span>
              )}
            </div>

            {/* Intro Text */}
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                {university.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {university.country}
                </div>
                {university.websiteUrl && (
                  <a
                    href={university.websiteUrl}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <Globe className="w-4 h-4" /> Official Website{' '}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed text-lg">
                {university.description
                  ? university.description.length > 200
                    ? university.description.slice(0, 200) + '...'
                    : university.description
                  : 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        {/* Section 2: Tabs */}
        {tabs.length > 0 && (
          <div className="mb-16">
            <UiTabs
              tabs={tabs}
              defaultTab={tabs[0]?.id}
              className="bg-transparent"
            />
          </div>
        )}

        {/* Section 3: Programs & CTA */}
        {SHOW_SECTIONS.programs && (
          <div className="grid md:grid-cols-3 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            {/* Free Test CTA */}
            <div className="md:col-span-1 bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">
                  Take a Free Practice Test
                </h3>
                <p className="text-blue-100 mb-8">
                  Not sure if you qualify? Take our 5-minute assessment to see
                  your admission chances.
                </p>
                <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors w-full">
                  Start Test Now
                </button>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            {/* Programs Summary */}
            <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Available Programs
                </h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                  View All Programs <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: 'Short Courses',
                    count: university.courseShortCount || 45,
                    color: 'bg-orange-50 text-orange-600',
                  },
                  {
                    label: 'Bachelors',
                    count: university.courseBachelorCount || 120,
                    color: 'bg-blue-50 text-blue-600',
                  },
                  {
                    label: 'Masters',
                    count: university.courseMasterCount || 85,
                    color: 'bg-purple-50 text-purple-600',
                  },
                  {
                    label: 'PhDs',
                    count: university.coursePhdCount || 40,
                    color: 'bg-pink-50 text-pink-600',
                  },
                ].map((prog) => (
                  <div
                    key={prog.label}
                    className={`p-4 rounded-2xl ${prog.color} dark:bg-opacity-10 dark:border dark:border-current flex flex-col items-center justify-center text-center h-32`}
                  >
                    <span className="text-3xl font-bold mb-1">
                      {prog.count}
                    </span>
                    <span className="text-sm font-medium opacity-80">
                      {prog.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
