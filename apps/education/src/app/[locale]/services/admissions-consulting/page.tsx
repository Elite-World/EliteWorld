import { AdmissionsConsultingContent } from '@/components/layouts/AdmissionsConsulting';
import {
  getDiyPackages,
  getHighEndPackages,
  getMentorTeams,
  getServiceProcess,
} from '@repo/apps-config/content/education/pricing/admissionsConsulting';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <AdmissionsConsultingContent
      mentorTeams={getMentorTeams(locale)}
      serviceProcess={getServiceProcess(locale)}
      highEndPackages={getHighEndPackages(locale)}
      diyPackages={getDiyPackages(locale)}
    />
  );
}
