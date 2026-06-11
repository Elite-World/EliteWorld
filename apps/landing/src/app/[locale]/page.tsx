import { HomePage } from '@/components/layouts/HomePage';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}
