import React from 'react';
import { notFound } from 'next/navigation';
import { getUniversity } from '@repo/web-shared/services/ranking-service';
import {
  Info,
  MapPin,
  Globe,
  Trophy,
  Users,
  BookOpen,
  Clock,
  Calendar,
  ExternalLink,
  GraduationCap,
  Building2,
  Award,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';
import { RankingChart } from '@/components/ranking/RankingChart';
import { RankingSourceCard } from '@/components/ranking/RankingSourceCard';
import { Metadata } from 'next';
import Image from 'next/image';

// But `apps/education` might consume it via `@repo/ui`.
// I need to check how `apps/education` imports UI components.
// Usually `import { ... } from '@repo/ui'`.
// I added `export * from './components/Tabs';` to `packages/ui/src/index.tsx`.
// So I should import from `@repo/ui`.

import { Tabs as UiTabs } from '@repo/ui';

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
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" /> History
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {university.history ||
            'Founded in the late 19th century, this institution has a long-standing tradition of academic excellence and public service. It has grown from a small college to a world-renowned research university.'}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-500" /> Education
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {university.education ||
                'We offer a comprehensive range of undergraduate and graduate programs across various disciplines, fostering critical thinking and innovation.'}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-500" /> Research
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {university.research ||
                'Our university is at the forefront of global research, appearing in top citations for Engineering, Medicine, and Social Sciences. We house over 50 state-of-the-art research centers.'}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-orange-500" /> Accreditation
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {university.accreditation ||
              'Accredited by the Ministry of Education and various international bodies including AACSB for Business and ABET for Engineering.'}
          </p>
        </div>
      </div>
    </div>
  );

  // 2. Key Statistics Tab
  const StatsTab = (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {[
        {
          label: 'Founded',
          value: university.foundedYear || '1890',
          icon: Calendar,
          color: 'text-blue-500',
        },
        {
          label: 'Total Students',
          value: university.studentCount?.toLocaleString() || '32,000',
          icon: Users,
          color: 'text-indigo-500',
        },
        {
          label: 'Undergraduates',
          value: university.undergradCount?.toLocaleString() || '18,000',
          icon: GraduationCap,
          color: 'text-green-500',
        },
        {
          label: 'Female:Male',
          value: university.femaleMaleRatio || '52:48',
          icon: Users,
          color: 'text-pink-500',
        },
        {
          label: 'Intl. Students',
          value: university.intlStudentPercent || '24%',
          icon: Globe,
          color: 'text-orange-500',
        },
        {
          label: 'Academic Staff',
          value: university.staffCount?.toLocaleString() || '2,500',
          icon: Building2,
          color: 'text-purple-500',
        },
      ].map((stat, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
        >
          <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stat.label}
          </div>
        </div>
      ))}
      <div className="col-span-2 md:col-span-3 bg-blue-50 dark:bg-zinc-800/50 p-6 rounded-2xl border border-blue-100 dark:border-zinc-700 flex items-center justify-center gap-3">
        <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <span className="font-semibold text-blue-900 dark:text-blue-100">
          {university.campusType || 'Public Research University'}
        </span>
      </div>
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

  // 5. Location Tab (Mock Map)
  const LocationTab = (
    <div className="bg-white dark:bg-zinc-900 p-2 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm h-[400px] flex items-center justify-center relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-800 animate-pulse" />
      <div className="relative z-10 text-center">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-500">
          Interactive Map Loading...
        </h3>
        <p className="text-sm text-gray-400 max-w-xs mx-auto mt-2">
          Location: {university.country}. (Map integration pending Google Maps
          API key)
        </p>
      </div>
    </div>
  );

  // --- FEATURE FLAGS / VISIBILITY CONTROLS ---
  // Toggle these to true/false to show/hide specific sections
  const SHOW_SECTIONS = {
    overview: true,
    stats: true,
    ranking: true,
    scholarship: true,
    location: true,
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
          <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[150%] bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/10 rounded-full blur-3xl" />
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
                  ? university.description.slice(0, 200) + '...'
                  : (university.history || '').slice(0, 150) + '...'}
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
            <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group">
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
