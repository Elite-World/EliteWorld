'use client';;
import { cn } from '@repo/domain';
import { getHomeStats } from '@repo/apps-config/immigration/home-config';

export default function AchievementsSection({
  isZh,
  isDark,
}: {
  isZh: boolean;
  isDark: boolean;
}) {
  return (
    <section
      id="about"
      className="py-24 bg-linear-to-b from-transparent to-gray-50 dark:to-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="animate-in fade-in duration-500">
          <h2
            className={cn(
              'text-4xl font-bold text-center mb-16',
              'bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
            )}
          >
            {isZh ? '我们的全球影响力' : 'Our Global Impact'}
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {getHomeStats(isZh).map((stat, index) => (
            <div
              key={index}
              className={cn(
                'text-center p-8 rounded-2xl transition-all duration-300 border',
                'hover:transform hover:-translate-y-1',
                isDark
                  ? 'bg-[#1A1A1A] hover:bg-[#222] border-white/5 hover:border-white/10'
                  : 'bg-white hover:bg-white border-gray-100 shadow-sm hover:shadow-xl',
              )}>
              <div className="text-4xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p
                className={cn(
                  'text-sm',
                  isDark ? 'text-gray-400' : 'text-gray-600',
                )}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
