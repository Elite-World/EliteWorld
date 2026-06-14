'use client';;
import { cn } from '@repo/domain';
import Link from 'next/link';
import { getHomeSolutions } from '@repo/apps-config/immigration/home-config';

export default function SolutionsSection({
  isZh,
}: {
  isZh: boolean;
}) {
  return (
    <section className="py-24 bg-white dark:bg-[#111]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-in fade-in duration-500">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
            {isZh ? '按目标' : 'Pathways by'}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              {isZh ? '规划路径' : 'Goal'}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '选择您的主要目标，探索为您量身定制的移民和财富结构策略。'
              : 'Select your primary objective to explore tailored immigration and wealth structuring strategies.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getHomeSolutions(isZh).map((pathway, index) => {
            const Icon = pathway.icon;
            return (
              <div key={index} className="animate-in fade-in duration-500">
                <Link
                  href={pathway.href}
                  className={cn(
                    'group block bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 transition-colors h-full',
                    pathway.hoverClass,
                  )}
                >
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform',
                      pathway.colorClass,
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {pathway.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pathway.description}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
