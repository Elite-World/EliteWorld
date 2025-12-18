'use client';

import { HeroSection } from '@repo/ui';
import { useThemeStore } from '@repo/web-shared';
import { cn } from '@repo/web-shared';
import ReactMarkdown from 'react-markdown';
import { siteConfig } from '@repo/web-shared/config/landing/site-config';

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

      <div className="container mx-auto px-4 py-12">
        <article
          className={cn(
            'max-w-4xl mx-auto prose prose-lg',
            isDark ? 'prose-invert' : 'prose-slate'
          )}
        >
          {content && <ReactMarkdown>{content}</ReactMarkdown>}
        </article>
      </div>
    </div>
  );
}
