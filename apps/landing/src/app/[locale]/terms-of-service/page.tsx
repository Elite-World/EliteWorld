import { TermsOfServicePage } from '@/components/layouts/TermsOfServicePage';
import { termsOfServiceContent } from '@repo/apps-config/content/landing/legal/terms-of-service';

export default function Page() {
  return <TermsOfServicePage content={termsOfServiceContent} />;
}
