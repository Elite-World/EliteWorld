'use client';

import { ArticlePageX as ArticlePageXLayout } from '@repo/domain';
import { Article, Category } from '@repo/domain';

interface BaseLayoutProps {
  article: Article;
  relatedArticles?: Article[];
  prevArticle?: Article | null;
  nextArticle?: Article | null;
  categories?: Category[];
  basePath?: string;
}

export function ArticlePageX(props: BaseLayoutProps) {
  return <ArticlePageXLayout {...props} />;
}
