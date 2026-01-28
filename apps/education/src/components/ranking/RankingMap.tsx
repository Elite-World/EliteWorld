'use client';

import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { UniversityRanking, useThemeStore } from '@repo/domain';

// TopoJSON URL (Standard World Map)
import geoUrl from '../../data/world-countries.json';

interface RankingMapProps {
  universities: UniversityRanking[];
}

const RankingMap: React.FC<RankingMapProps> = ({ universities }) => {
  const isDark = useThemeStore((state) => state.isDark);

  // Aggregate university counts by country
  const countryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    universities.forEach((uni) => {
      // Normalize country names if needed (e.g., "USA" -> "United States of America")
      // For simplicity, we assume map names often match or we do fuzzy matching later.
      // Common normalizations:
      let country = uni.country;
      const countryMap: Record<string, string> = {
        美国: 'United States of America',
        英国: 'United Kingdom',
        中国: 'China',
        新加坡: 'Singapore',
        瑞士: 'Switzerland',
        澳大利亚: 'Australia',
        德国: 'Germany',
        加拿大: 'Canada',
        日本: 'Japan',
        法国: 'France',
        韩国: 'South Korea',
        荷兰: 'Netherlands',
        瑞典: 'Sweden',
        爱尔兰: 'Ireland',
        俄罗斯: 'Russia',
        意大利: 'Italy',
        新西兰: 'New Zealand',
        比利时: 'Belgium',
        丹麦: 'Denmark',
        马来西亚: 'Malaysia',
        挪威: 'Norway',
        芬兰: 'Finland',
        西班牙: 'Spain',
        沙特阿拉伯: 'Saudi Arabia',
        阿根廷: 'Argentina',
        巴西: 'Brazil',
        智利: 'Chile',
        墨西哥: 'Mexico',
        USA: 'United States of America',
        'United States': 'United States of America',
        UK: 'United Kingdom',
      };
      if (countryMap[country]) country = countryMap[country];

      counts[country] = (counts[country] || 0) + 1;
    });
    return counts;
  }, [universities]);

  // Create color scale
  const colorScale = useMemo(() => {
    // Blue shades palette
    const colors = isDark
      ? ['#27272a', '#1e3a8a', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'] // Dark mode blues
      : ['#f4f4f5', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb']; // Light mode blues

    return scaleQuantile<string>()
      .domain(Object.values(countryCounts))
      .range(colors);
  }, [countryCounts, isDark]);

  return (
    <div className="w-full h-[500px] bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden relative mb-8 z-0">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 100, center: [0, 10] }}
        width={800}
        height={450}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const count = countryCounts[countryName] || 0;
              const tooltipText = `${countryName}: ${count} ${
                count === 1 ? 'University' : 'Universities'
              }`;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  data-tooltip-id="map-tooltip"
                  data-tooltip-content={tooltipText}
                  fill={
                    count > 0
                      ? colorScale(count)
                      : isDark
                        ? '#3f3f46'
                        : '#e4e4e7'
                  }
                  stroke={isDark ? '#18181b' : '#fff'}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none', transition: 'all 250ms' },
                    hover: {
                      fill: '#f59e0b',
                      outline: 'none',
                      cursor: 'pointer',
                    }, // Amber on hover
                    pressed: { outline: 'none' },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      <Tooltip
        id="map-tooltip"
        style={{
          backgroundColor: isDark
            ? 'rgba(0,0,0,0.9)'
            : 'rgba(255,255,255,0.95)',
          color: isDark ? '#fff' : '#000',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 100,
          fontSize: '13px',
          fontWeight: 500,
        }}
      />

      {/* Legend / Info */}
      <div className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm text-xs pointer-events-none">
        <div className="font-semibold mb-2">University Density</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-600"></span>
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-300"></span>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-200 dark:bg-zinc-700"></span>
            <span>None</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingMap;
