'use client';;
import { cn } from '@repo/domain';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function InsightsSection({
  isZh,
  isDark,
  recentArticles,
}: {
  isZh: boolean;
  isDark: boolean;
  recentArticles: any[];
}) {
  if (!recentArticles || recentArticles.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/5">
      <div className="container mx-auto px-4">
        <div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-in fade-in duration-500">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
              {isZh ? '全球流动性' : 'Global Mobility'}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '智库' : 'Intelligence'}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              {isZh
                ? '关于全球公民和居住权的专家见解、政策更新和突发新闻。'
                : 'Expert insights, policy updates, and breaking news on global citizenship and residency.'}
            </p>
          </div>
          <Link
            href="/insights"
            className={cn(
              'group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all',
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                : 'bg-black/5 hover:bg-black/10 text-black border border-black/10',
            )}
          >
            {isZh ? '查看所有智库' : 'View All Intelligence'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentArticles.map((article, index) => (
            <div key={article.id} className="animate-in fade-in duration-500">
              <Link href={`/insights/${article.slug}`} className="group block">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-200 dark:bg-white/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image || '/images/placeholder.jpg'}
                    alt={article.title}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      {article.category || (isZh ? '新闻' : 'News')}
                    </span>
                    <span className="text-gray-400 dark:text-gray-600 text-xs">
                      •
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      {article.date
                        ? new Date(article.date).toLocaleDateString(
                            isZh ? 'zh-CN' : 'en-US',
                            {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            },
                          )
                        : ''}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
