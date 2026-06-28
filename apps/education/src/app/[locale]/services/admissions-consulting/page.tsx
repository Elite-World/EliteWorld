import { AdmissionsConsultingContent } from '@/components/layouts/AdmissionsConsulting';
import {
  getALaCarteServices,
  getServiceProcess,
} from '@repo/apps-config/content/education/pricing/admissionsConsulting';
import { getDestinations } from '@repo/apps-config/content/education/destinations';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <AdmissionsConsultingContent
      serviceProcess={getServiceProcess(locale)}
      aLaCarteServices={getALaCarteServices(locale)}
      destinations={getDestinations(locale)}
    />
  );
}
