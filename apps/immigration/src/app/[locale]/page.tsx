import { HomePage } from '@/components/layouts/HomePage';
import { getProviderForSection } from '@/lib/services/content';
import { getHomepageDestinations } from '@repo/domain/services/jurisdiction-service';
import { featuredSlugs } from '@repo/apps-config/immigration/home-config';

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let latestArticles: any[] = [];
  const provider = getProviderForSection('insights', locale);
  if (provider) {
    try {
      const allArticles = await provider.getArticles();
      // sort by date if needed, assuming the provider returns them mostly sorted
      latestArticles = allArticles.slice(0, 3);
    } catch (e) {
      console.error('Failed to fetch articles for home page:', e);
    }
  }

  const featuredDestinations = await getHomepageDestinations(featuredSlugs);

  return (
    <HomePage
      recentArticles={latestArticles}
      locale={locale}
      featuredDestinations={featuredDestinations}
    />
  );
}
