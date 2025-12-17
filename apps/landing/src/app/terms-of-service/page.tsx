import { LayoutProvider } from '@/components/providers/LayoutProvider';
import { termsOfServiceContent } from '@/config/legal/terms-of-service';

export default function TermsOfServicePage() {
  return (
    <LayoutProvider 
      layoutName="TermsOfServicePage"
      data={{
        content: termsOfServiceContent
      }}
    />
  );
}