import { notFound } from 'next/navigation';
import { getJurisdictionData } from '@repo/domain/services/jurisdiction-service';
import { JurisdictionTemplate } from '@/components/jurisdiction/JurisdictionTemplate';
import { getProviderForSection } from '@/lib/services/content';

interface DestinationPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { locale, slug } = await params;
  const data = await getJurisdictionData(slug);
  
  if (!data) {
    return {
      title: locale === 'zh' ? '未找到目的地 | EliteWorld' : 'Destination Not Found | EliteWorld',
    };
  }

  const countryName = locale === 'zh' && data.country.name.cn ? data.country.name.cn : data.country.name.en;

  return {
    title: locale === 'zh' ? `${countryName} 移民与流动性 | EliteWorld` : `${countryName} Immigration & Mobility | EliteWorld`,
    description: locale === 'zh' ? `探索在 ${countryName} 的居留、公民身份和税务优化途径。` : `Explore residency, citizenship, and tax optimization pathways in ${countryName}.`,
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { locale, slug } = await params;
  
  // 1. Fetch Data
  const data = await getJurisdictionData(slug);
  
  // 2. Handle 404
  if (!data) {
    notFound();
  }

  // 3. Fetch Related News using the Slug as a Tag
  let relatedNews: any[] = [];
  const provider = getProviderForSection('insights', locale);
  if (provider) {
    try {
      const allArticles = await provider.getArticles();
      relatedNews = allArticles.filter((article) => {
        if (!article.tags) return false;
        // Normalize tags to lowercase and replace spaces with hyphens to match slug format
        return article.tags.some(tag => 
          tag.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug.toLowerCase()
        );
      });
    } catch (e) {
      console.error('Failed to fetch articles for destination:', e);
    }
  }

  // 4. Render Template
  return (
    <JurisdictionTemplate
      country={data.country as any}
      profile={data.profile as any}
      solutions={data.solutions as any[]}
      relatedNews={relatedNews}
    />
  );
}

export const revalidate = 3600;
