import React from 'react';
import { notFound } from 'next/navigation';
import { HeroSection } from '@repo/ui';
import { getSolutionsByCategory } from '@repo/domain/services/jurisdiction-service';
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid';

interface CategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

const getCategoryMeta = (category: string, locale: string) => {
  const isZh = locale === 'zh';
  const meta: Record<string, { title: string, subtitle: string, img: string }> = {
    'residency': {
      title: isZh ? '居留权与绿卡' : 'Residency & Green Cards',
      subtitle: isZh ? '全球范围内的黄金签证和精英投资居留项目比较。' : 'Compare Golden Visas and elite residency by investment programs globally.',
      img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=2400'
    },
    'citizenship': {
      title: isZh ? '第二国籍' : 'Second Citizenship',
      subtitle: isZh ? '直接投资入籍（CBI）项目，实现终极全球流动性。' : 'Direct Citizenship by Investment (CBI) programs for ultimate global mobility.',
      img: 'https://images.unsplash.com/photo-1544015759-223f66a70717?auto=format&fit=crop&q=80&w=2400'
    },
    'long-term-status': {
      title: isZh ? '长期身份' : 'Long-Term Status',
      subtitle: isZh ? '为数字游民、企业家和退休人员提供的战略性长期签证。' : 'Strategic long-term visas for digital nomads, entrepreneurs, and retirees.',
      img: 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&q=80&w=2400'
    },
    'wealth-structuring': {
      title: isZh ? '财富规划' : 'Wealth Structuring',
      subtitle: isZh ? '企业设立、税务优化和离岸银行业务解决方案。' : 'Corporate formation, tax optimization, and offshore banking solutions.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400'
    }
  };
  return meta[category];
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category, locale } = await params;
  const meta = getCategoryMeta(category, locale);
  
  if (!meta) return { title: locale === 'zh' ? '未找到' : 'Not Found' };
  
  return {
    title: `${meta.title} | EliteWorld Immigration`,
    description: meta.subtitle,
  };
}

export default async function SolutionsCategoryPage({ params }: CategoryPageProps) {
  const { category, locale } = await params;
  const meta = getCategoryMeta(category, locale);

  if (!meta) {
    notFound();
  }

  // Fetch dynamic data from MongoDB
  const solutions = await getSolutionsByCategory(category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <HeroSection 
        title={meta.title}
        subtitle={meta.subtitle}
        backgroundImage={meta.img}
        mode="page"
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {locale === 'zh' ? '热门' : 'Active'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{locale === 'zh' ? '项目' : 'Pathways'}</span>
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-blue-600 to-purple-600 mt-4" />
          </div>

          {solutions && solutions.length > 0 ? (
            <SolutionsGrid solutions={solutions} locale={locale} />
           ) : (
             <div className="p-12 border border-dashed border-gray-300 dark:border-white/20 rounded-3xl text-center max-w-2xl mx-auto">
               <p className="text-gray-500 dark:text-gray-400 font-medium">
                 {locale === 'zh' ? '该类别暂无发布项目，请稍后再试。' : 'No active solutions published for this category yet. Check back soon.'}
               </p>
             </div>
          )}

        </div>

        {/* Ambient Effects */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}
