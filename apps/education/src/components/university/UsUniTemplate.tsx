import React from 'react';
import {
  MapPin,
  Globe,
  Clock,
  ExternalLink,
  Award,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { RankingSourceCard } from '@/components/ranking/RankingSourceCard';
import Image from 'next/image';
import { UniversityLocationTab } from '@/components/university/UniversityLocationTab';
import { StatsDashboard } from './StatsDashboard';
import { CrimeSpiderChart } from './CrimeSpiderChart';
import { ExpandableDescription } from '@/components/university/ExpandableDescription';
import { DevAwareTabs } from './DevAwareTabs';
import { DevAwareBottomCards } from './DevAwareBottomCards';

export function UsUniTemplate({ university }: { university: any }) {
  const initials =
    university.nameEn
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2) || 'U';

  const OverviewTab = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
        {university.overview && university.overview.length > 0 ? (
          <div className="space-y-8">
            {university.overview.map((section: any, idx: number) => (
              <div
                key={idx}
                className={idx > 0 ? 'pt-8 border-t border-gray-100 dark:border-zinc-800' : ''}
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-2 h-6 bg-blue-500 rounded-full" /> {section.label}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500" /> Auto-Generated Profile
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Detailed overview information is currently being updated for this university.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const StatsTab = (
    <div>
      <StatsDashboard richData={university.rich_data} />
      
      {/* We can still include highlights if any exist from global DB */}
      {university.stats?.filter((s: any) => s.type === 'highlight').length > 0 && (
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm space-y-8 mt-8">
          {university.stats.filter((s: any) => s.type === 'highlight').map((highlight: any, idx: number) => (
            <div
              key={idx}
              className={idx > 0 ? 'pt-8 border-t border-gray-100 dark:border-zinc-800' : ''}
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

  const RankingTab = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-6">
        {university.ranks &&
          Object.entries(university.ranks).map(([source, rank]: [string, any]) => (
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

  const uniScholarships = university.scholarships?.filter((s: any) => s.scope === 'university') || [];
  const countryScholarships = university.scholarships?.filter((s: any) => s.scope === 'country') || [];

  const renderScholarshipCard = (sch: any, idx: number, badgeColor: string) => (
    <div
      key={idx}
      className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{sch.name}</h4>
          <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${badgeColor}`}>
            {sch.scope === 'country' ? 'Country-Wide' : 'University'}
          </span>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Award className="w-4 h-4" />
          {sch.type}
        </div>
      </div>
      <div className="mt-4 md:mt-0 flex items-center gap-4">
        <span className="px-4 py-1.5 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm font-semibold border border-green-100 dark:border-green-800/30">
          {sch.amount}
        </span>
        <button className="text-blue-600 font-medium text-sm hover:underline group-hover:translate-x-1 transition-transform">
          Details &rarr;
        </button>
      </div>
    </div>
  );

  const ScholarshipTab = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {(!university.scholarships || university.scholarships.length === 0) ? (
        <div className="p-12 text-center bg-gray-50 dark:bg-zinc-800/30 rounded-3xl border border-dashed border-gray-200 dark:border-zinc-700">
          <Award className="w-12 h-12 text-gray-300 dark:text-zinc-600 mb-4 mx-auto" />
          <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
            No scholarship data available at the moment.
          </p>
          <p className="text-sm text-gray-400 mt-2">Check back later or contact the admissions office directly.</p>
        </div>
      ) : (
        <>
          {uniScholarships.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-6 h-6 text-blue-500" />
                University Scholarships
              </h3>
              <div className="space-y-3">
                {uniScholarships.map((sch: any, idx: number) => renderScholarshipCard(sch, idx, 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'))}
              </div>
            </div>
          )}

          {countryScholarships.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-zinc-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Globe className="w-6 h-6 text-purple-500" />
                National & International Scholarships
              </h3>
              <div className="space-y-3">
                {countryScholarships.map((sch: any, idx: number) => renderScholarshipCard(sch, idx, 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const LocationTab = (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <UniversityLocationTab
        name={university.name}
        slug={university.id}
        country={university.country}
        locations={university.locationCoords}
        nearbyUniversities={[
          ...(Array.isArray(university.rich_data?.school_nearby?.images2) ? university.rich_data.school_nearby.images2 : []),
          ...(Array.isArray(university.rich_data?.school_nearby?.images3) ? university.rich_data.school_nearby.images3 : [])
        ]}
      />
      {university.rich_data?.crime && (
        <CrimeSpiderChart 
          crimeData={university.rich_data.crime} 
          historicalCrimeData={university.rich_data.historical_crime}
        />
      )}
    </div>
  );

  const ProgramsTab = <div />;

  const SHOW_SECTIONS = {
    overview: !!university.description,
    stats: !!university.rich_data,
    ranking: !!university.ranks && Object.keys(university.ranks).length > 0,
    scholarship: !!university.scholarships && university.scholarships.length > 0,
    location: !!(university.locationCoords && university.locationCoords.length > 0),
    programs: false, // Hidden for now as we don't have program data
  };

  const tabs = [
    { id: 'overview', label: 'Overview', content: OverviewTab, visible: SHOW_SECTIONS.overview },
    { id: 'stats', label: 'Detailed Analytics', content: StatsTab, visible: SHOW_SECTIONS.stats },
    { id: 'ranking', label: 'Rankings', content: RankingTab, visible: SHOW_SECTIONS.ranking },
    { id: 'scholarship', label: 'Scholarships', content: ScholarshipTab, visible: SHOW_SECTIONS.scholarship },
    { id: 'location', label: 'Location', content: LocationTab, visible: SHOW_SECTIONS.location },
    { id: 'programs', label: 'Programs', content: ProgramsTab, visible: SHOW_SECTIONS.programs },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      <div className="relative bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 pb-12 pt-32 md:pt-40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute -top-[50%] -right-[10%] w-[70%] h-[150%] bg-linear-to-l from-blue-50 to-transparent dark:from-blue-900/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700 p-3 flex items-center justify-center shrink-0">
              {university.logoUrl || university.id ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={university.logoUrl || `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dr435quj2'}/image/upload/${university.id}.png`} 
                    alt={university.name} 
                    fill 
                    className="object-contain" 
                  />
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-300">{initials}</span>
              )}
            </div>

            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full text-xs font-bold mb-3 tracking-wider uppercase">
                Premium US Data
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                {university.name}
              </h1>
              <div className="flex flex-wrap gap-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {university.country}
                </div>
                {university.websiteUrl && (
                  <a href={university.websiteUrl} target="_blank" rel="noopener" className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                    <Globe className="w-4 h-4" /> Official Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <ExpandableDescription text={university.description} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        <DevAwareTabs tabs={tabs} />

        <DevAwareBottomCards>
          <div className="grid md:grid-cols-3 gap-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            <div className="md:col-span-1 bg-linear-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Take a Free Practice Test</h3>
                <p className="text-blue-100 mb-8">
                  Not sure if you qualify? Take our 5-minute assessment to see your admission chances.
                </p>
                <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors w-full">
                  Start Test Now
                </button>
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Available Programs</h3>
                <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'Bachelors', count: university.courseBachelorCount || 120, color: 'bg-blue-50 text-blue-600' },
                  { label: 'Masters', count: university.courseMasterCount || 85, color: 'bg-purple-50 text-purple-600' },
                  { label: 'PhDs', count: university.coursePhdCount || 40, color: 'bg-pink-50 text-pink-600' },
                ].map((prog) => (
                  <div
                    key={prog.label}
                    className={`p-4 rounded-2xl ${prog.color} dark:bg-opacity-10 dark:border dark:border-current flex flex-col items-center justify-center text-center h-32`}
                  >
                    <span className="text-3xl font-bold mb-1">{prog.count}</span>
                    <span className="text-sm font-medium opacity-80">{prog.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DevAwareBottomCards>
      </div>
    </div>
  );
}
