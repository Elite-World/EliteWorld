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
} from 'lucide-react';
import { RankingChart } from '@/components/ranking/RankingChart';
import { Metadata } from 'next';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ uni_name: string }>;
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

  // Helper to get initials for fallback logo
  const initials =
    university.nameEn
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2) || 'U';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/20">
      {/* Custom Header / Hero */}
      <div className="relative bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-[50%] -right-[20%] w-[80%] h-[150%] bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-transparent dark:from-blue-900/10 dark:via-purple-900/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10 pt-28 pb-12 md:pt-36 md:pb-16 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
          {/* Logo Box */}
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-gray-100 dark:border-zinc-700 p-2 flex items-center justify-center shrink-0">
            {university.logoUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={university.logoUrl}
                  alt={university.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-300 dark:text-gray-600">
                {initials}
              </span>
            )}
          </div>

          {/* Title & Meta */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              {university.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm md:text-base text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{university.country}</span>
              </div>
              {university.websiteUrl && (
                <a
                  href={university.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Globe className="w-4 h-4" />
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Rank Summary Card (Desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-800/50 rounded-2xl px-6 py-4 border border-gray-100 dark:border-zinc-700">
            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
              Current Rank
            </span>
            <div className="text-4xl font-bold text-gray-900 dark:text-white">
              #{university.rank}
            </div>
            <span className="text-xs text-gray-500 mt-1">Global Ranking</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 max-w-7xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left / Top: Key Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Ranking Chart Section */}
            {university.rankingHistory &&
              university.rankingHistory.length > 0 && (
                <RankingChart history={university.rankingHistory} />
              )}

            {/* About Section */}
            <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" /> About the University
              </h2>
              <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  {university.description ||
                    'No detailed description available.'}
                </p>
              </div>
            </section>

            {/* History Section */}
            {university.history && (
              <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" /> History &
                  Heritage
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>{university.history}</p>
                </div>
              </section>
            )}

            {/* Visit Guide */}
            <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm border-l-4 border-l-green-500">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-500" /> Visit Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {university.visitGuide ||
                  'Campus visits are available. Check the official website for details.'}
              </p>
            </section>
          </div>

          {/* Sidebar / Right: Stats & Additional Info */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Mobile Rank Card (Visible only on small screens) */}
            <div className="md:hidden bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm text-center">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Global Rank
              </div>
              <div className="text-5xl font-bold text-gray-900 dark:text-white mt-2">
                #{university.rank}
              </div>
            </div>

            {/* Rankings List */}
            {university.ranks && Object.keys(university.ranks).length > 0 && (
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" /> Ranking
                  Performance
                </h3>
                <div className="space-y-3">
                  {Object.entries(university.ranks).map(([source, rank]) => (
                    <div
                      key={source}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50"
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300 uppercase">
                        {source}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        #{rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Subjects */}
            {university.subjects && university.subjects.length > 0 && (
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" /> Top Subjects
                </h3>
                <div className="flex flex-wrap gap-2">
                  {university.subjects.slice(0, 10).map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-100 dark:border-zinc-700 text-sm"
                    >
                      <span className="text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                        {sub.name}
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-zinc-900 px-1.5 rounded text-xs">
                        #{sub.rank}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
