import { TermsOfServicePage } from '@/components/layouts/TermsOfServicePage';
import { termsOfServiceContent } from '@repo/apps-config/content/education/legal/terms-of-service';

export default function Page() {
  return <TermsOfServicePage content={termsOfServiceContent} />;
}
