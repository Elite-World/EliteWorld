import { Article, Category } from '@/lib/types/content';
import { mockArticles, mockCategories } from '@/config/mock-data';

// In the future, these could fetch from an API
export async function getArticles(): Promise<Article[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles;
}

export async function getArticleById(id: string): Promise<Article | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles.find(article => article.id === id) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockCategories.find(category => category.slug === slug) ?? null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockArticles.filter(article => article.category === category);
} 