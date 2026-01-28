import { Article, Category } from '@/lib/types/content';
import { ContentProvider, NotionProvider, MarkdownProvider, NotionXProvider } from '@repo/cms';
import { contentSections, ContentSection, getSectionConfig } from '@repo/apps-config/landing/content-sources';

// Factory to create provider from config
export function getProviderForSection(sectionSlug: string): ContentProvider | null {
  const config = getSectionConfig(sectionSlug);
  if (!config) return null;

  switch (config.engine) {
    case 'markdown':
      if (!config.config.folderPath) throw new Error(`Section ${sectionSlug} is missing folderPath configuration`);
      return new MarkdownProvider({ folderPath: config.config.folderPath });
    case 'notion':
      return new NotionProvider({ databaseId: config.config.databaseId });
    case 'notion-x':
      return new NotionXProvider({ databaseId: config.config.databaseId });
    default:
      return null;
  }
}

// @deprecated Use getProviderForSection instead
export type ContentSource = 'markdown' | 'notion' | 'notion-x' | 'json';

// --- Facade for backwards compatibility / default usage ---
// This allows existing code (like home page) to still work without changes,
// defaulting to the 'markdown' strategy (or whatever we set as default).

// @deprecated Legacy factory for backward compatibility
export function getContentProvider(source: Exclude<ContentSource, 'json'> = 'markdown'): ContentProvider {
  switch (source) {
    case 'notion':
      return new NotionProvider(); 
    case 'notion-x':
        return new NotionXProvider();
    case 'markdown':
    default:
        const insights = contentSections.find((s: ContentSection) => s.slug === 'insights');
        return new MarkdownProvider({ 
            folderPath: insights?.config.folderPath || 'src/content/insights' 
        });
  }
}

const defaultProvider = getContentProvider('markdown');

export async function getArticles(): Promise<Article[]> {
  return defaultProvider.getArticles();
}

export async function getArticleById(id: string): Promise<Article | null> {
  return defaultProvider.getArticleById(id);
}

export async function getCategories(): Promise<Category[]> {
  return defaultProvider.getCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
   const categories = await getCategories();
   return categories.find(c => c.slug === slug) || null;
}

export async function getArticlesByCategory(category: string): Promise<Article[]> {
  return defaultProvider.getArticlesByCategory(category);
}
 