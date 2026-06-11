import { HomePage } from '@/components/layouts/HomePage';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default function Home() {
  return <HomePage />;
}
