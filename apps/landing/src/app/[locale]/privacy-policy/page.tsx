import { PrivacyPolicyPage } from '@/components/layouts/PrivacyPolicyPage';
import { privacyPolicyContent } from '@repo/apps-config/content/landing/legal/privacy-policy';

export default function Page() {
  return <PrivacyPolicyPage content={privacyPolicyContent} />;
}
