'use client';;
import { cn } from '@repo/domain';
import Image from 'next/image';
import Link from 'next/link';
import { Trophy, MapPin, ArrowRight } from 'lucide-react';
import { topUniversitiesShowcase } from '@repo/apps-config/content/education/home-content';

export default function TopUniversitiesSection({
  isZh,
  isDark,
}: {
  isZh: boolean;
  isDark: boolean;
}) {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-in fade-in duration-500">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {isZh ? '全球精英' : 'Global Elite'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {isZh ? '顶尖排名' : 'Top Ranked'} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '学府' : 'Institutions'}
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 max-w-2xl">
              {isZh
                ? '探索全球最负盛名的学术机构，基于研究卓越性、全球声誉和毕业生就业结果进行评估。'
                : "Discover the world's most prestigious academic institutions, evaluated on research excellence, global reputation, and graduate outcomes."}
            </p>
          </div>
          <Link
            href="/ranking"
            className={cn(
              'group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0',
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-white border border-gray-100 hover:border-blue-500/30 text-gray-900 shadow-sm',
            )}
          >
            {isZh ? '查看完整排名' : 'View Full Rankings'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {topUniversitiesShowcase.map((uni, idx) => (
            <div key={idx} className="h-full animate-in fade-in duration-500">
              <Link
                href={`/universities/${uni.country.toLowerCase().replace(/ /g, '-')}/${uni.name.toLowerCase().replace(/ /g, '-')}`}
                className="group relative flex flex-col h-full rounded-[2.5rem] overflow-hidden bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative h-56 shrink-0 w-full overflow-hidden">
                  <Image
                    src={uni.image}
                    alt={uni.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent" />
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <span className="text-white font-black text-sm">
                      #{uni.rank}
                    </span>
                  </div>
                </div>
                <div className="p-8 relative flex-1 flex flex-col">
                  <div className="absolute -top-12 right-8 w-20 h-20 bg-white dark:bg-[#0a0a0a] rounded-3xl p-3 shadow-xl border border-gray-100 dark:border-white/10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                    <Image
                      src={uni.logo}
                      alt="Logo"
                      width={60}
                      height={60}
                      className="object-contain transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center gap-2 mb-4 mt-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                      {isZh
                        ? uni.country === 'USA'
                          ? '美国'
                          : uni.country === 'United Kingdom'
                            ? '英国'
                            : uni.country
                        : uni.country}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 line-clamp-2 leading-tight">
                    {isZh
                      ? uni.name ===
                        'Massachusetts Institute of Technology (MIT)'
                        ? '麻省理工学院 (MIT)'
                        : uni.name === 'Imperial College London'
                          ? '伦敦帝国学院'
                          : uni.name === 'University of Oxford'
                            ? '牛津大学'
                            : uni.name
                      : uni.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        {isZh ? '得分' : 'Score'} {uni.score}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
