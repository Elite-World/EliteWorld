import { LayoutProvider } from '@/components/providers/LayoutProvider';
// import { getNavigationData } from '@/config/navigation'; // No longer needed
import { getArticles, getCategories } from '@/lib/services/content';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  // Fetch all data at build time (or during revalidation)
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <LayoutProvider 
      layoutName="HomePage"
      data={{
        articles,
        categories,
      }}
    />
  );
}
