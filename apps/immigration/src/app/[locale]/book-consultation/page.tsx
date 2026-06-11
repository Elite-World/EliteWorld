import { ConsultationBooking } from '@repo/domain';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '预约咨询 | EliteWorld 移民' : 'Book a Consultation | Elite World Immigration',
    description: isZh ? '安排一次保密的顾问咨询，讨论您的全球身份规划和资产架构策略。' : 'Schedule a confidential advisory consultation to discuss your global mobility and wealth structuring strategies.',
  };
}

export default function BookConsultationPage() {
  return (
    <main className="bg-slate-50/50 dark:bg-[#0a0a0a] min-h-screen">
      <ConsultationBooking />
    </main>
  );
}
