'use client';;
import { cn } from '@repo/domain';
import Image from 'next/image';
import Link from 'next/link';
import { Globe2, ArrowRight } from 'lucide-react';

export default function DestinationsSection({
  isZh,
  isDark,
  destinationsList,
}: {
  isZh: boolean;
  isDark: boolean;
  destinationsList: any[];
}) {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48 transform-gpu will-change-transform" />
      <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -ml-48 -mb-48 transform-gpu will-change-transform" />
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-in fade-in duration-500">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {isZh ? '全球流动' : 'Global Mobility'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {isZh ? '首选' : 'Premium'}
              {/* <br /> */}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '目的地' : ' Destinations'}
              </span>
            </h2>
          </div>
          <Link
            href="/destinations"
            className={cn(
              'group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition',
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                : 'bg-black/5 hover:bg-black/10 text-black border border-black/10',
            )}
          >
            {isZh ? '探索所有项目' : 'Explore All Programs'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinationsList.map((dest, idx) => {
            const cardContent = (
              <div
                className={cn(
                  'group relative overflow-hidden rounded-3xl aspect-4/5 cursor-pointer border border-white/10 h-full w-full',
                )}>
                <Image
                  src={dest.image}
                  alt={dest.country}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                      {dest.country}
                    </h3>
                    <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">
                      {dest.program}
                    </p>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex gap-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex-1">
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                          {isZh ? '时间范围' : 'Timeframe'}
                        </p>
                        <p className="text-xs text-white font-bold">
                          {dest.timeframe}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex-1">
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                          {isZh ? '投资金额' : 'Investment'}
                        </p>
                        <p className="text-xs text-white font-bold">
                          {dest.investment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (dest.slug) {
              return (
                <Link key={idx} href={`/destinations/${dest.slug}`} className="block h-full">
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={idx} className="h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
