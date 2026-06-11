import { TermsOfServicePage } from '@/components/layouts/TermsOfServicePage';
import { termsOfServiceContent, termsOfServiceContentZh } from '@repo/apps-config/content/immigration/legal/terms-of-service';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TermsOfServicePage content={locale === 'zh' ? termsOfServiceContentZh : termsOfServiceContent} />;
}
