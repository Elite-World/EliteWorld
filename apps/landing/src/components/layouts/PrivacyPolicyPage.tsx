'use client';

import { HeroSection } from '@repo/ui';
import { cn } from '@repo/domain';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface PrivacyPolicyPageProps {
  content?: string;
}

export function PrivacyPolicyPage({ content }: PrivacyPolicyPageProps) {

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title="Privacy Policy"
        subtitle="Last updated: December 16, 2025"
      />

      <div className="container mx-auto px-4 py-12 md:py-24 relative">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/4 pointer-events-none opacity-50 dark:opacity-100" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/4 pointer-events-none opacity-50 dark:opacity-100" />

        <div
          className={cn(
            'max-w-3xl mx-auto rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden',
            'bg-white dark:bg-[#0a0a0a] border border-gray-100 dark:border-white/5'
          )}
        >
          {/* Subtle nice-to-have inner glow */}
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-600/20 to-transparent opacity-50" />

          <article
            className={cn(
              'prose prose-lg max-w-none prose-slate dark:prose-invert',
              // Typography Refinements
              'prose-headings:font-black prose-headings:tracking-tight prose-headings:scroll-mt-24',
              'prose-h1:text-4xl md:prose-h1:text-5xl',
              'prose-p:text-gray-500 dark:prose-p:text-gray-400 prose-p:leading-loose',
              'prose-li:text-gray-500 dark:prose-li:text-gray-400',
              'prose-strong:text-gray-900 dark:prose-strong:text-white',
              'prose-a:text-blue-600 dark:prose-a:text-blue-400 no-underline hover:prose-a:underline transition-colors',
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
