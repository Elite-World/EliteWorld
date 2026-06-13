'use client';

import { Article, Category } from '@repo/domain';
import { BlogPage as BlogPageLayout } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/landing/site-config';
import { useParams } from 'next/navigation';

interface BlogPageProps {
  articles: Article[];
  categories: Category[];
  basePath?: string;
  title?: string;
  locale?: string;
}

export function BlogPage({
  articles,
  categories,
  basePath,
  title,
  locale,
}: BlogPageProps) {
  const params = useParams();
  const currentLocale = (params.locale as 'en' | 'zh') || locale || 'en';
  const currentSiteConfig = siteConfig[currentLocale];
  return (
    <BlogPageLayout
      articles={articles}
      categories={categories}
      basePath={basePath}
      title={title}
      backgroundImage={currentSiteConfig.ogImage}
    />
  );
}
