import { notFound } from 'next/navigation';
import { getJurisdictionData } from '@repo/domain/services/jurisdiction-service';
import { JurisdictionTemplate } from '@/components/jurisdiction/JurisdictionTemplate';
import { getProviderForSection } from '@/lib/services/content';

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: DestinationPageProps) {
  const { slug } = await params;
  const data = await getJurisdictionData(slug);
  
  if (!data) {
    return {
      title: 'Destination Not Found | EliteWorld',
    };
  }

  return {
    title: `${data.country.name.en} Immigration & Mobility | EliteWorld`,
    description: `Explore residency, citizenship, and tax optimization pathways in ${data.country.name.en}.`,
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  
  // 1. Fetch Data
  const data = await getJurisdictionData(slug);
  
  // 2. Handle 404
  if (!data) {
    notFound();
  }

  // 3. Fetch Related News using the Slug as a Tag
  let relatedNews: any[] = [];
  const provider = getProviderForSection('insights');
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
