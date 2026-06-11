import { TermsOfServicePage } from '@/components/layouts/TermsOfServicePage';
import { termsOfServiceContent, termsOfServiceContentZh } from '@repo/apps-config/content/education/legal/terms-of-service';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TermsOfServicePage content={locale === 'zh' ? termsOfServiceContentZh : termsOfServiceContent} />;
}
