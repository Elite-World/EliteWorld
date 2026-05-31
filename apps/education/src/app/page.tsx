import { HomePage } from '@/components/layouts/HomePage';
import { getProviderForSection } from '@/lib/services/content';

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const insightsProvider = getProviderForSection('insights');
  const articles = insightsProvider ? await insightsProvider.getArticles() : [];

  const tipsProvider = getProviderForSection('tips');
  const tips = tipsProvider ? await tipsProvider.getArticles() : [];

  return <HomePage articles={articles} tips={tips} />;
}

