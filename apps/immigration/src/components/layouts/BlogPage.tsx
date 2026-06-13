'use client';

import { BlogPage as BlogPageLayout } from '@repo/domain';
import { Article, Category } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/immigration/site-config';
import { useParams } from 'next/navigation';
import { NewsletterForm } from '@/components/marketing/NewsletterForm';

interface BlogPageProps {
  articles: Article[];
  categories: Category[];
  basePath?: string;
  title?: string;
  locale?: string;
}

export function BlogPage(props: BlogPageProps) {
  const params = useParams();
  const currentLocale = (params.locale as 'en' | 'zh') || props.locale || 'en';
  const currentSiteConfig = siteConfig[currentLocale];
  return (
    <BlogPageLayout
      {...props}
      title={props.title || 'Immigration Insights'}
      backgroundImage={currentSiteConfig.ogImage}
      NewsletterComponent={NewsletterForm}
    />
  );
}
