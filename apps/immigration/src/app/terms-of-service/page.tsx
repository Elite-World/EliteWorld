import { TermsOfServicePage } from '@/components/layouts/TermsOfServicePage';
import { termsOfServiceContent } from '@repo/web-shared/content/immigration/legal/terms-of-service';

export default function Page() {
  return <TermsOfServicePage content={termsOfServiceContent} />;
}
