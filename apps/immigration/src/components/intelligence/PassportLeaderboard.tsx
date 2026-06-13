'use client';

import React from 'react';
import Link from 'next/link';
import { ICountry } from '@repo/domain';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PassportRankData {
  rank: number;
  country: ICountry;
  passport_power: {
    visa_free_score: number;
    access_to_us?: boolean;
    access_to_uk?: boolean;
    access_to_schengen?: boolean;
    access_to_china?: boolean;
  };
}

interface PassportLeaderboardProps {
  data: PassportRankData[];
  locale: string;
}

function AccessBadge({ label, hasAccess }: { label: string, hasAccess?: boolean }) {
  if (hasAccess === undefined) return null;
  
  return (
    <div className="flex flex-col items-center gap-1 group/badge relative">
      {hasAccess ? (
        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 drop-shadow-sm" />
      ) : (
        <XCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-300 dark:text-zinc-700/50" />
      )}
      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest absolute -bottom-5 opacity-0 group-hover/badge:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
  );
}

export function PassportLeaderboard({ data, locale }: PassportLeaderboardProps) {
  const dbLocale = locale === 'zh' ? 'cn' : 'en';
  const thClass = "py-3 px-4 md:py-4 md:px-6 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest border-r border-gray-200/50 dark:border-white/5 last:border-r-0";
  const tdClass = "py-4 px-4 md:py-5 md:px-6 border-r border-gray-100 dark:border-white/5 last:border-r-0";

  return (
    <div className="bg-white/70 dark:bg-zinc-900/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/50 dark:bg-black/20 border-b border-gray-200/50 dark:border-white/10">
              <th className={`${thClass} whitespace-nowrap text-center`}>{locale === 'zh' ? '排名' : 'Rank'}</th>
              <th className={`${thClass} min-w-[120px] md:min-w-[200px] sticky left-0 bg-white/90 dark:bg-[#111]/90 backdrop-blur-md z-20 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]`}>{locale === 'zh' ? '目的地' : 'Jurisdiction'}</th>
              <th className={`${thClass} text-center`}>{locale === 'zh' ? '免签得分' : 'Visa-Free Score'}</th>
              <th className={`${thClass} text-center whitespace-nowrap`}>{locale === 'zh' ? '美国准入' : 'US Access'}</th>
              <th className={`${thClass} text-center whitespace-nowrap`}>{locale === 'zh' ? '英国准入' : 'UK Access'}</th>
              <th className={`${thClass} text-center whitespace-nowrap`}>{locale === 'zh' ? '申根准入' : 'Schengen'}</th>
              <th className={`${thClass} text-center whitespace-nowrap`}>{locale === 'zh' ? '中国准入' : 'China'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {data.map((row) => (
              <tr key={row.country.slug} className="group hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                <td className={`${tdClass} text-center`}>
                  <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 mx-auto rounded-full bg-black/5 dark:bg-white/10 text-gray-900 dark:text-white font-bold text-xs md:text-sm shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10">
                    {row.rank}
                  </div>
                </td>
                <td className={`${tdClass} sticky left-0 bg-white/90 dark:bg-[#111]/90 backdrop-blur-md group-hover:bg-gray-50 dark:group-hover:bg-[#1a1a1a] z-10 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] transition-colors`}>
                  <Link href={`/destinations/${row.country.slug}`} className="text-sm md:text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight block w-full whitespace-nowrap">
                    {/* @ts-ignore */}
                    {row.country.translations?.[dbLocale]?.name || row.country.name?.[dbLocale] || row.country.name?.en}
                  </Link>
                </td>
                <td className={`${tdClass} text-center`}>
                  <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                    {row.passport_power.visa_free_score}
                  </span>
                </td>
                <td className={tdClass}>
                  <div className="flex justify-center">
                    <AccessBadge label="US" hasAccess={row.passport_power.access_to_us} />
                  </div>
                </td>
                <td className={tdClass}>
                  <div className="flex justify-center">
                    <AccessBadge label="UK" hasAccess={row.passport_power.access_to_uk} />
                  </div>
                </td>
                <td className={tdClass}>
                  <div className="flex justify-center">
                    <AccessBadge label="Schengen" hasAccess={row.passport_power.access_to_schengen} />
                  </div>
                </td>
                <td className={tdClass}>
                  <div className="flex justify-center">
                    <AccessBadge label="China" hasAccess={row.passport_power.access_to_china} />
                  </div>
                </td>
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-gray-500 font-medium">
                  No passport data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
