import { ConsultationBooking } from '@repo/domain';

export const metadata = {
  title: 'Book a Consultation | Elite World Immigration',
  description: 'Schedule a confidential advisory consultation to discuss your global mobility and wealth structuring strategies.',
};

export default function BookConsultationPage() {
  return (
    <main className="bg-slate-50/50 dark:bg-[#0a0a0a] min-h-screen">
      <ConsultationBooking />
    </main>
  );
}
