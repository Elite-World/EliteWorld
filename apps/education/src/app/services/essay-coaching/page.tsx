import { EssayCoachingContent } from '@/components/layouts/EssayCoaching';
import {
  documentTypes,
  pricingPackages,
} from '@repo/web-shared/content/education/pricing/essayCoaching';

export default function Page() {
  return (
    <EssayCoachingContent
      documentTypes={documentTypes}
      packages={pricingPackages}
    />
  );
}
