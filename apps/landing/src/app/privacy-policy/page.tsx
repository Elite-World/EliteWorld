import { PrivacyPolicyPage } from '@/components/layouts/PrivacyPolicyPage';
import { privacyPolicyContent } from '@repo/web-shared/content/landing/legal/privacy-policy';

export default function Page() {
  return <PrivacyPolicyPage content={privacyPolicyContent} />;
}
