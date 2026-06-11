import { EssayCoachingContent } from '@/components/layouts/EssayCoaching';
import {
  getDocumentTypes,
  getPricingPackages,
} from '@repo/apps-config/content/education/pricing/essayCoaching';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <EssayCoachingContent
      documentTypes={getDocumentTypes(locale)}
      packages={getPricingPackages(locale)}
    />
  );
}
