import { redirect } from 'next/navigation';

export async function generateStaticParams() {
  const { destinations } = await import('@repo/apps-config/content/education/destinations');
  const params: any[] = [];
  destinations.forEach((dest) => {
    params.push({ locale: 'en', country: dest.id });
    params.push({ locale: 'zh', country: dest.id });
  });
  return params;
}

export default async function CountryRedirect({ params }: { params: Promise<{ locale: string, country: string }> }) {
  const { locale, country } = await params;
  redirect(`/${locale}/destinations/${country}`);
}
