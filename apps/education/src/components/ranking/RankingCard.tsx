import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, MapPin } from 'lucide-react';
import { UniversityRanking, cn } from '@repo/web-shared';

interface RankingCardProps {
  university: UniversityRanking;
  index: number;
}

const RankingCard: React.FC<RankingCardProps> = ({ university, index }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-white border-yellow-500';
    if (rank === 2) return 'bg-gray-300 text-gray-800 border-gray-300';
    if (rank === 3) return 'bg-amber-600 text-white border-amber-600';
    if (rank <= 10)
      return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800';
    return 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-zinc-800/50 dark:text-zinc-400 dark:border-zinc-700';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group relative flex flex-col md:flex-row items-start md:items-center p-4 gap-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Absolute Rank Badge for Mobile/Desktop */}
      <div
        className={cn(
          'absolute -top-3 left-4 md:static md:top-auto md:left-auto flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border-2 font-bold text-sm md:text-lg shadow-sm z-10',
          getRankColor(university.rank)
        )}
      >
        {university.rank}
      </div>

      {/* Content */}
      <div className="flex-1 w-full pt-3 md:pt-0 pl-1 md:pl-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {university.name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{university.country}</span>
            </div>

            {university.description && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 line-clamp-1 md:line-clamp-none hidden md:block">
                {university.description}
              </p>
            )}

            {/* Badges - Mobile sensitive */}
            {university.badges && university.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {university.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-2 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300 rounded-full border border-blue-100 dark:border-blue-900/30"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-1 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50 dark:border-zinc-800 w-full md:w-auto">
            {/* Score */}
            <div className="flex items-center gap-1.5">
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                Overall
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {university.overallScore}
              </div>
            </div>

            {/* Subject Ranks Preview - Only if relevant */}
            {university.subjects &&
              university.subjects.slice(0, 2).map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center gap-1 text-xs text-gray-500"
                >
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span className="truncate max-w-[100px]">{sub.name}:</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    #{sub.rank}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RankingCard;
