'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ICountry } from '@repo/domain';
import { ArrowRight, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@repo/domain';

interface TaxData {
  country: ICountry;
  tax_profile: {
    corporate_tax: string;
    corporate_tax_score: number | null;
    personal_tax: string;
    personal_tax_score: number | null;
    capital_gains: string;
    capital_gains_score: number | null;
    crypto_tax?: string;
    crypto_tax_score: number | null;
  };
}

interface TaxHeatmapTableProps {
  data: TaxData[];
}

type SortKey = keyof TaxData['tax_profile'] | 'country';
type SortDirection = 'asc' | 'desc';

// Determines cell styling based on tax percentage score
function getHeatmapStyles(score: number | null): string {
  if (score === null) return 'bg-gray-100 dark:bg-zinc-900/50 text-gray-500';
  
  if (score === 0) return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold';
  if (score <= 10) return 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-300 font-bold';
  if (score <= 20) return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 font-bold';
  if (score <= 30) return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 font-bold';
  return 'bg-red-500/10 text-red-700 dark:text-red-400 font-bold';
}

function HeatmapCell({ value, score }: { value?: string; score: number | null }) {
  const styles = getHeatmapStyles(score);
  
  return (
    <td className={cn("py-6 px-8 text-center border-r border-gray-100 dark:border-white/5 last:border-r-0 transition-colors", styles)}>
      {value || '-'}
    </td>
  );
}

export function TaxHeatmapTable({ data }: TaxHeatmapTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('corporate_tax_score');
  const [sortDir, setSortDir] = useState<SortDirection>('asc');

  const sortedData = [...data].sort((a, b) => {
    let valA: any = null;
    let valB: any = null;
    
    if (sortKey === 'country') {
      valA = a.country.name.en;
      valB = b.country.name.en;
    } else {
      valA = a.tax_profile[sortKey as keyof typeof a.tax_profile];
      valB = b.tax_profile[sortKey as keyof typeof b.tax_profile];
    }
    
    // Push nulls to bottom
    if (valA === null) valA = 999;
    if (valB === null) valB = 999;
    
    if (valA < valB) return sortDir === 'asc' ? -1 : 1;
    if (valA > valB) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="w-3 h-3 opacity-30 group-hover/th:opacity-100 transition-opacity" />;
    return sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;
  };

  const thClass = "py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest border-r border-gray-200 dark:border-white/10 cursor-pointer select-none group/th hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors";

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-white/10">
              <th onClick={() => handleSort('country')} className={cn(thClass, "min-w-[150px] md:min-w-[200px] sticky left-0 bg-gray-50 dark:bg-zinc-900 z-20 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)]")}>
                <div className="flex items-center gap-2">Jurisdiction <SortIcon columnKey="country" /></div>
              </th>
              <th onClick={() => handleSort('corporate_tax_score')} className={thClass}>
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">Corporate Tax <SortIcon columnKey="corporate_tax_score" /></div>
              </th>
              <th onClick={() => handleSort('personal_tax_score')} className={thClass}>
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">Personal Tax <SortIcon columnKey="personal_tax_score" /></div>
              </th>
              <th onClick={() => handleSort('capital_gains_score')} className={thClass}>
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">Capital Gains <SortIcon columnKey="capital_gains_score" /></div>
              </th>
              <th onClick={() => handleSort('crypto_tax_score')} className={thClass}>
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">Crypto Tax <SortIcon columnKey="crypto_tax_score" /></div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {sortedData.map((row) => (
              <tr key={row.country.slug} className="group hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                
                <td className="py-6 px-6 md:px-8 border-r border-gray-100 dark:border-white/5 sticky left-0 bg-white dark:bg-[#111] group-hover:bg-gray-50 dark:group-hover:bg-zinc-900/50 z-10 shadow-[4px_0_12px_-4px_rgba(0,0,0,0.1)] transition-colors">
                  <Link href={`/destinations/${row.country.slug}`} className="text-lg md:text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight block w-full whitespace-nowrap">
                    {row.country.name.en}
                  </Link>
                </td>
                
                <HeatmapCell value={row.tax_profile.corporate_tax} score={row.tax_profile.corporate_tax_score} />
                <HeatmapCell value={row.tax_profile.personal_tax} score={row.tax_profile.personal_tax_score} />
                <HeatmapCell value={row.tax_profile.capital_gains} score={row.tax_profile.capital_gains_score} />
                
                <HeatmapCell 
                  value={row.tax_profile.crypto_tax} 
                  score={row.tax_profile.crypto_tax_score} 
                />
                
              </tr>
            ))}
            
            {sortedData.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-gray-500 font-medium">
                  No tax data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
