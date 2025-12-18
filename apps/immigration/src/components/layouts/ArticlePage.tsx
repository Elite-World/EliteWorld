'use client';

import { Article } from '@repo/web-shared';
import { HeroSection } from '@repo/ui';
import { useThemeStore } from '@repo/web-shared';
import { cn } from '@repo/web-shared';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

import { ArticleCard } from '@repo/web-shared';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// Define a simple Category type if not already defined
interface Category {
  id: string;
  title: string;
  // Add other properties if necessary
}

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
  const isDark = useThemeStore((state) => state.isDark);

  if (!article) return null;

  const activeCategory = categories?.find((c) => c.id === article.category) || {
    title: article.category,
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <HeroSection
        mode="page"
        title={article.title}
        subtitle={article.excerpt} // Added subtitle for better spacing
        backgroundImage={article.image}
      />

      <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-10">
        {/* Article Card Wrapper */}
        <div
          className={cn(
            'rounded-3xl p-8 md:p-12 shadow-xl',
            isDark ? 'bg-[#1C1C1E] border border-gray-800' : 'bg-white'
          )}
        >
          {/* Metadata Header */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm font-medium">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              {activeCategory.title}
            </span>
            <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>
              {new Date(article.date).toLocaleDateString(undefined, {
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
              'prose-img:rounded-2xl prose-img:shadow-lg'
            )}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom Image with better fallback/styling
                img: ({ node, ...props }) => {
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
                table: ({ node, ...props }) => (
                  <div className="overflow-x-auto my-8 rounded-xl border border-gray-200 dark:border-gray-800">
                    <table
                      {...props}
                      className="min-w-full divide-y divide-gray-200 dark:divide-gray-800"
                    />
                  </div>
                ),
                thead: ({ node, ...props }) => (
                  <thead
                    {...props}
                    className="bg-gray-50 dark:bg-zinc-900/50"
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    {...props}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  />
                ),
                td: ({ node, ...props }) => (
                  <td
                    {...props}
                    className="px-6 py-4 whitespace-normal text-sm"
                  />
                ),
                tr: ({ node, ...props }) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {prevArticle ? (
              <Link
                href={`${basePath}/${prevArticle.slug}`}
                className={cn(
                  'group block p-6 rounded-2xl transition-all',
                  isDark
                    ? 'bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800'
                    : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md'
                )}
              >
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <HiArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  Previous Article
                </div>
                <h4
                  className={cn(
                    'font-semibold line-clamp-2',
                    isDark ? 'text-gray-200' : 'text-gray-900'
                  )}
                >
                  {prevArticle.title}
                </h4>
              </Link>
            ) : (
              <div />
            )}{' '}
            {/* Spacer */}
            {nextArticle && (
              <Link
                href={`${basePath}/${nextArticle.slug}`}
                className={cn(
                  'group block p-6 rounded-2xl transition-all text-right',
                  isDark
                    ? 'bg-[#1C1C1E] hover:bg-[#2C2C2E] border border-gray-800'
                    : 'bg-white hover:bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md'
                )}
              >
                <div className="flex items-center justify-end text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Next Article
                  <HiArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
                <h4
                  className={cn(
                    'font-semibold line-clamp-2',
                    isDark ? 'text-gray-200' : 'text-gray-900'
                  )}
                >
                  {nextArticle.title}
                </h4>
              </Link>
            )}
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-20">
            <h3
              className={cn(
                'text-2xl font-bold mb-8',
                isDark ? 'text-gray-200' : 'text-gray-900'
              )}
            >
              You might also like
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <div key={related.id}>
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
