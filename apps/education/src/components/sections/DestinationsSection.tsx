'use client';;
import { cn } from '@repo/domain';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight, Building2 } from 'lucide-react';

export default function DestinationsSection({
  isZh,
  isDark,
}: {
  isZh: boolean;
  isDark: boolean;
}) {
  return (
    <section className="py-32 bg-white dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-in fade-in duration-500">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {isZh ? '全球布局' : 'Global Access'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {isZh ? '按' : 'Explore by'} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '目的地探索' : 'Destination'}
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 max-w-2xl">
              {isZh
                ? '在全球领先的教育中心找到您完美的学术家园。'
                : "Find your perfect academic home in the world's leading educational hubs."}
            </p>
          </div>
          <Link
            href="/destinations"
            className={cn(
              'group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shrink-0',
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-white border border-gray-100 hover:border-blue-500/30 text-gray-900 shadow-sm',
            )}
          >
            {isZh ? '查看所有目的地' : 'View All Destinations'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          {/* Main Feature - USA */}
          <div className="md:col-span-8 h-full animate-in fade-in duration-500">
            <Link
              href="/destinations/usa"
              className="group relative block rounded-[3rem] overflow-hidden min-h-[400px] h-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=1200"
                alt="Study in USA"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 border border-white/20 group-hover:scale-110 transition-transform duration-500">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                  {isZh ? '美国' : 'United States'}
                </h3>
                <p className="text-base font-medium text-gray-300 max-w-md mb-8 leading-relaxed">
                  {isZh
                    ? '常春藤盟校和全球最具创新力研究机构的所在地。'
                    : "Home to the Ivy League and the world's most innovative research institutions."}
                </p>
                <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 group-hover:text-blue-300 transition-colors">
                  {isZh ? '探索 50+ 所院校' : 'Explore 50+ Institutions'}{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Secondary - UK */}
            <div className="flex-1 animate-in fade-in duration-500">
              <Link
                href="/destinations/uk"
                className="group relative block rounded-[3rem] overflow-hidden min-h-[280px] h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600"
                  alt="Study in UK"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-1"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                    {isZh ? '英国' : 'United Kingdom'}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 group-hover:text-blue-300 transition-colors">
                    {isZh ? '探索' : 'Explore'}{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Secondary - Australia */}
            <div className="flex-1 animate-in fade-in duration-500">
              <Link
                href="/destinations/australia"
                className="group relative block rounded-[3rem] overflow-hidden min-h-[280px] h-full"
              >
                <Image
                  src="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=600"
                  alt="Study in Australia"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                    {isZh ? '澳大利亚' : 'Australia'}
                  </h3>
                  <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 group-hover:text-blue-300 transition-colors">
                    {isZh ? '探索' : 'Explore'}{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
