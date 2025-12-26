'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Trophy,
  ChevronUp,
  ChevronDown,
  Minus,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@repo/web-shared/lib/utils'; // Adjust path if needed

interface RankingHistoryItem {
  year: number;
  source: string;
  rank: number;
  score?: number;
}

interface RankingSourceCardProps {
  source: string;
  currentRank: number | string;
  history: RankingHistoryItem[];
}

const SOURCE_METADATA: Record<
  string,
  { title: string; publisher: string; description: string; color: string }
> = {
  qs: {
    title: 'QS World University Rankings',
    publisher: 'Quacquarelli Symonds',
    description:
      'QS World University Rankings is one of the top international rankings measuring the popularity and performance of universities all over the world.',
    color: '#F59E0B',
  },
  the: {
    title: 'World University Rankings',
    publisher: 'Times Higher Education',
    description:
      "The Times Higher Education World University Rankings provide the definitive list of the world's best universities, with an emphasis on research missions.",
    color: '#EF4444',
  },
  arwu: {
    title: 'Academic Ranking of World Universities',
    publisher: 'Shanghai Jiao Tong University',
    description:
      'ARWU uses six objective indicators to rank world universities, including the number of alumni and staff winning Nobel Prizes and Fields Medals.',
    color: '#10B981',
  },
  usnews: {
    title: 'Best Global Universities',
    publisher: 'U.S. News & World Report',
    description:
      'The U.S. News & World Report Best Global Universities rankings offer insight into how universities compare globally.',
    color: '#3B82F6',
  },
  cwur: {
    title: 'CWUR World University Rankings',
    publisher: 'Center for World University Rankings',
    description:
      'CWUR publishes the only global university ranking that measures the quality of education and training of students as well as the prestige of the faculty members and the quality of their research without relying on surveys and university data submissions.',
    color: '#8B5CF6',
  },
  default: {
    title: 'University Ranking',
    publisher: 'Unknown Publisher',
    description: 'Global university performance ranking.',
    color: '#6B7280',
  },
};

export const RankingSourceCard: React.FC<RankingSourceCardProps> = ({
  source,
  currentRank,
  history,
}) => {
  // 1. Get Metadata
  const meta = SOURCE_METADATA[source.toLowerCase()] || {
    ...SOURCE_METADATA.default,
    title: `${source.toUpperCase()} Rankings`,
  };

  // 2. Filter & Sort History (Ascending Year)
  // 2. Filter & Sort History (Ascending Year) & Deduplicate
  const rawSourceHistory = history
    .filter((h) => h.source.toLowerCase() === source.toLowerCase())
    .sort((a, b) => a.year - b.year);

  const sourceHistory: RankingHistoryItem[] = [];
  const seenYears = new Set<number>();

  for (const item of rawSourceHistory) {
    if (!seenYears.has(item.year)) {
      sourceHistory.push(item);
      seenYears.add(item.year);
    }
  }

  // Take last 3 years for the "Trend" table/chart focus, but maybe show more in chart?
  // Image says "3 year trend". Let's take up to 5 for chart context, but highlight 3 in table.
  const recentHistory = sourceHistory.slice(-5);
  const tableHistory = sourceHistory.slice(-3);

  // 3. Calculate Trend (Up/Down/Stable)
  // Compare last year vs previous year in the filtered list
  let trendIcon = <Minus className="w-5 h-5 text-gray-400" />;
  let trendText =
    "The university hasn't moved up or down in the rankings over the past year.";

  if (sourceHistory.length >= 2) {
    const last = sourceHistory[sourceHistory.length - 1];
    const prev = sourceHistory[sourceHistory.length - 2];
    if (last.rank < prev.rank) {
      // Lower rank number is better (e.g. 1 < 5)
      trendIcon = <ChevronUp className="w-5 h-5 text-green-500" />;
      trendText =
        'The university has moved up in the rankings over the past year.';
    } else if (last.rank > prev.rank) {
      trendIcon = <ChevronDown className="w-5 h-5 text-red-500" />;
      trendText =
        'The university has moved down in the rankings over the past year.';
    }
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden p-6 gap-8">
      {/* LEFT SIDE: Info */}
      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {meta.title}
          </h3>
          <div className="flex items-center gap-3">
            {/* Laurel / Rank Display */}
            <div className="relative flex items-center justify-center">
              <Trophy
                className="w-12 h-12 text-gray-200 dark:text-zinc-700 absolute"
                strokeWidth={1}
              />
              <span className="text-3xl font-bold text-gray-900 dark:text-white relative z-10">
                {currentRank}
              </span>
            </div>

            {/* Publisher */}
            <div className="text-sm text-gray-500">
              By{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {meta.publisher}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
          {trendIcon}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-tight pt-0.5">
            {trendText}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
            {meta.description}
          </p>
          <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1">
            Read more <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* RIGHT SIDE: Stats & Chart */}
      <div className="flex-1 bg-gray-50 dark:bg-zinc-800/30 rounded-xl p-6 border border-gray-100 dark:border-zinc-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
            3 Year Trend
          </h4>
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded transition-colors">
            <ChevronUp className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Table */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {tableHistory.length > 0 ? (
            tableHistory.map((item) => (
              <div key={item.year} className="text-center">
                <div className="text-xs font-semibold text-gray-500 mb-1">
                  {item.year}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.rank}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center text-sm text-gray-400 py-2">
              No recent data
            </div>
          )}
        </div>

        {/* Mini Chart */}
        <div className="h-40 w-full mt-auto">
          {recentHistory.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={recentHistory}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke="#e5e7eb"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  reversed={true}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  tickLine={false}
                  axisLine={false}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                  labelStyle={{ color: '#6B7280', fontSize: '10px' }}
                  itemStyle={{
                    color: meta.color,
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rank"
                  stroke={meta.color}
                  strokeWidth={2}
                  dot={{ r: 3, fill: meta.color, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-gray-400">
              Not enough data for chart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
