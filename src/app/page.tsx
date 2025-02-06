import { getNavigationData } from '@/lib/services/navigation';
import { getArticles, getCategories } from '@/lib/services/content';
import { ThemeLayout } from '@/components/ThemeLayout';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  // Fetch all data at build time (or during revalidation)
  const [navigation, articles, categories] = await Promise.all([
    getNavigationData(),
    getArticles(),
    getCategories(),
  ]);

  return (
    <ThemeLayout 
      data={{
        articles,
        categories,
        navigation, // Pass navigation data down
      }}
    />
  );
}
