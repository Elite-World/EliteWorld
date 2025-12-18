'use client';

import { HeroSection } from '@repo/ui';
import { useThemeStore } from '@repo/web-shared';
import { cn } from '@repo/web-shared';
import { siteConfig } from '@repo/web-shared/config/immigration/site-config';
import ReactMarkdown from 'react-markdown';

interface PrivacyPolicyPageProps {
  content?: string;
}

export function PrivacyPolicyPage({ content }: PrivacyPolicyPageProps) {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="min-h-screen">
      <HeroSection
        mode="page"
        title="Privacy Policy"
        subtitle="Last updated: December 16, 2025"
      />

      <div className="container mx-auto px-4 py-12">
        <article
          className={cn(
            'max-w-4xl mx-auto prose prose-lg',
            isDark ? 'prose-invert' : 'prose-slate'
          )}
        >
          <p className="lead">
            At {siteConfig.name}, we are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, and safe-guard
            your information when you visit our website and use our services.
          </p>
          {content && <ReactMarkdown>{content}</ReactMarkdown>}
        </article>
      </div>
    </div>
  );
}
