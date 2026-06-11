import { getDestinationById } from '@repo/domain/data/destinations';
import { DestinationTemplate } from '@/components/destination/DestinationTemplate';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { destinations } = await import('@repo/domain/data/destinations');
  const params: any[] = [];
  destinations.forEach((dest) => {
    params.push({ locale: 'en', country: dest.id });
    params.push({ locale: 'zh', country: dest.id });
  });
  return params;
}

export default async function DestinationPage({ params }: { params: Promise<{ locale: string, country: string }> }) {
  const { locale, country } = await params;
  const data = getDestinationById(country);

  if (!data) {
    notFound();
  }

  return <DestinationTemplate data={data} />;
}
