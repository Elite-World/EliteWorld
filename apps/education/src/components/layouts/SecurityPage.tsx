'use client';

import { HeroSection } from '@repo/ui';
import { useThemeStore, useLanguageStore, cn } from '@repo/domain';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
// import { siteConfig } from '@repo/apps-config/landing/site-config';

interface SecurityPageProps {
  content?: string;
}

export function SecurityPage({ content }: SecurityPageProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const language = useLanguageStore((state) => state.language);
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title={isZh ? '安全与合规' : 'Security & Compliance'}
        subtitle={isZh ? '为您全球之旅提供企业级保护' : 'Enterprise-grade protection for your global journey'}
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
