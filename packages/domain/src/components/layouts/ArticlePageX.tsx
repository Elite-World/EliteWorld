'use client';

import { useState, useEffect } from 'react';
import { Article, Category } from '../../lib/types/content';
import { HeroSection } from '@repo/ui';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { ArticleCard } from '../shared/ArticleCard';

// react-notion-x imports
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface BaseLayoutProps {
  article: Article;
  relatedArticles?: Article[];
  prevArticle?: Article | null;
  nextArticle?: Article | null;
  categories?: Category[];
  basePath?: string;
}

export function ArticlePageX({
  article,
  relatedArticles,
  prevArticle,
  nextArticle,
  categories,
  basePath = '/blog-x',
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

      <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-10">
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

          {/* Summary / Key Takeaways Section (Premium) */}
          {article.excerpt && (
            <div
              className={cn(
                'mb-12 p-8 rounded-2xl border transition-colors relative overflow-hidden',
                isDark
                  ? 'bg-white/5 border-white/10'
                  : 'bg-blue-50/50 border-blue-100',
              )}
            >
              {isDark && (
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
              )}
              <h3
                className={cn(
                  'text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2',
                  isDark ? 'text-blue-400' : 'text-blue-600',
                )}
              >
                <span className="w-1 h-4 bg-current rounded-full" />
                Summary
              </h3>
              <p
                className={cn(
                  'font-medium leading-relaxed text-lg',
                  isDark ? 'text-gray-300' : 'text-gray-700',
                )}
              >
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Content via NotionRenderer */}
          {article.recordMap && isMounted ? (
            <div className={isDark ? 'dark-mode' : ''}>
              {(() => {
                // Fix react-notion-x crash: "Cannot read properties of undefined (reading 'replaceAll')"
                // This happens when the Notion API returns blocks with { role: "none" } and no value.id
                const recordMap = article.recordMap;
                if (recordMap?.block) {
                  Object.keys(recordMap.block).forEach((key) => {
                    const block = recordMap.block[key];
                    // Some blocks from notion-client are double-wrapped in value.value
                    if (block?.value?.value) {
                      // Unwrap the block so react-notion-x can read block.id directly
                      recordMap.block[key] = {
                        role: block.role || block.value.role,
                        value: block.value.value
                      };
                    } 
                    // After potential unwrapping, verify the block has an ID
                    const unwrappedBlock = recordMap.block[key];
                    if (!unwrappedBlock?.value?.id) {
                      delete recordMap.block[key];
                    }
                  });
                }
                return null;
              })()}
              {/* 
                 Official disableHeader prop hides the main header, but sometimes 
                 Database Properties persist. We use CSS to enforce hiding them 
                 as per user request to "hide metadata".
              */}
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                .notion-collection-page-properties { display: none !important; }
                .notion-page-title-text { display: none !important; }
                .notion-page-icon-wrapper { display: none !important; }
                .notion-title { display: none !important; }
                .notion-header { display: none !important; }
              `,
                }}
              />
              <NotionRenderer
                recordMap={article.recordMap}
                fullPage={false}
                disableHeader={true}
                darkMode={isDark}
                previewImages={!!article.recordMap.preview_images}
                components={{
                  Code,
                  Collection,
                  Equation,
                  Modal,
                  Pdf,
                  nextImage: Image, // Use Next.js Image
                  nextLink: Link, // Use Next.js Link
                }}
              />
            </div>
          ) : (
            <div className="text-red-500">
              RecordMap not found. Fetch failed.
            </div>
          )}
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
