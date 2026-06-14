import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@repo/domain/lib/mongoose';
import { MobilitySolution } from '@repo/domain/data/models';

import { getProviderForSection } from '@/lib/services/content';
import { DevOnlyBlock } from '@repo/domain';
import Link from 'next/link';
import { Clock, MapPin, Landmark } from 'lucide-react';
import Image from 'next/image';

interface ProgramPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export default async function ProgramProfilePage({ params }: ProgramPageProps) {
  const { locale, slug } = await params;
  
  // Extract MongoDB ID from the end of the slug (24 hex characters)
  const idMatch = slug.match(/[a-f0-9]{24}$/i);
  if (!idMatch) {
    console.log('[DEBUG] No ID matched in slug:', slug);
    notFound();
  }
  const id = idMatch[0];
  console.log('[DEBUG] Extracted ID:', id);
  
  await dbConnect();
  
  let solution: any = null;
  try {
    solution = await MobilitySolution.findById(id).populate('country_id');
    console.log('[DEBUG] Solution fetched:', !!solution);
  } catch (e) {
    console.error('[DEBUG] DB fetch error:', e);
    // Invalid ObjectId format
    notFound();
  }

  if (!solution || !solution.country_id) {
    console.log('[DEBUG] Solution or country_id missing:', solution);
    notFound();
  }

  const country = solution.country_id;
  const dbLocale = locale === 'zh' ? 'cn' : 'en';
  // @ts-ignore
  const countryName = country.translations?.[dbLocale]?.name || country.name?.[dbLocale] || country.name?.en || 'Unknown';
  // @ts-ignore
  const solNameRaw = solution.translations?.[dbLocale]?.name || solution.name;
  const solName = typeof solNameRaw === 'string' ? solNameRaw : (solNameRaw?.[dbLocale] || solNameRaw?.en || 'Unknown');
  // @ts-ignore
  const solDescRaw = solution.translations?.[dbLocale]?.description || solution.description;
  const solDesc = typeof solDescRaw === 'string' ? solDescRaw : (solDescRaw?.[dbLocale] || solDescRaw?.en || '');
  // @ts-ignore
  const solReq = solution.translations?.[dbLocale]?.requirements || solution.requirements || {};

  // Fetch Notion News related to this solution ID
  const provider = getProviderForSection('insights', locale);
  let relatedNews: any[] = [];
  
  if (provider) {
    try {
      const allArticles = await provider.getArticles();
      // Filter articles that have the Solution ID in their Notion "MongoDB ID" multi-select property
      const solId = solution._id.toString();
      
      relatedNews = allArticles.filter(article => {
        if (!article.solutionIds) return false;
        return article.solutionIds.includes(solId);
      });
    } catch (e) {
      console.error("Failed to fetch related news for solution", e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] flex items-end pb-24 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="hidden md:block absolute -top-[20%] -right-[10%] w-[50%] h-[70%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen transform-gpu will-change-transform" />
          <div className="hidden md:block absolute bottom-[10%] -left-[10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen transform-gpu will-change-transform" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                {solution.category.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-300 text-[10px] font-black uppercase tracking-widest">
                {countryName}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              {solName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl">
              {solDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Program Details Grid */}
      <section className="py-24 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-32">
            
            <div className="bg-white dark:bg-[#111] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-xl">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Landmark className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{locale === 'zh' ? '最低投资额' : 'Minimum Investment'}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {solReq.investment_amount || (locale === 'zh' ? '视情况而定' : 'Varies')}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-xl">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{locale === 'zh' ? '办理时间' : 'Timeframe'}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {solReq.timeframe || (locale === 'zh' ? '视情况而定' : 'Varies')}
              </p>
            </div>

            <div className="bg-white dark:bg-[#111] rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-xl">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{locale === 'zh' ? '居住要求' : 'Physical Presence'}</p>
              <p className="text-2xl font-black text-gray-900 dark:text-white">
                {solReq.physical_presence || (locale === 'zh' ? '无要求' : 'None required')}
              </p>
            </div>

          </div>

          <DevOnlyBlock>
            <div className="mt-12 max-w-4xl">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter">
                {locale === 'zh' ? '项目 ID' : 'Program ID'}
              </h2>
              <div className="p-4 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 font-mono text-sm text-gray-600 dark:text-gray-300 select-all">
                {solution._id.toString()}
              </div>
              <p className="text-sm text-gray-500 mt-3">
                {locale === 'zh' ? '* 在您的 Notion 数据库中将此确切 ID 添加为标签，以自动在此处显示与此项目相关的新闻文章。' : '* Add this exact ID as a tag in your Notion database to automatically display news articles related to this program here.'}
              </p>
            </div>
          </DevOnlyBlock>
        </div>
      </section>

      {/* 3. Program News & Updates */}
      <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {locale === 'zh' ? '项目' : 'Program'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{locale === 'zh' ? '新闻与动态' : 'News & Updates'}</span>
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-blue-600 to-purple-600 mt-4" />
          </div>

          {relatedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((article) => (
                <Link key={article.id} href={`/insights/${article.slug}`} className="group block">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-white/5">
                    {article.image ? (
                      <Image 
                        src={article.image} 
                        alt={article.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl">📰</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      {new Date(article.date).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 border border-dashed border-gray-300 dark:border-white/20 rounded-3xl text-center max-w-2xl mx-auto bg-gray-50 dark:bg-white/5">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {locale === 'zh' ? '该项目暂无最近的新闻或政策更新。' : 'No recent news or policy updates published for this program yet.'}
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
export const revalidate = 3600;
