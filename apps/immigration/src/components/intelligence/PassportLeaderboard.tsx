'use client';

import React from 'react';
import Link from 'next/link';
import { ICountry } from '@repo/domain';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@repo/domain';

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
}

function AccessBadge({ label, hasAccess }: { label: string, hasAccess?: boolean }) {
  if (hasAccess === undefined) return null;
  
  return (
    <div className="flex flex-col items-center gap-1 group/badge relative">
      {hasAccess ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500/50" />
      )}
      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest absolute -bottom-5 opacity-0 group-hover/badge:opacity-100 transition-opacity">
        {label}
      </span>
    </div>
  );
}

export function PassportLeaderboard({ data }: PassportLeaderboardProps) {
  return (
    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-white/10">
              <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Rank</th>
              <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest min-w-[200px]">Jurisdiction</th>
              <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Visa-Free Score</th>
              <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">US Access</th>
              <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">UK Access</th>
              <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">Schengen</th>
              <th className="py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-center whitespace-nowrap">China</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {data.map((row) => (
              <tr key={row.country.slug} className="group hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors">
                <td className="py-6 px-8">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white font-black text-sm">
                    {row.rank}
                  </div>
                </td>
                <td className="py-6 px-8">
                  <Link href={`/destinations/${row.country.slug}`} className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight block w-full">
                    {row.country.name.en}
                  </Link>
                </td>
                <td className="py-6 px-8">
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                    {row.passport_power.visa_free_score}
                  </span>
                </td>
                <td className="py-6 px-8">
                  <div className="flex justify-center">
                    <AccessBadge label="US" hasAccess={row.passport_power.access_to_us} />
                  </div>
                </td>
                <td className="py-6 px-8">
                  <div className="flex justify-center">
                    <AccessBadge label="UK" hasAccess={row.passport_power.access_to_uk} />
                  </div>
                </td>
                <td className="py-6 px-8">
                  <div className="flex justify-center">
                    <AccessBadge label="Schengen" hasAccess={row.passport_power.access_to_schengen} />
                  </div>
                </td>
                <td className="py-6 px-8">
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
