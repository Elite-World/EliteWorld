import { HomePage } from '@/components/layouts/HomePage';
import { getProviderForSection } from '@/lib/services/content';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  let latestArticles: any[] = [];
  const provider = getProviderForSection('insights');
  if (provider) {
    try {
      const allArticles = await provider.getArticles();
      // sort by date if needed, assuming the provider returns them mostly sorted
      latestArticles = allArticles.slice(0, 3);
    } catch (e) {
      console.error('Failed to fetch articles for home page:', e);
    }
  }

  return <HomePage recentArticles={latestArticles} />;
}
