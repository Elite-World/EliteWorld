import { getContentProvider } from '@/lib/services/content';
import { notFound } from 'next/navigation';
import { ArticlePageX } from '@/lib/themes/ios/layouts/ArticlePageX'; // Direct import

export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const provider = getContentProvider('notion');
  const articles = await provider.getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticleXPage({ params }: PageProps) {
  const { slug } = await params;
  const provider = getContentProvider('notion-x'); // Use NotionX provider to get RecordMap
  const article = await provider.getArticleById(slug);

  if (!article) {
    notFound();
  }

  // Fetch adjacent articles for navigation
  const listProvider = getContentProvider('notion');
  const allArticles = await listProvider.getArticles();
  const currentIndex = allArticles.findIndex(a => a.id === article.id); // Matches by ID because list provider and detail provider share ID logic
  
  // Find index using ID or Slug
  // Note: getArticleById returns article.id as Page ID. 
  // listProvider.getArticles returns article.id as Page ID. 
  // So matching by ID is safe.
  
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  // Simple related articles logic (same category)
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <ArticlePageX
      article={article}
      relatedArticles={relatedArticles}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
      basePath="/blog-x"
    />
  );
}
