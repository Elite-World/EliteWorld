'use client';;
import { Sparkles } from 'lucide-react';
import { getHomeStats } from '@repo/apps-config/landing/home-config';

export default function AchievementsSection({ isZh }: { isZh: boolean }) {
  return (
    <section
      id="about"
      className="py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-24 animate-in fade-in duration-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6">
            <Sparkles className="w-3 h-3 text-blue-600" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-blue-600">
              {isZh ? '卓越机构' : 'Institutional Excellence'}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
            {isZh ? '我们的全球' : 'Our Global '}{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              {isZh ? '影响力' : 'Influence'}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-bold uppercase tracking-widest max-w-lg mx-auto">
            {isZh
              ? '为您搭建国际学术过渡与定居的黄金标准。'
              : 'Setting the gold standard for international academic transition and settlement.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {getHomeStats(isZh).map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-[2.5rem] hover:bg-gray-50 dark:hover:bg-white/8 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition duration-500 overflow-hidden shadow-xl dark:shadow-none animate-in fade-in">
              <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[60px] -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity transform-gpu will-change-transform" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
                  {stat.number}
                </div>
                <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">
                  {stat.label}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-xs font-medium leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
