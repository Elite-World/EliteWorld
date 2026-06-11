import { getProviderForSection } from '@/lib/services/content';
import { notFound } from 'next/navigation';
import { BlogPage } from '@/components/layouts/BlogPage';
import {
  contentSections,
  getSectionConfig,
} from '@repo/apps-config/immigration/content-sources';

export const revalidate = 3600;

export async function generateStaticParams() {
  const locales = ['en', 'zh'];
  const params: any[] = [];
  for (const locale of locales) {
    contentSections.forEach((section) => {
      params.push({
        locale,
        section: section.slug,
      });
    });
  }
  return params;
}

interface PageProps {
  params: Promise<{
    locale: string;
    section: string;
  }>;
}

export default async function SectionListPage({ params }: PageProps) {
  const { locale, section } = await params;

  // 1. Get Config & Provider
  const sectionConfig = getSectionConfig(section);
  const provider = getProviderForSection(section, locale);

  if (!sectionConfig || !provider) {
    notFound();
  }

  // 2. Fetch Data
  const [articles, categories] = await Promise.all([
    provider.getArticles(),
    provider.getCategories(),
  ]);

  console.log(`[SectionListPage] Fetched ${articles.length} articles for section ${section} and locale ${locale}`);

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
