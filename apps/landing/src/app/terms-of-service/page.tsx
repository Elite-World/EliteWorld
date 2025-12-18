import { TermsOfServicePage } from '@/components/layouts/TermsOfServicePage';
import { termsOfServiceContent } from '@repo/web-shared/content/landing/legal/terms-of-service';

export default function Page() {
  return <TermsOfServicePage content={termsOfServiceContent} />;
}
