'use client';

import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import { CountryFlag } from './CountryFlag';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export interface PopulatedSolution {
  _id: string | any;
  category:
    | 'residency'
    | 'citizenship'
    | 'long_term_visa'
    | 'corporate'
    | string;
  name: { en: string; cn?: string };
  requirements?: {
    investment_amount?: string;
    timeframe?: string;
    physical_presence?: string;
  };
  description?: string;
  country_id: {
    _id: string | any;
    name: { en: string; cn?: string };
    slug: string;
    region?: string;
    flag?: string;
    code?: string;
  };
}

interface SolutionCardProps {
  solution: PopulatedSolution;
  mode?: 'explore' | 'compare';
  isSelected?: boolean;
  onSelectToggle?: (solution: PopulatedSolution) => void;
  className?: string;
  locale: string;
}

export function SolutionCard({
  solution,
  mode = 'explore',
  isSelected = false,
  onSelectToggle,
  className,
  locale,
}: SolutionCardProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const dbLocale = locale === 'zh' ? 'cn' : 'en';
  // @ts-ignore
  const cName = solution.country_id?.translations?.[dbLocale]?.name || solution.country_id?.name?.[dbLocale] || solution.country_id?.name?.en || 'Unknown';
  // @ts-ignore
  const sNameRaw = solution.translations?.[dbLocale]?.name || solution.name;
  const sName = typeof sNameRaw === 'string' ? sNameRaw : (sNameRaw?.[dbLocale] || sNameRaw?.en || 'Unknown');
  // @ts-ignore
  const sDescRaw = solution.translations?.[dbLocale]?.description || solution.description;
  const sDesc = typeof sDescRaw === 'string' ? sDescRaw : (sDescRaw?.[dbLocale] || sDescRaw?.en || '');
  // @ts-ignore
  const sReq = solution.translations?.[dbLocale]?.requirements || solution.requirements || {};

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'residency':
        return 'Residency';
      case 'citizenship':
        return 'Citizenship';
      case 'long_term_visa':
        return 'Long-Term Visa';
      case 'corporate':
        return 'Corporate Setup';
      default:
        return 'Solution';
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    if (mode === 'compare' && onSelectToggle) {
      e.preventDefault(); // Prevent navigating if wrapped in a link
      onSelectToggle(solution);
    }
  };

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[2.5rem] border transition-all h-full flex flex-col',
        isDark
          ? 'bg-white/5 border-white/10 hover:border-white/20'
          : 'bg-white border-gray-100 hover:border-gray-200',
        isSelected &&
          (isDark
            ? 'ring-2 ring-blue-500 border-transparent bg-white/10'
            : 'ring-2 ring-blue-600 border-transparent bg-blue-50/30'),
        mode === 'explore'
          ? 'hover:shadow-2xl hover:-translate-y-1'
          : 'hover:shadow-2xl',
        className,
      )}
    >
      {/* Background Glows */}
      {isDark && (
        <>
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/20 transition-colors duration-500" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500" />
        </>
      )}
      <div className="p-6 md:p-8 grow flex flex-col relative z-10">
        {/* Header: Country + Badges */}
        <div className="flex justify-between items-start mb-8">
          <Link
            href={`/destinations/${solution.country_id?.slug}`}
            className="flex items-center gap-4 group/country"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 dark:bg-zinc-800 shrink-0 border border-black/5 dark:border-white/5 shadow-inner relative">
              <CountryFlag
                countrySlug={solution.country_id?.slug}
                countryCode={solution.country_id?.code}
                countryName={solution.country_id?.name?.en}
                fallbackUrl={solution.country_id?.flag}
              />
            </div>
            <div>
              <h3
                className={cn(
                  'text-xl font-bold transition-colors',
                  isDark
                    ? 'text-white group-hover/country:text-blue-400'
                    : 'text-gray-900 group-hover/country:text-blue-600',
                )}
              >
                {cName}
              </h3>
              <p
                className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-gray-400' : 'text-gray-500',
                )}
              >
                {solution.country_id?.region || 'Global'}
              </p>
            </div>
          </Link>

          <div
            className={cn(
              'px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border',
              solution.category === 'citizenship'
                ? isDark
                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                  : 'bg-purple-50 text-purple-600 border-purple-100'
                : solution.category === 'residency'
                  ? isDark
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-blue-50 text-blue-600 border-blue-100'
                  : solution.category === 'corporate'
                    ? isDark
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    : isDark
                      ? 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      : 'bg-orange-50 text-orange-600 border-orange-100',
            )}
          >
            {getCategoryLabel(solution.category)}
          </div>
        </div>

        {/* Solution Title & Description */}
        <div className="mb-8 grow">
          <h4
            className={cn(
              'text-2xl font-black mb-3',
              isDark ? 'text-gray-100' : 'text-gray-900',
            )}
          >
            {sName}
          </h4>
          {sDesc && (
            <p
              className={cn(
                'text-sm leading-relaxed line-clamp-3',
                isDark ? 'text-gray-400' : 'text-gray-600',
              )}
            >
              {sDesc}
            </p>
          )}
        </div>

        {/* Requirements Grid */}
        <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-white/2 border border-gray-100 dark:border-white/5 mt-auto">
          <div>
            <p
              className={cn(
                'text-[10px] font-bold uppercase tracking-widest mb-1.5',
                isDark ? 'text-gray-500' : 'text-gray-400',
              )}
            >
              Investment
            </p>
            <p
              className={cn(
                'text-sm font-semibold',
                isDark ? 'text-gray-200' : 'text-gray-800',
              )}
            >
              {sReq.investment_amount || 'N/A'}
            </p>
          </div>
          <div>
            <p
              className={cn(
                'text-[10px] font-bold uppercase tracking-widest mb-1.5',
                isDark ? 'text-gray-500' : 'text-gray-400',
              )}
            >
              Timeframe
            </p>
            <p
              className={cn(
                'text-sm font-semibold',
                isDark ? 'text-gray-200' : 'text-gray-800',
              )}
            >
              {sReq.timeframe || 'N/A'}
            </p>
          </div>
          <div>
            <p
              className={cn(
                'text-[10px] font-bold uppercase tracking-widest mb-1.5',
                isDark ? 'text-gray-500' : 'text-gray-400',
              )}
            >
              Presence
            </p>
            <p
              className={cn(
                'text-sm font-semibold',
                isDark ? 'text-gray-200' : 'text-gray-800',
              )}
            >
              {sReq.physical_presence || 'None'}
            </p>
          </div>
        </div>

        {mode === 'explore' && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 relative z-10">
            <Link
              href={`/programs/${(solution.name?.en || sName)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')}-${solution._id}`}
              className={cn(
                'w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors',
                isDark
                  ? 'bg-white/5 text-white hover:bg-blue-600'
                  : 'bg-gray-50 text-gray-900 hover:bg-blue-600 hover:text-white',
              )}
            >
              View Program Details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {mode === 'compare' && (
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/10 relative z-10">
            <button
              onClick={handleToggle}
              className={cn(
                'w-full py-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all',
                isSelected
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : isDark
                    ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              {isSelected ? (
                <>
                  <Check className="w-4 h-4" /> Added to Compare
                </>
              ) : (
                'Add to Compare'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
