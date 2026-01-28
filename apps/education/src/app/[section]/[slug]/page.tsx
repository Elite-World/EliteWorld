import { getProviderForSection } from '@/lib/services/content';
import { notFound } from 'next/navigation';
import {
  contentSections,
  getSectionConfig,
} from '@repo/apps-config/education/content-sources';
import { ArticlePage } from '@/components/layouts/ArticlePage';
import { ArticlePageX } from '@/components/layouts/ArticlePageX';

export const revalidate = 3600;

// Improve types for caching
interface SectionParams {
  section: string;
  slug: string;
}

export async function generateStaticParams() {
  const params: SectionParams[] = [];

  for (const section of contentSections) {
    const provider = getProviderForSection(section.slug);
    if (provider) {
      const articles = await provider.getArticles();
      articles.forEach((article) => {
        params.push({
          section: section.slug,
          slug: article.slug,
        });
      });
    }
  }

  return params;
}

interface PageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { section, slug } = await params;

  const provider = getProviderForSection(section);
  if (!provider) return {};

  const article = await provider.getArticleById(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      images: [
        {
          url: article.image || '/images/og-default.jpg', // Fallback image
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image || '/images/og-default.jpg'],
    },
  };
}

export default async function SectionArticlePage({ params }: PageProps) {
  const { section, slug } = await params;

  // 1. Get Config & Provider
  const sectionConfig = getSectionConfig(section);
  const provider = getProviderForSection(section);

  if (!sectionConfig || !provider) {
    notFound();
  }

  // 2. Fetch Article & Related Data
  // Optimization: In a real app we might not want to fetch all articles just for next/prev
  // but for SSG consistency/simplicity we do exactly what we did before.
  const article = await provider.getArticleById(slug);

  if (!article) {
    notFound();
  }

  // Fetch context (next/prev/related)
  // Re-using provider to get full list.
  // (In Notion provider this queries DB again. cache.ts should handle this if wrapped,
  // but currently direct provider access misses cache layer if not careful.
  // For now, acceptable overhead for SSG).
  const allArticles = await provider.getArticles();

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle =
    currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  const relatedArticles = allArticles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const basePath = `/${section}`;

  // 3. Render based on Engine
  if (sectionConfig.engine === 'notion-x') {
    return (
      <ArticlePageX
        article={article}
        relatedArticles={relatedArticles}
        prevArticle={prevArticle}
        nextArticle={nextArticle}
        basePath={basePath}
      />
    );
  }

  // Default: Markdown / Notion Minimal
  return (
    <ArticlePage
      article={article}
      relatedArticles={relatedArticles}
      prevArticle={prevArticle}
      nextArticle={nextArticle}
      basePath={basePath}
    />
  );
}
