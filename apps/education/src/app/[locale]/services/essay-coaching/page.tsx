import { EssayCoachingContent } from '@/components/layouts/EssayCoaching';
import {
  documentTypes,
  pricingPackages,
} from '@repo/apps-config/content/education/pricing/essayCoaching';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default function Page() {
  return (
    <EssayCoachingContent
      documentTypes={documentTypes}
      packages={pricingPackages}
    />
  );
}
