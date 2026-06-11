import React from 'react';
import { HeroSection } from '@repo/ui';
import { getPassportIndex } from '@repo/domain/services/jurisdiction-service';
import { PassportLeaderboard } from '@/components/intelligence/PassportLeaderboard';

export const revalidate = 3600;

export const metadata = {
  title: 'Global Passport Index 2026 | EliteWorld Immigration',
  description: 'The authoritative ranking of global passports based on visa-free mobility and strategic global access.',
};

export default async function PassportIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await getPassportIndex();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <HeroSection 
        title={locale === 'zh' ? "全球护照指数" : "Global Passport Index"}
        subtitle={locale === 'zh' ? "基于免签流动性和对关键全球经济中心的战略准入的权威全球护照排名。" : "The authoritative ranking of global passports based on visa-free mobility and strategic access to key global economic hubs."}
        backgroundImage="https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&q=80&w=2400"
        mode="page"
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                {locale === 'zh' ? '官方' : 'Official'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{locale === 'zh' ? '排名' : 'Rankings'}</span>
              </h2>
              <div className="w-16 h-1 bg-linear-to-r from-blue-600 to-purple-600 mt-4" />
            </div>
            
            <p className="text-sm font-medium text-gray-500 max-w-md md:text-right">
              {locale === 'zh' ? '评分基于绝对的免签目的地数量，并对战略准入区域（美国、英国、申根、中国）赋予特殊权重。' : 'Scores are calculated based on absolute visa-free destinations, with special weight given to strategic access zones (US, UK, Schengen, China).'}
            </p>
          </div>

          <PassportLeaderboard data={data} locale={locale} />

        </div>

        {/* Ambient Effects */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}
