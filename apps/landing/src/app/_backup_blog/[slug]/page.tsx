import { LayoutProvider } from '@/components/providers/LayoutProvider';
import { getContentProvider } from '@/lib/services/content';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const provider = getContentProvider('notion');
  const article = await provider.getArticleById(slug);

  if (!article) {
    notFound();
  }

  // Fetch related articles (e.g. same category)
  // Optimization: Could add getRelatedArticles to provider
  const allArticles = await provider.getArticles();
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 2);
    
  // Simple next/prev based on index (could be improved)
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : undefined;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : undefined;

  return (
    <LayoutProvider 
      layoutName="ArticlePage"
      data={{
        article,
        relatedArticles,
        prevArticle,
        nextArticle,
        basePath: '/blog'
      }}
    />
  );
}
