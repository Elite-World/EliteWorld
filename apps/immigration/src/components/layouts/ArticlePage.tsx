import { ArticlePage as ArticlePageLayout } from '@repo/domain';
import { Article, Category } from '@repo/domain';

interface BaseLayoutProps {
  article: Article;
  relatedArticles?: Article[];
  prevArticle?: Article | null;
  nextArticle?: Article | null;
  categories?: Category[];
  basePath?: string;
}

export function ArticlePage(props: BaseLayoutProps) {
  return <ArticlePageLayout {...props} />;
}
