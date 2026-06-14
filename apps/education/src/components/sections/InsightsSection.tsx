'use client';;
import { cn, Article, ArticleCard } from '@repo/domain';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function InsightsSection({
  isZh,
  isDark,
  articles,
}: {
  isZh: boolean;
  isDark: boolean;
  articles?: Article[];
}) {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-in fade-in duration-500">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                {isZh ? '知识库' : 'Knowledge Base'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {isZh ? '深度' : 'Latest'} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '解析' : 'Insights'}
              </span>
            </h2>
            <p className="mt-4 text-sm md:text-base font-medium text-gray-500 dark:text-gray-400 max-w-2xl">
              {isZh
                ? '获取国际教育的最新新闻、指南和提示。'
                : 'Stay updated with the latest news, guides, and tips for your international education journey.'}
            </p>
          </div>
          <Link
            href="/insights"
            className={cn(
              'group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition shrink-0',
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-white'
                : 'bg-white border border-gray-100 hover:border-blue-500/30 text-gray-900 shadow-sm',
            )}
          >
            {isZh ? '查看所有文章' : 'View All Articles'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.slice(0, 3).map((article, index) => (
            <div key={article.id} className="animate-in fade-in duration-500">
              <ArticleCard article={article} basePath="/insights" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
