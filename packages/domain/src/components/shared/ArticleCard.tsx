'use client';

import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { formatDate } from '../../lib/utils';
import { Article as ArticleType } from '../../lib/types/content';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface ArticleProps {
  article: ArticleType;
  variant?: 'default' | 'featured';
  basePath?: string;
}

export function ArticleCard({
  article,
  variant = 'default',
  basePath,
}: ArticleProps) {
  const isDark = useThemeStore((state) => state.isDark);

  if (!article) return null;

  const isFeatured = variant === 'featured';

  return (
    <Link href={`${basePath}/${article.slug}`} className="group block h-full">
      <article
        className={cn(
          'bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300',
          isDark ? 'hover:bg-zinc-800' : 'hover:shadow-lg',
          isFeatured ? 'md:grid md:grid-cols-2 md:gap-8' : '',
        )}
      >
        {/* Image Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-gray-200 dark:bg-gray-800',
            isFeatured ? 'h-64 md:h-full min-h-[320px]' : 'h-48',
          )}
        >
          {article.image ? (
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              fallbackSrc="/images/placeholder-article.png"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-4xl opacity-20">📷</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-sm mb-3">
            <span
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium',
                isDark
                  ? 'bg-blue-900/30 text-blue-300'
                  : 'bg-blue-100 text-blue-800',
              )}
            >
              {article.category || 'General'}
            </span>
            <span className="text-gray-500">{article.date}</span>
          </div>

          <h3
            className={cn(
              'font-bold mb-3 group-hover:text-blue-500 transition-colors',
              isFeatured ? 'text-2xl md:text-3xl' : 'text-xl',
            )}
          >
            {article.title}
          </h3>

          <p
            className={cn(
              'text-gray-600 dark:text-gray-400 mb-4 line-clamp-3',
              isFeatured ? 'text-lg md:text-xl' : 'text-base',
            )}
          >
            {article.excerpt || article.content?.substring(0, 150)}...
          </p>

          <div className="mt-auto pt-4 flex items-center text-blue-500 font-medium text-sm">
            Read Article
            <svg
              className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
