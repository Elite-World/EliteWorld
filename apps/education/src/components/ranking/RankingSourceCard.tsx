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
// import { cn } from '@repo/domain/lib/utils'; // Adjust path if needed

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
  {
    title: string;
    publisher: string;
    description: string;
    color: string;
    homepage: string;
  }
> = {
  qs: {
    title: 'QS World University Rankings',
    publisher: 'Quacquarelli Symonds',
    description:
      'QS World University Rankings is one of the top international rankings measuring the popularity and performance of universities all over the world.',
    color: '#F59E0B',
    homepage: 'https://www.topuniversities.com',
  },
  the: {
    title: 'World University Rankings',
    publisher: 'Times Higher Education',
    description:
      "The Times Higher Education World University Rankings provide the definitive list of the world's best universities, with an emphasis on research missions.",
    color: '#EF4444',
    homepage: 'https://www.timeshighereducation.com',
  },
  arwu: {
    title: 'Academic Ranking of World Universities',
    publisher: 'Shanghai Jiao Tong University',
    description:
      'ARWU uses six objective indicators to rank world universities, including the number of alumni and staff winning Nobel Prizes and Fields Medals.',
    color: '#10B981',
    homepage: 'https://www.shanghairanking.com',
  },
  usnews: {
    title: 'Best Global Universities',
    publisher: 'U.S. News & World Report',
    description:
      'The U.S. News & World Report Best Global Universities rankings offer insight into how universities compare globally.',
    color: '#3B82F6',
    homepage: 'https://www.usnews.com/education/best-global-universities',
  },
  cwur: {
    title: 'CWUR World University Rankings',
    publisher: 'Center for World University Rankings',
    description:
      'CWUR publishes the only global university ranking that measures the quality of education and training of students as well as the prestige of the faculty members and the quality of their research without relying on surveys and university data submissions.',
    color: '#8B5CF6',
    homepage: 'https://cwur.org',
  },
  leiden: {
    title: 'CWTS Leiden Ranking',
    publisher: 'Centre for Science and Technology Studies',
    description:
      'The CWTS Leiden Ranking offers a sophisticated set of bibliometric indicators that provide statistics on the scientific performance of universities.',
    color: '#EC4899',
    homepage: 'https://www.leidenranking.com',
  },
  webometrics: {
    title: 'Webometrics Ranking of World Universities',
    publisher: 'Cybermetrics Lab',
    description:
      'The "Webometrics Ranking of World Universities" is an initiative of the Cybermetrics Lab, a research group belonging to the Consejo Superior de Investigaciones Científicas (CSIC), the largest public research body in Spain.',
    color: '#EA580C',
    homepage: 'https://www.webometrics.info',
  },
  rur: {
    title: 'Round University Ranking',
    publisher: 'RUR Rankings Agency',
    description:
      'Round University Ranking (RUR) relies on 20 indicators separated into 4 key areas: teaching, research, international diversity, and financial sustainability.',
    color: '#06B6D4',
    homepage: 'https://roundranking.com',
  },
  nature_index: {
    title: 'Nature Index',
    publisher: 'Nature Portfolio',
    description:
      'The Nature Index is an open database of author affiliations and institutional relationships. The Index tracks contributions to research articles published in 82 high-quality natural-science journals.',
    color: '#E11D48',
    homepage: 'https://www.nature.com/nature-index/',
  },
  scimago: {
    title: 'Scimago Institutions Rankings',
    publisher: 'Scimago Lab',
    description:
      'The SCImago Institutions Rankings (SIR) is a classification of academic and research-related institutions ranked by a composite indicator that combines three different sets of indicators based on research performance, innovation outputs and societal impact.',
    color: '#7C3AED',
    homepage: 'https://www.scimagoir.com',
  },
  fb: {
    title: "Forbes America's Top Colleges",
    publisher: 'Forbes',
    description:
      "Forbes' annual list of America's Top Colleges spotlights the schools that offer the best return on investment, focusing on student outcomes, alumni salaries, and low debt.",
    color: '#000000',
    homepage: 'https://www.forbes.com/top-colleges/',
  },
  wm: {
    title: 'Washington Monthly Rankings',
    publisher: 'Washington Monthly',
    description:
      'Washington Monthly ranks colleges based on their contribution to the public good in three broad categories: social mobility, research, and promoting public service.',
    color: '#DC2626',
    homepage: 'https://washingtonmonthly.com/2024-college-guide/',
  },
  urap: {
    title: 'University Ranking by Academic Performance',
    publisher: 'URAP Research Laboratory',
    description:
      'URAP ranking system focuses on academic quality, gathering data about 3,000 Higher Education Institutes (HEI) in an effort to rank the top 2,500 based on academic performance indicators.',
    color: '#059669',
    homepage: 'https://urapcenter.org',
  },
  wrwu: {
    title: 'Webometrics Ranking of World Universities',
    publisher: 'Cybermetrics Lab',
    description:
      'The Webometrics Ranking allows you to check the performance of universities based on their web presence and impact.',
    color: '#EA580C',
    homepage: 'https://www.webometrics.info',
  },
  niche: {
    title: 'Niche Best Colleges',
    publisher: 'Niche',
    description:
      'Niche rankings are based on rigorous analysis of key statistics from the U.S. Department of Education and millions of reviews.',
    color: '#16A34A',
    homepage: 'https://www.niche.com/colleges/search/best-colleges/',
  },
  default: {
    title: 'University Ranking',
    publisher: 'Unknown Publisher',
    description: 'Global university performance ranking.',
    color: '#6B7280',
    homepage: '#',
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
    'Rank data available for ' + (sourceHistory[0]?.year || '') + '.';

  if (sourceHistory.length >= 2) {
    const last = sourceHistory[sourceHistory.length - 1];
    const prev = sourceHistory[sourceHistory.length - 2];
    const diff = prev.rank - last.rank; // Positive means moved UP (rank number got smaller)

    if (diff > 0) {
      trendIcon = <ChevronUp className="w-5 h-5 text-green-500" />;
      trendText = `Climbed ${diff} ${diff === 1 ? 'place' : 'places'} from #${
        prev.rank
      } in ${prev.year} to #${last.rank} in ${last.year}.`;
    } else if (diff < 0) {
      trendIcon = <ChevronDown className="w-5 h-5 text-red-500" />;
      trendText = `Dropped ${Math.abs(diff)} ${
        Math.abs(diff) === 1 ? 'place' : 'places'
      } from #${prev.rank} in ${prev.year} to #${last.rank} in ${last.year}.`;
    } else {
      trendIcon = <Minus className="w-5 h-5 text-gray-400" />;
      trendText = `Maintained its position at #${last.rank} in ${last.year}, consistent with ${prev.year}.`;
    }
  } else if (sourceHistory.length === 1) {
    const last = sourceHistory[0];
    trendText = `Ranked #${last.rank} in ${last.year}.`;
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
          <a
            href={meta.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline flex items-center gap-1"
          >
            Read more <ExternalLink className="w-3 h-3" />
          </a>
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
