'use server';

import { getProviderForSection } from '@/lib/services/content';
import { contentSections } from '@repo/apps-config/immigration/content-sources';
import { Article } from '@/lib/types/content';

export interface SearchResult extends Article {
    section: string;
    sectionTitle: string;
}

export async function searchArticles(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
  let allResults: SearchResult[] = [];

  // Iterate over all configured sections
  for (const section of contentSections) {
      if (!section.searchable) continue;

      const provider = getProviderForSection(section.slug);
      if (!provider) continue;

      try {
          // Fetch articles (cached by provider if applicable)
          const articles = await provider.getArticles();
          
          // Filter match
          const matches = articles.filter(article => {
            const searchableText = `
              ${article.title} 
              ${article.excerpt} 
              ${article.category}
            `.toLowerCase();
            // Note: Excluding 'content' for performance if not needed, 
            // or we can allow it. User asked to "retrofit", assuming full search.
            // Let's add content back if it's available efficiently.
            // Markdown provider loads content. Notion provider listing does NOT load content usually.
            // So filtering by content might only work for Markdown unless we fetch details.
            // For listing performance, let's stick to metadata search for Notion unless critical.
            
            return searchTerms.every((term) => searchableText.includes(term));
          }).map(article => ({
              ...article,
              section: section.slug,
              sectionTitle: section.title
          }));

          allResults = [...allResults, ...matches];

      } catch (e) {
          console.error(`Search failed for section ${section.slug}:`, e);
      }
  }

  return allResults.slice(0, 10); // Limit total results
}
