'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useMemo, useState } from 'react';

interface RankingHistoryItem {
  year: number;
  source: string;
  rank: number;
}

interface RankingChartProps {
  history: RankingHistoryItem[];
}

const SOURCE_CONFIG: Record<string, { color: string; label: string }> = {
  qs: { color: '#F59E0B', label: 'QS World' }, // Amber-500
  the: { color: '#EF4444', label: 'THE' }, // Red-500
  usnews: { color: '#3B82F6', label: 'US News' }, // Blue-500
  arwu: { color: '#10B981', label: 'ARWU' }, // Emerald-500
  cwur: { color: '#8B5CF6', label: 'CWUR' }, // Violet-500
  cug: { color: '#06B6D4', label: 'CUG' }, // Cyan-500
  guardian: { color: '#EC4899', label: 'Guardian' }, // Pink-500
  times: { color: '#6366F1', label: 'Times' }, // Indigo-500
  urap: { color: '#84CC16', label: 'URAP' }, // Lime-500
  wrwu: { color: '#F97316', label: 'WRWU' }, // Orange-500
  default: { color: '#6B7280', label: 'Other' }, // Gray-500
};

export function RankingChart({ history }: RankingChartProps) {
  // 1. Transform data for Recharts
  const { chartData, availableSources } = useMemo(() => {
    const yearMap = new Map<number, any>();
    const sources = new Set<string>();

    history.forEach((item) => {
      if (!yearMap.has(item.year)) {
        yearMap.set(item.year, { year: item.year });
      }
      const entry = yearMap.get(item.year);
      entry[item.source] = item.rank;
      sources.add(item.source);
    });

    return {
      chartData: Array.from(yearMap.values()).sort((a, b) => a.year - b.year),
      availableSources: Array.from(sources),
    };
  }, [history]);

  // 2. State for filtering (default: all visible)
  const [hiddenSources, setHiddenSources] = useState<Set<string>>(new Set());

  // 3. Filter data based on visibility to auto-scale X-axis
  const filteredData = useMemo(() => {
    return chartData.filter((row) => {
      // Check if this year has any data for visible sources
      return availableSources.some(
        (source) =>
          !hiddenSources.has(source) &&
          row[source] !== undefined &&
          row[source] !== null
      );
    });
  }, [chartData, availableSources, hiddenSources]);

  const toggleSource = (source: string) => {
    const newHidden = new Set(hiddenSources);
    if (newHidden.has(source)) {
      newHidden.delete(source);
    } else {
      newHidden.add(source);
    }
    setHiddenSources(newHidden);
  };

  if (!history || history.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-zinc-800/50 rounded-xl border border-dashed border-gray-200 dark:border-zinc-700">
        No ranking history available
      </div>
    );
  }

  // Helper to get color safely
  const getSourceColor = (source: string) =>
    SOURCE_CONFIG[source.toLowerCase()]?.color || SOURCE_CONFIG.default.color;

  const getSourceLabel = (source: string) =>
    SOURCE_CONFIG[source.toLowerCase()]?.label || source.toUpperCase();

  return (
    <div className="w-full bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Historical Trends
        </h3>

        {/* Custom Legend / Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {availableSources.map((source) => {
            const isHidden = hiddenSources.has(source);
            const color = getSourceColor(source);
            return (
              <button
                key={source}
                onClick={() => toggleSource(source)}
                className={`
                  px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border
                  flex items-center gap-2
                  ${
                    isHidden
                      ? 'bg-gray-50 text-gray-400 border-gray-200 dark:bg-zinc-800 dark:text-zinc-500 dark:border-zinc-700'
                      : 'bg-white text-gray-700 border-gray-200 shadow-sm dark:bg-zinc-800 dark:text-gray-200 dark:border-zinc-700 hover:border-gray-300 dark:hover:border-zinc-600'
                  }
                `}
              >
                <span
                  className={`w-2 h-2 rounded-full transition-colors`}
                  style={{ backgroundColor: isHidden ? '#9ca3af' : color }}
                />
                {getSourceLabel(source)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="w-full h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f3f4f6"
              vertical={false}
              className="dark:stroke-zinc-800"
            />
            <XAxis
              dataKey="year"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
              tickMargin={10}
            />
            <YAxis
              reversed
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={40}
              domain={[1, 'auto']}
              allowDecimals={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  // Sort payload by rank (value) ascending because rank 1 is best
                  const sorted = [...payload].sort(
                    (a: any, b: any) => (a.value ?? 999) - (b.value ?? 999)
                  );

                  return (
                    <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100 dark:border-zinc-700 text-sm">
                      <p className="font-bold text-gray-900 dark:text-white mb-2">
                        {label}
                      </p>
                      <div className="space-y-1">
                        {sorted.map((p: any) => (
                          <div
                            key={p.name}
                            className="flex items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: p.color }}
                              />
                              <span className="text-gray-600 dark:text-gray-300">
                                {getSourceLabel(p.name)}
                              </span>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">
                              #{p.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {availableSources.map((source) => {
              if (hiddenSources.has(source)) return null;

              const color = getSourceColor(source);
              return (
                <Line
                  key={source}
                  type="linear" // straight lines
                  dataKey={source}
                  name={source} // Needed for tooltip keys
                  stroke={color}
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: '#fff',
                    stroke: color,
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                    fill: color,
                    stroke: '#fff',
                    strokeWidth: 2,
                  }}
                  connectNulls
                  animationDuration={1000}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
