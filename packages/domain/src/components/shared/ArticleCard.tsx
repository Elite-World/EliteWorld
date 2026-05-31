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
          'relative overflow-hidden h-full flex flex-col rounded-2xl transition-all duration-500',
          // Glassmorphism background
          isDark
            ? 'bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10'
            : 'bg-white border border-gray-100 hover:shadow-2xl hover:border-gray-200 hover:-translate-y-1',
          isFeatured ? 'md:grid md:grid-cols-2 md:gap-0' : '', // Removed gap to allow image to flush
        )}
      >
        {/* Glow Effect on Hover (Dark Mode) */}
        {isDark && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none z-0" />
        )}

        {/* Image Container */}
        <div
          className={cn(
            'relative overflow-hidden z-10',
            isFeatured
              ? 'h-64 md:h-full min-h-[320px] rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none'
              : 'h-52 rounded-t-2xl',
            isDark ? 'bg-gray-800' : 'bg-gray-100',
          )}
        >
          {article.image ? (
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              fallbackSrc="/images/placeholder-article.png"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span className="text-4xl opacity-20">📷</span>
            </div>
          )}

          {/* subtle overlay on image */}
          <div
            className={cn(
              'absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            )}
          />
        </div>

        {/* Content Container */}
        <div
          className={cn(
            'relative p-6 flex flex-col grow z-10',
            isFeatured && 'md:justify-center md:py-12 md:px-10',
          )}
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {article.category && (
              <span
                className={cn(
                  'px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]',
                  isDark
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'bg-blue-50 text-blue-600 border border-blue-100',
                )}
              >
                {article.category}
              </span>
            )}

            {article.tags &&
              article.tags.length > 0 &&
              article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className={cn(
                    'px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[10px]',
                    isDark
                      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                      : 'bg-purple-50 text-purple-600 border border-purple-100',
                  )}
                >
                  {tag}
                </span>
              ))}
            <span
              className={cn(
                'font-medium ml-auto',
                isDark ? 'text-gray-400' : 'text-gray-500',
              )}
            >
              {article.date}
            </span>
          </div>

          <h3
            className={cn(
              'font-bold mb-3 tracking-tight leading-tight group-hover:text-blue-500 transition-colors duration-300',
              isFeatured ? 'text-2xl md:text-4xl' : 'text-xl',
              isDark ? 'text-white' : 'text-gray-900',
            )}
          >
            {article.title}
          </h3>

          <p
            className={cn(
              'mb-6 line-clamp-3 leading-relaxed',
              isDark ? 'text-gray-400' : 'text-gray-600',
              isFeatured ? 'text-lg md:text-xl' : 'text-sm',
            )}
          >
            {article.excerpt || article.content?.substring(0, 150)}...
          </p>

          <div
            className={cn(
              'mt-auto flex items-center font-bold text-sm tracking-wide',
              isDark ? 'text-white' : 'text-gray-900',
            )}
          >
            <span className="group-hover:mr-2 transition-all duration-300">
              Read Article
            </span>
            <svg
              className={cn(
                'w-4 h-4 ml-1 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-500',
              )}
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
