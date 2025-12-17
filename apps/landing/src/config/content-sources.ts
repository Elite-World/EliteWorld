export type ContentEngine = 'markdown' | 'notion' | 'notion-x';

export interface ContentSection {
  slug: string;       // URL path segment (e.g. 'blog')
  title: string;      // Display title
  engine: ContentEngine;
  config: {
    folderPath?: string;      // For markdown
    databaseId?: string;      // For Notion
    basePath?: string;        // override default base path if needed
  };
  searchable?: boolean;
}

// Configurable Content Manifest
export const contentSections: ContentSection[] = [
  {
    slug: 'insights',
    title: 'Insights',
    engine: 'markdown', 
    config: { 
        folderPath: 'src/content/insights'
    },
    searchable: true
  },
  {
    slug: 'blog',
    title: 'Blog',
    engine: 'notion-x',
    config: { 
        databaseId: process.env.NOTION_DATABASE_ID 
    },
    searchable: true
  }
];

// Helper to get section config
export function getSectionConfig(slug: string) {
    return contentSections.find(s => s.slug === slug);
}
