import { HomePage } from '@/components/layouts/HomePage';
import { getProviderForSection } from '@/lib/services/content';

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  const insightsProvider = getProviderForSection('insights', locale);
  const articles = insightsProvider ? await insightsProvider.getArticles() : [];

  const tipsProvider = getProviderForSection('tips', locale);
  const tips = tipsProvider ? await tipsProvider.getArticles() : [];

  return <HomePage articles={articles} tips={tips} />;
}

