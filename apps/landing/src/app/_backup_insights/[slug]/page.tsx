import { LayoutProvider } from '@/components/providers/LayoutProvider';
import { getArticleById, getArticles } from '@/lib/services/content';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const currentIndex = articles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null; // Assuming new articles are at start

  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  return (
    <LayoutProvider 
      layoutName="ArticlePage"
      data={{
        article: article,
        prevArticle: prevArticle,
        nextArticle: nextArticle,
        relatedArticles: relatedArticles
      }}
    />
  );
}
