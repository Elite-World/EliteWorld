import { redirect } from 'next/navigation';

export default async function CountryRedirect({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params;
  redirect(`/destinations/${country}`);
}
