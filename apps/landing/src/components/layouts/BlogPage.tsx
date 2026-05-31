'use client';

import { Article, Category } from '@repo/domain';
import { BlogPage as BlogPageLayout } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/landing/site-config';

interface BlogPageProps {
  articles: Article[];
  categories: Category[];
  basePath?: string;
  title?: string;
}

export function BlogPage({
  articles,
  categories,
  basePath,
  title,
}: BlogPageProps) {
  return (
    <BlogPageLayout
      articles={articles}
      categories={categories}
      basePath={basePath}
      title={title}
      backgroundImage={siteConfig.ogImage}
    />
  );
}
