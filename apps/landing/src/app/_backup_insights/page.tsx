import { LayoutProvider } from '@/components/providers/LayoutProvider';
import { getCategories, getArticles } from '@/lib/services/content';

export const revalidate = 0;

import { notFound } from 'next/navigation';
import { siteConfig } from '@/config/site-config';

export default async function BlogPage() {
  if (!siteConfig.features.insights) {
    notFound();
  }

  const [categories, articles] = await Promise.all([
    getCategories(),
    getArticles(),
  ]);

  return (
    <LayoutProvider 
      layoutName="BlogPage"
      data={{
        articles,
        categories,
      }}
    />
  );
}
