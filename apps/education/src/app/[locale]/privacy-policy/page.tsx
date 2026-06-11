import { PrivacyPolicyPage } from '@/components/layouts/PrivacyPolicyPage';
import { privacyPolicyContent, privacyPolicyContentZh } from '@repo/apps-config/content/education/legal/privacy-policy';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivacyPolicyPage content={locale === 'zh' ? privacyPolicyContentZh : privacyPolicyContent} />;
}
