import { getProviderForSection } from '@/lib/services/content';
import { notFound } from 'next/navigation';
import { BlogPage } from '@/components/layouts/BlogPage';
import {
  contentSections,
  getSectionConfig,
} from '@repo/web-shared/config/landing/content-sources';

export const revalidate = 3600;

export async function generateStaticParams() {
  return contentSections.map((section) => ({
    section: section.slug,
  }));
}

interface PageProps {
  params: Promise<{
    section: string;
  }>;
}

export default async function SectionListPage({ params }: PageProps) {
  const { section } = await params;

  // 1. Get Config & Provider
  const sectionConfig = getSectionConfig(section);
  const provider = getProviderForSection(section);

  if (!sectionConfig || !provider) {
    notFound();
  }

  // 2. Fetch Data
  const [articles, categories] = await Promise.all([
    provider.getArticles(),
    provider.getCategories(),
  ]);

  // 3. Render Generic Layout
  // passing section as basePath so links become /blog/slug or /insights/slug
  return (
    <BlogPage
      articles={articles}
      categories={categories}
      basePath={`/${section}`}
      title={sectionConfig.title}
    />
  );
}
