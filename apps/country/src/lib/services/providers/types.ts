import { Article, Category } from '@/lib/types/content';

export interface ContentProvider {
  getArticles(): Promise<Article[]>;
  getArticleById(id: string): Promise<Article | null>;
  getCategories(): Promise<Category[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
}
