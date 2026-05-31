import { NotionProvider } from './notion';
import { NotionAPI } from 'notion-client';
import { Article } from './types';

const notionX = new NotionAPI();

export class NotionXProvider extends NotionProvider {
  async getArticleById(id: string): Promise<Article | null> {
    // 1. Get the basic metadata (title, etc.) from the parent method (which queries the DB)
    // BUT parent getArticleById also fetches markdown content. We don't want that overhead if possible.
    // However, for the POC, calling super is easiest to get the Page ID from the Slug.
    // Optimization: refactor parent to separate "findPageBySlug" from "fetchContent", but standard inheritance is fine for POC.
    
    const article = await super.getArticleById(id);
    if (!article) return null;

    // Retry logic for RecordMap
    const MAX_RETRIES = 3;
    let lastError;

    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        // 2. Fetch the RecordMap using notion-client
        // We use article.id (which is the Page ID)
        console.log(`[NotionXProvider] Fetching RecordMap for ${article.title} (${article.id}) (Attempt ${i + 1}/${MAX_RETRIES})`);
        const recordMap = await notionX.getPage(article.id);
        
        article.recordMap = recordMap;
        return article;
      } catch (error) {
        console.warn(`[NotionXProvider] Fetch failed attempt ${i+1}:`, error);
        lastError = error;
        // Wait before retry (exponential backoff: 1s, 2s, 4s)
        if (i < MAX_RETRIES - 1) {
             await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
        }
      }
    }

    console.error('Error fetching RecordMap after retries:', lastError);
    return article; // Fallback
  }
}
