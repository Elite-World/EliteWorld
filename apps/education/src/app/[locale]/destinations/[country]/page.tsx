import { getDestinationById } from '@repo/apps-config/content/education/destinations';
import { DestinationTemplate } from '@/components/destination/DestinationTemplate';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const { destinations } = await import('@repo/apps-config/content/education/destinations');
  const params: any[] = [];
  destinations.forEach((dest) => {
    params.push({ locale: 'en', country: dest.id });
    params.push({ locale: 'zh', country: dest.id });
  });
  return params;
}

export default async function DestinationPage({ params }: { params: Promise<{ country: string; locale: string }> }) {
  const { country, locale } = await params;
  const data = getDestinationById(country, locale);

  if (!data) {
    notFound();
  }

  return <DestinationTemplate data={data} locale={locale} />;
}
