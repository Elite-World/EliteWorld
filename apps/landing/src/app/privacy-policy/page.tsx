import { LayoutProvider } from '@/components/providers/LayoutProvider';
import { privacyPolicyContent } from '@/config/legal/privacy-policy';

export default function PrivacyPolicyPage() {
  return (
    <LayoutProvider 
      layoutName="PrivacyPolicyPage"
      data={{
        content: privacyPolicyContent
      }}
    />
  );
}