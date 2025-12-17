import { LayoutProvider } from '@/components/providers/LayoutProvider';
import { getContentProvider } from '@/lib/services/content';

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const provider = getContentProvider('notion');
  
  const [categories, articles] = await Promise.all([
    provider.getCategories(),
    provider.getArticles(),
  ]);

  return (
    <LayoutProvider 
      layoutName="BlogPage"
      data={{
        articles,
        categories,
        basePath: '/blog'
      }}
    />
  );
}
