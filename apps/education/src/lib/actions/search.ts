'use server';

import { getProviderForSection } from '@/lib/services/content';
import { contentSections } from '@repo/apps-config/education/content-sources';
import { Article } from '@/lib/types/content';

import { getAllUniversitiesDirectory } from '@repo/domain/services/ranking-service';
import { destinations } from '@repo/domain/data/destinations';

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
          const articles = await provider.getArticles();
          
          const matches = articles.filter(article => {
            const searchableText = `
              ${article.title} 
              ${article.excerpt} 
              ${article.category}
            `.toLowerCase();
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

  // Search Destinations
  try {
    const destMatches = destinations.filter(dest => {
      const text = `${dest.name} ${dest.description} ${dest.tagline}`.toLowerCase();
      return searchTerms.every(term => text.includes(term));
    }).map(dest => ({
        id: dest.id,
        slug: dest.id,
        title: `Study in ${dest.name}`,
        excerpt: dest.tagline || '',
        content: '',
        publishedAt: '',
        section: 'destinations',
        sectionTitle: 'Destination'
    } as SearchResult));
    allResults = [...allResults, ...destMatches];
  } catch (e) {
    console.error('Failed to search destinations:', e);
  }

  // Search Universities
  try {
    const universitiesList = await getAllUniversitiesDirectory();
    const uniMatches = universitiesList.filter(uni => {
      const text = `${uni.name} ${uni.country}`.toLowerCase();
      return searchTerms.every(term => text.includes(term));
    }).map(uni => {
      const countrySlug = (uni.country || 'global').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const nameSlug = (uni.nameEn || uni.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return {
        id: uni.id || Math.random().toString(),
        slug: `${countrySlug}/${nameSlug}`,
        title: uni.name,
        excerpt: `University in ${uni.country}`,
        content: '',
        publishedAt: '',
        section: 'universities',
        sectionTitle: 'University'
      } as SearchResult;
    });
    allResults = [...allResults, ...uniMatches];
  } catch (e) {
    console.error('Failed to search universities:', e);
  }

  return allResults.slice(0, 10); // Limit total results
}
