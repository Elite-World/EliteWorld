'use client';

import { HeroSection } from '@repo/ui';
import { useThemeStore, useLanguageStore, cn } from '@repo/domain';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface PrivacyPolicyPageProps {
  content?: string;
}

export function PrivacyPolicyPage({ content }: PrivacyPolicyPageProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const language = useLanguageStore((state) => state.language);
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title={isZh ? '隐私政策' : 'Privacy Policy'}
        subtitle={isZh ? '最后更新：2025年12月16日' : 'Last updated: December 16, 2025'}
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
