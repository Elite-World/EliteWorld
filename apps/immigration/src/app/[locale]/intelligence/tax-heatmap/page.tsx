import React from 'react';
import { HeroSection } from '@repo/ui';
import { getTaxHeatmapData } from '@repo/domain/services/jurisdiction-service';
import { TaxHeatmapTable } from '@/components/intelligence/TaxHeatmapTable';

export const revalidate = 3600;

export const metadata = {
  title: 'Global Tax Heatmap 2026 | EliteWorld Immigration',
  description: 'Compare corporate and personal tax burdens across elite global jurisdictions.',
};

export default async function TaxHeatmapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const data = await getTaxHeatmapData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <HeroSection 
        title={locale === 'zh' ? '全球税务热力图' : 'Global Tax Heatmap'}
        subtitle={locale === 'zh' ? '可视化并比较各精英司法管辖区的税务负担。为您的财富结构找到最佳的战略环境。' : 'Visualize and compare the tax burdens of elite jurisdictions. Find the optimal strategic environment for your wealth structuring.'}
        backgroundImage="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2400"
        mode="page"
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                {locale === 'zh' ? '税务' : 'Tax'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{locale === 'zh' ? '概况' : 'Landscape'}</span>
              </h2>
              <div className="w-16 h-1 bg-linear-to-r from-blue-600 to-purple-600 mt-4" />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> {locale === 'zh' ? '优惠 (0-10%)' : 'Favorable (0-10%)'}</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> {locale === 'zh' ? '适中 (11-20%)' : 'Moderate (11-20%)'}</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500"></div> {locale === 'zh' ? '较高 (21-30%)' : 'High (21-30%)'}</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> {locale === 'zh' ? '限制性 (31%+)' : 'Restrictive (31%+)'}</span>
            </div>
          </div>

          <TaxHeatmapTable data={data} locale={locale} />

        </div>

        {/* Ambient Effects */}
        <div className="hidden md:block absolute top-0 left-0 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2 transform-gpu will-change-transform" />
        <div className="hidden md:block absolute bottom-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2 transform-gpu will-change-transform" />
      </section>
    </div>
  );
}
