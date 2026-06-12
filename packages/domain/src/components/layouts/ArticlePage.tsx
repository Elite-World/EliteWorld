'use client';

import { useState, useEffect } from 'react';

import { Article, Category } from '../../lib/types/content';
import { HeroSection } from '@repo/ui';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

import { ArticleCard } from '../shared/ArticleCard';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface BaseLayoutProps {
  article: Article;
  relatedArticles?: Article[];
  prevArticle?: Article | null;
  nextArticle?: Article | null;
  categories?: Category[];
  basePath?: string;
}

export function ArticlePage({
  article,
  relatedArticles,
  prevArticle,
  nextArticle,
  categories,
  basePath,
}: BaseLayoutProps) {
  const isDarkStore = useThemeStore((state) => state.isDark);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted ? isDarkStore : false;

  if (!article) return null;

  const activeCategory = categories?.find((c) => c.id === article.category) || {
    title: article.category,
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection
        mode="page"
        title={article.title}
        subtitle={article.excerpt}
        backgroundImage={article.image}
      />

      <div className="container mx-auto px-4 max-w-3xl -mt-20 relative z-10">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/4 pointer-events-none opacity-50 dark:opacity-100" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/4 pointer-events-none opacity-50 dark:opacity-100" />

        {/* Article Card Wrapper */}
        <div
          className={cn(
            'rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl border relative overflow-hidden',
            isDark
              ? 'bg-[#0a0a0a]/90 border-white/10'
              : 'bg-white/90 border-gray-100',
          )}
        >
          {/* Inner sheen */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-600/20 to-transparent opacity-50" />
          {/* Metadata Header */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-medium">
            {article.category && (
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border',
                  isDark
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    : 'bg-blue-50 text-blue-600 border-blue-100',
                )}
              >
                {activeCategory.title}
              </span>
            )}

            {article.tags &&
              article.tags.length > 0 &&
              article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border',
                    isDark
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-purple-50 text-purple-600 border-purple-100',
                  )}
                >
                  {tag}
                </span>
              ))}

            <span
              className={cn(
                'ml-auto',
                isDark ? 'text-gray-400' : 'text-gray-500',
              )}
            >
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          {/* Content */}
          <article
            className={cn(
              'prose prose-lg max-w-none',
              isDark ? 'prose-invert' : 'prose-slate',
              // Custom prose overrides for cleaner look
              'prose-headings:font-bold prose-headings:tracking-tight',
              'prose-a:text-blue-600 dark:prose-a:text-blue-400 no-underline hover:prose-a:underline',
              'prose-img:rounded-2xl prose-img:shadow-lg',
            )}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom Image with better fallback/styling
                img: ({ ...props }) => {
                  if (!props.src) return null;
                  return (
                    <span className="block my-8 relative">
                      <Image
                        src={props.src as string}
                        alt={props.alt || article.title}
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        className="rounded-2xl shadow-lg w-full h-auto object-cover max-h-[600px]"
                      />
                    </span>
                  );
                },
                // Custom Table styling
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 dark:border-gray-800">
                    <table
                      {...props}
                      className="min-w-full divide-y divide-gray-200 dark:divide-gray-800"
                    />
                  </div>
                ),
                thead: ({ ...props }) => (
                  <thead
                    {...props}
                    className="bg-gray-50 dark:bg-zinc-900/50"
                  />
                ),
                th: ({ ...props }) => (
                  <th
                    {...props}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  />
                ),
                td: ({ ...props }) => (
                  <td
                    {...props}
                    className="px-6 py-4 whitespace-normal text-sm"
                  />
                ),
                tr: ({ ...props }) => (
                  <tr
                    {...props}
                    className="even:bg-gray-50/50 dark:even:bg-zinc-900/30"
                  />
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Navigation: Prev / Next */}
        {(prevArticle || nextArticle) && (
          <div className="grid grid-cols-2 gap-4 md:gap-6 mt-16">
            {prevArticle ? (
              <Link
                href={`${basePath}/${prevArticle.slug}`}
                className={cn(
                  'group block p-4 md:p-6 rounded-2xl transition-all relative overflow-hidden',
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                    : 'bg-white hover:shadow-xl hover:-translate-y-1 border border-gray-100',
                )}
              >
                {/* Glow effect */}
                {isDark && (
                  <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                <div className="relative z-10">
                  <div className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 group-hover:text-blue-500 transition-colors">
                    <HiArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Previous Article
                  </div>
                  <h4
                    className={cn(
                      'font-bold text-lg leading-tight line-clamp-2',
                      isDark
                        ? 'text-gray-200 group-hover:text-white'
                        : 'text-gray-900 group-hover:text-blue-600',
                    )}
                  >
                    {prevArticle.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div />
            )}{' '}
            {/* Spacer */}
            {nextArticle && (
              <Link
                href={`${basePath}/${nextArticle.slug}`}
                className={cn(
                  'group block p-4 md:p-6 rounded-2xl transition-all text-right relative overflow-hidden',
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-md'
                    : 'bg-white hover:shadow-xl hover:-translate-y-1 border border-gray-100',
                )}
              >
                {/* Glow effect */}
                {isDark && (
                  <div className="absolute inset-0 bg-linear-to-l from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-end text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 group-hover:text-purple-500 transition-colors">
                    Next Article
                    <HiArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4
                    className={cn(
                      'font-bold text-lg leading-tight line-clamp-2',
                      isDark
                        ? 'text-gray-200 group-hover:text-white'
                        : 'text-gray-900 group-hover:text-purple-600',
                    )}
                  >
                    {nextArticle.title}
                  </h4>
                </div>
              </Link>
            )}
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-blue-600/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                Discover More
              </span>
            </div>
            <h3
              className={cn(
                'text-3xl md:text-4xl font-black uppercase tracking-tighter mb-12',
                isDark ? 'text-white' : 'text-gray-900',
              )}
            >
              You might also like
            </h3>
            <div className="flex gap-6 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar w-full">
              {relatedArticles.map((related) => (
                <div 
                  key={related.id} 
                  className="flex-none w-[85vw] md:w-[calc(50vw-4rem)] max-w-[420px] h-full snap-start"
                >
                  <ArticleCard article={related} basePath={basePath} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
