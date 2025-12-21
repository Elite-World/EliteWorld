import { AdmissionsConsultingContent } from '@/components/layouts/AdmissionsConsulting';
import {
  diyPackages,
  highEndPackages,
  mentorTeams,
  serviceProcess,
} from '@repo/web-shared/content/education/pricing/admissionsConsulting';

export default function Page() {
  return (
    <AdmissionsConsultingContent
      mentorTeams={mentorTeams}
      serviceProcess={serviceProcess}
      highEndPackages={highEndPackages}
      diyPackages={diyPackages}
    />
  );
}
