import { ServicesContent } from '@/components/layouts/Services';
import {
  getServicesPricingData,
  getServicesComparisonData,
  getServicesTabOptions,
  getServicesTestimonials,
  getServicesFAQs,
} from '@repo/apps-config/content/education/pricing/servicesPricing';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <ServicesContent
      initialPricingData={getServicesPricingData(locale)}
      initialComparisonData={getServicesComparisonData(locale)}
      initialTabOptions={getServicesTabOptions(locale)}
      initialTestimonials={getServicesTestimonials(locale)}
      initialFAQs={getServicesFAQs(locale)}
      locale={locale}
    />
  );
}
