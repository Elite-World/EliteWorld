'use client';

import { BlogPage as BlogPageLayout } from '@repo/domain';
import { Article, Category } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/education/site-config';
import { useParams } from 'next/navigation';
import { NewsletterForm } from '@/components/marketing/NewsletterForm';

interface BlogPageProps {
  articles: Article[];
  categories: Category[];
  basePath?: string;
  title?: string;
  locale?: string;
}

export function BlogPage({ articles, categories, basePath, title, locale }: BlogPageProps) {
  const params = useParams();
  const currentLocale = (params.locale as 'en' | 'zh') || locale || 'en';
  const currentSiteConfig = siteConfig[currentLocale];

  return (
    <BlogPageLayout
      articles={articles}
      categories={categories}
      basePath={basePath}
      title={title || currentSiteConfig.name}
      backgroundImage={currentSiteConfig.ogImage}
      NewsletterComponent={NewsletterForm}
      locale={currentLocale}
    />
  );
}
