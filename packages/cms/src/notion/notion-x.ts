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
        
        // 1. Globally unwrap blocks to fix notion-client double-wrapping
        // This is necessary because some blocks come wrapped as { value: { value: { type: ... } } }
        Object.keys(recordMap.block).forEach(key => {
          const b = recordMap.block[key];
          if ((b as any)?.value?.value) {
            recordMap.block[key] = {
              role: b.role || (b as any).value.role,
              value: (b as any).value.value
            };
          }
        });

        if (article.isGated) {
          // Process recordMap to slice out content after the "Password" marker
          // The page block has the same UUID as the article.id
          const pageBlockId = Object.keys(recordMap.block).find(id => id.replace(/-/g, '') === article.id.replace(/-/g, ''));
          if (pageBlockId) {
            const pageBlock = recordMap.block[pageBlockId];
            if (pageBlock?.value?.content) {
              const contentIds: string[] = pageBlock.value.content;
              let cutoffIndex = -1;

              for (let i = 0; i < contentIds.length; i++) {
                const childId = contentIds[i];
                const childBlock = recordMap.block[childId];
                const blockData = childBlock?.value;

                // Check if it's a quote block containing "Password"
                if (blockData?.type === 'quote') {
                  const titleArr = blockData.properties?.title;
                  if (titleArr && titleArr[0] && titleArr[0][0]) {
                    const textContent = titleArr[0][0].trim().toLowerCase();
                    if (textContent === 'password') {
                      cutoffIndex = i;
                      break;
                    }
                  }
                }
              }

              if (cutoffIndex !== -1) {
                // We found the marker!
                // 1. Slice the content array
                const gatedContentIds = contentIds.splice(cutoffIndex); // Removes marker and everything after it
                
                // 2. Delete the gated blocks from recordMap so they aren't sent to the client
                gatedContentIds.forEach(id => {
                  delete recordMap.block[id];
                });
              }
            }
          }
        }

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
