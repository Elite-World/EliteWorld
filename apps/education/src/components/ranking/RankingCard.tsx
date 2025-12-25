import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, MapPin } from 'lucide-react';
import { UniversityRanking, cn } from '@repo/web-shared';
import { Building2 } from 'lucide-react';

interface RankingCardProps {
  university: UniversityRanking;
  index: number;
  onClick: (university: UniversityRanking) => void;
  selectedSource?: string;
  onRankClick?: (source: string) => void;
  hideFooterRanks?: boolean;
}

const RankingCard: React.FC<RankingCardProps> = ({
  university,
  index,
  onClick,
  selectedSource = 'qs',
  onRankClick,
  hideFooterRanks = false,
}) => {
  const logoUrl = university.logoUrl;
  // Determine rank to display
  const displayRank =
    selectedSource && university.ranks && university.ranks[selectedSource]
      ? university.ranks[selectedSource]
      : university.rank;

  // Resolve logo... (omitted comments)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.01 }}
      onClick={() => onClick(university)}
      className="group relative flex flex-col p-6 bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Decorative Gradient Blob on Hover */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row: Rank & Logo */}
        <div className="flex justify-between items-start mb-4">
          <div
            className={cn(
              'flex items-center justify-center w-14 h-14 rounded-xl text-2xl font-bold border transition-colors',
              displayRank === 1
                ? 'bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-900/30'
                : (displayRank as number) <= 10
                ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30'
                : 'bg-gray-50 text-gray-500 border-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700'
            )}
          >
            {displayRank}
          </div>

          {/* Logo Display */}
          <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 p-1 overflow-hidden shrink-0">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={university.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  (
                    e.target as HTMLImageElement
                  ).nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : (
              <Building2 className="w-6 h-6 text-gray-300 dark:text-gray-600" />
            )}
            {/* Fallback Icon (Hidden by default if logo exists) */}
            <Building2
              className={cn(
                'w-6 h-6 text-gray-300 dark:text-gray-600',
                logoUrl ? 'hidden' : ''
              )}
            />
          </div>
        </div>

        {/* Center: Info */}
        <div className="flex-1 mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {university.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            {university.country}
          </div>

          {/* Tags Preview */}
          {university.badges && university.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {university.badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 text-[10px] font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 rounded-md"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {/* Multiple Rankings Display */}
          {university.ranks && !hideFooterRanks && (
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
              {Object.entries(university.ranks)
                .filter(([source]) => source !== selectedSource) // ifSelected, dont show
                .map(([source, rank]) => {
                  // Map source codes to display names
                  const sourceNames: Record<string, string> = {
                    qs: 'QS',
                    the: 'THE',
                    usnews: 'US News',
                    arwu: 'ARWU',
                    cwur: 'CWUR',
                    guardian: 'Guardian',
                    cug: 'CUG',
                    niche: 'Niche',
                    wrwu: 'WRWU',
                    rk: 'SoftScience', // 软科
                    edur: 'EduR', // 易度
                    urap: 'URAP',
                    wm: 'WM',
                    fb: 'Forbes',
                  };
                  const displayName =
                    sourceNames[source.toLowerCase()] || source.toUpperCase();

                  const isSelected = selectedSource === source;

                  return (
                    <button
                      key={source}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRankClick?.(source);
                      }}
                      className={cn(
                        'flex flex-col items-center p-1.5 rounded-lg transition-all border',
                        isSelected
                          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 ring-1 ring-blue-500/20'
                          : 'bg-gray-50 border-transparent dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-700 hover:border-gray-200 dark:hover:border-zinc-700'
                      )}
                    >
                      <span
                        className={cn(
                          'text-[10px] font-semibold uppercase mb-0.5',
                          isSelected
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-400'
                        )}
                      >
                        {displayName}
                      </span>
                      <span
                        className={cn(
                          'text-sm font-bold',
                          isSelected
                            ? 'text-blue-700 dark:text-blue-300'
                            : 'text-gray-900 dark:text-white'
                        )}
                      >
                        {rank}
                      </span>
                    </button>
                  );
                })
                .slice(0, 6)}{' '}
              {/* Show up to 6 rankings to avoid clutter */}
            </div>
          )}
        </div>

        {/* Bottom: Action */}
        <div className="mt-auto border-t border-gray-100 dark:border-zinc-800 pt-4 flex justify-between items-center group-hover:border-transparent transition-colors">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            View Details
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RankingCard;
