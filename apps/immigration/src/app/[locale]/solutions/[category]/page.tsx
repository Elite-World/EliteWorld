import React from 'react';
import { notFound } from 'next/navigation';
import { HeroSection } from '@repo/ui';
import { getSolutionsByCategory } from '@repo/domain/services/jurisdiction-service';
import { SolutionsGrid } from '@/components/solutions/SolutionsGrid';
import { SOLUTION_CATEGORIES } from '@repo/apps-config/content/immigration/solutions-content';


interface CategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

const getCategoryMeta = (category: string, locale: string) => {
  const isZh = locale === 'zh';
  const found = SOLUTION_CATEGORIES.find((c) => c.id === category);
  if (!found) return null;
  return {
    title: isZh ? found.title.zh : found.title.en,
    subtitle: isZh ? found.subtitle.zh : found.subtitle.en,
    img: found.img,
  };
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
