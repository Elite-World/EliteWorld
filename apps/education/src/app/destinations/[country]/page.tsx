import { getDestinationById } from '@repo/domain/data/destinations';
import { DestinationTemplate } from '../../../components/destination/DestinationTemplate';
import { notFound } from 'next/navigation';

export default async function DestinationPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  const data = getDestinationById(country);

  if (!data) {
    notFound();
  }

  return <DestinationTemplate data={data} />;
}
