import { PrivacyPolicyPage } from '@/components/layouts/PrivacyPolicyPage';
import { privacyPolicyContent, privacyPolicyContentZh } from '@repo/apps-config/content/immigration/legal/privacy-policy';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <PrivacyPolicyPage content={locale === 'zh' ? privacyPolicyContentZh : privacyPolicyContent} />;
}
