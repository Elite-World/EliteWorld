import { NotionProvider } from './notion';
import { NotionAPI } from 'notion-client';
import { Article } from '@/lib/types/content';

const notionX = new NotionAPI();

export class NotionXProvider extends NotionProvider {
  async getArticleById(id: string): Promise<Article | null> {
    // 1. Get the basic metadata (title, etc.) from the parent method (which queries the DB)
    // BUT parent getArticleById also fetches markdown content. We don't want that overhead if possible.
    // However, for the POC, calling super is easiest to get the Page ID from the Slug.
    // Optimization: refactor parent to separate "findPageBySlug" from "fetchContent", but standard inheritance is fine for POC.
    
    const article = await super.getArticleById(id);
    if (!article) return null;

    try {
        // 2. Fetch the RecordMap using notion-client
        // We use article.id (which is the Page ID)
        console.log(`[NotionXProvider] Fetching RecordMap for ${article.title} (${article.id})`);
        const recordMap = await notionX.getPage(article.id);
        
        article.recordMap = recordMap;
        return article;
    } catch (error) {
        console.error('Error fetching RecordMap:', error);
        return article; // Fallback to basic article (or null?)
    }
  }
}
