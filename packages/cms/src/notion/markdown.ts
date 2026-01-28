import { ContentProvider, Article, Category } from './types';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';



function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

interface MarkdownProviderOptions {
  folderPath: string;
}

export class MarkdownProvider implements ContentProvider {
  private folderPath: string;

  constructor(options: MarkdownProviderOptions) {
    this.folderPath = path.isAbsolute(options.folderPath) 
      ? options.folderPath 
      : path.join(process.cwd(), options.folderPath);
  }

  async getArticles(): Promise<Article[]> {
    if (!fs.existsSync(this.folderPath)) {
      return [];
    }

    const fileNames = fs.readdirSync(this.folderPath);
    const articles: Article[] = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const id = fileName.replace(/\.md$/, '');
        const fullPath = path.join(this.folderPath, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        const { data, content } = matter(fileContents);
        
        return {
          id,
          title: data.title,
          slug: data.slug,
          date: data.date,
          excerpt: data.excerpt,
          category: data.category,
          image: data.image,
          readTime: calculateReadTime(content),
          content: content
        } as Article;
      })
      .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));

    return articles;
  }

  async getArticleById(id: string): Promise<Article | null> {
      // For Markdown, ID is effectively the slug or filename without extension
      // But typically we look up by slug in the frontend
      // This internal ID lookup might need to scan all if IDs aren't filenames
      // Assuming ID == filename relative to BLOG_DIR for simple lookup
      const articles = await this.getArticles();
      // Match by ID (filename) OR slug (frontmatter)
      return articles.find(a => a.id === id || a.slug === id) || null;
  }

  async getCategories(): Promise<Category[]> {
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
      const articles = await this.getArticles();
      return articles.filter(article => article.category === category);
  }
}
