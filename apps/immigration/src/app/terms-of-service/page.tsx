import { TermsOfServicePage } from '@/components/layouts/TermsOfServicePage';
import { termsOfServiceContent } from '@repo/apps-config/content/immigration/legal/terms-of-service';

export default function Page() {
  return <TermsOfServicePage content={termsOfServiceContent} />;
}
