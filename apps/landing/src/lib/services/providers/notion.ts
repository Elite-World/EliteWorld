import { ContentProvider } from './types';
import { Article, Category } from '@/lib/types/content';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Initialize Client only if key exists to avoid immediate crash
// But we should handle missing keys gracefully in methods
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// Custom Transformers for Column Layouts
n2m.setCustomTransformer('column_list', async (block) => {
  const { results } = await notion.blocks.children.list({ block_id: block.id });
  const children = await n2m.blocksToMarkdown(results);
  
  const count = children.length;
  let gridClass = 'md:grid-cols-1';
  
  // Logic: 
  // 2 Cols -> Use standard 50/50 split (User preference)
  // 3+ Cols -> Use equal widths
  if (count === 2) gridClass = 'md:grid-cols-2';
  else if (count === 3) gridClass = 'md:grid-cols-3';
  else if (count === 4) gridClass = 'md:grid-cols-4';
  else if (count > 1) gridClass = `md:grid-cols-${count}`; 

  return `<div class="grid ${gridClass} gap-8 my-8">\n\n${children.map(c => c.parent).join('\n\n')}\n\n</div>`;
});

n2m.setCustomTransformer('column', async (block) => {
  const { results } = await notion.blocks.children.list({ block_id: block.id });
  const children = await n2m.blocksToMarkdown(results);
  return `<div class="space-y-4">\n\n${children.map(c => c.parent).join('\n\n')}\n\n</div>`;
});

// Helper to format UUID with hyphens if needed
function formatUuid(id: string): string {
  if (!id || id.includes('-')) return id;
  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(16, 4)}-${id.substr(20)}`;
}

const RAW_DATABASE_ID = process.env.NOTION_DATABASE_ID || '';
const DATABASE_ID = formatUuid(RAW_DATABASE_ID);

interface NotionProviderOptions {
    databaseId?: string;
}

export class NotionProvider implements ContentProvider {
  private databaseId: string;

  constructor(options?: NotionProviderOptions) {
      this.databaseId = options?.databaseId ? formatUuid(options.databaseId) : DATABASE_ID;
  }
  
  private checkConfig() {
    if (!process.env.NOTION_API_KEY) {
      console.warn('NOTION_API_KEY is missing');
      return false;
    }
    if (!this.databaseId) {
      console.warn('NOTION_DATABASE_ID provided is missing or invalid');
      return false;
    }
    return true;
  }

  async getArticles(): Promise<Article[]> {
    if (!this.checkConfig()) return [];

    console.log(`[NotionProvider] Fetching articles from Database ID: ${this.databaseId}`);

    try {
      const response = await fetch(`https://api.notion.com/v1/databases/${this.databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            and: [
              {
                property: 'Status',
                select: {
                  equals: 'Published',
                },
              },
              {
                property: 'Date',
                date: {
                  on_or_before: new Date().toISOString().split('T')[0],
                },
              },
            ],
          },
          sorts: [
            {
              property: 'Date',
              direction: 'descending',
            },
          ],
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        console.error('Notion API Error:', response.status, errBody);
        throw new Error(`Notion API failed with ${response.status}: ${errBody}`);
      }

      const data = await response.json();

      const articles: Article[] = await Promise.all(
        (data as any).results.map(async (page: any) => {
          return this.mapPageToArticle(page);
        })
      );

      return articles.filter(a => a !== null) as Article[];
    } catch (error) {
      console.error('Error fetching articles from Notion:', error);
      return [];
    }
  }

  async getArticleById(id: string): Promise<Article | null> {
    // In Notion, we usually query by Slug to find the ID, or if ID is the slug.
    // Our 'id' in Article interface is usually the slug for routing.
    // Let's assume 'id' passed here is the slug.
    if (!this.checkConfig()) return null;

    try {
      const response = await fetch(`https://api.notion.com/v1/databases/${this.databaseId}/query`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'Slug',
            rich_text: {
              equals: id,
            },
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch article');
      const data = (await response.json()) as any;

      if (data.results.length === 0) return null;

      const page = data.results[0];
      const article = await this.mapPageToArticle(page);
      
      // Fetch content
      if (article) {
          const mdBlocks = await n2m.pageToMarkdown(page.id);
          const mdString = n2m.toMarkdownString(mdBlocks);
          article.content = mdString.parent; // .parent contains the markdown string
      }

      return article;
    } catch (error) {
      console.error('Error fetching article by ID from Notion:', error);
      return null;
    }
  }

  async getCategories(): Promise<Category[]> {
    // We can fetch all articles and extract categories
    const articles = await this.getArticles();
    const categoriesMap = new Map<string, Category>();

    articles.forEach(article => {
      if (article.category) {
         if (!categoriesMap.has(article.category)) {
           const slug = article.category.toLowerCase().replace(/\s+/g, '-');
           categoriesMap.set(article.category, {
              id: slug,
              title: article.category,
              slug: slug,
              items: []
           });
         }
      }
    });

    return Array.from(categoriesMap.values());
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    if (!this.checkConfig()) return [];
    
    // We could filter in Notion API if 'Category' is a Select property
    // But for simplicity/consistency with mapped types, we can fetch all and filter
    // Or optimized:
    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${this.databaseId}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filter: {
                    and: [
                        {
                            property: 'Status',
                            select: { equals: 'Published' }
                        },
                        {
                            property: 'Date',
                            date: { on_or_before: new Date().toISOString().split('T')[0] }
                        },
                        {
                            property: 'Category',
                            select: { equals: category }
                        }
                    ]
                }
            })
        });

        if (!response.ok) throw new Error('Failed to fetch category articles');
        const data = (await response.json()) as any;

        const articles = await Promise.all(
            data.results.map(async (page: any) => this.mapPageToArticle(page))
        );

        return articles.filter(Boolean) as Article[];

    } catch (error) {
        console.error(`Error fetching articles for category ${category}:`, error);
        return [];
    }
  }

  private async mapPageToArticle(page: any): Promise<Article | null> {
      try {
        const props = page.properties;
        
        // Helper to safely get property values
        // Adjust these keys based on your actual Notion DB schema
        const title = props.Name?.title?.[0]?.plain_text || 'Untitled';
        const slug = props.Slug?.rich_text?.[0]?.plain_text || page.id;
        const date = props.Date?.date?.start || new Date().toISOString();
        const excerpt = props.Summary?.rich_text?.[0]?.plain_text || '';
        const category = props.Category?.select?.name || 'Uncategorized';
        
        // Cover image priority: 'Cover' property -> Page Cover
        let image = '/images/placeholder.jpg';
        
        // Check "Cover" property (Files & Media)
        const coverProp = props.Cover as any;
        if (coverProp?.files && coverProp.files.length > 0) {
           const file = coverProp.files[0];
           if (file.type === 'file') image = file.file.url;
           else if (file.type === 'external') image = file.external.url;
        } 
        // Fallback to Page Cover
        else if (page.cover) {
            if (page.cover.type === 'external') image = page.cover.external.url;
            if (page.cover.type === 'file') image = page.cover.file.url;
        }

        return {
            id: page.id, // Keep internal ID unique
            title,
            slug,
            date,
            excerpt,
            category,
            image,
            readTime: 5, // TODO: Calculate from content length if needed
            content: '' // Content fetched separately for individual article
        };
      } catch (e) {
          console.warn('Failed to map Notion page to Article:', e);
          return null;
      }
  }
}
