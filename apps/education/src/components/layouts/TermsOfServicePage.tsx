'use client';

import { HeroSection } from '@repo/ui';
import { useThemeStore } from '@repo/domain';
import { cn } from '@repo/domain';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
// import { siteConfig } from '@repo/apps-config/education/site-config';

interface TermsOfServicePageProps {
  content?: string;
}

export function TermsOfServicePage({ content }: TermsOfServicePageProps) {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title="Terms of Service"
        subtitle="Last updated: December 16, 2025"
      />

      <div className="container mx-auto px-4 py-12 relative">
        <div
          className={cn(
            'max-w-4xl mx-auto rounded-3xl p-8 md:p-12 shadow-xl border',
            isDark ? 'bg-[#1A1A1A] border-white/5' : 'bg-white border-gray-100',
          )}
        >
          <article
            className={cn(
              'prose prose-lg max-w-none',
              isDark ? 'prose-invert' : 'prose-slate',
              'prose-headings:font-bold prose-headings:tracking-tight',
              'prose-a:text-blue-600 dark:prose-a:text-blue-400 no-underline hover:prose-a:underline',
            )}
          >
            {content && (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {content}
              </ReactMarkdown>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}
