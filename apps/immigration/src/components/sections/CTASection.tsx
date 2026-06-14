'use client';;
import Link from 'next/link';
import { Building2 } from 'lucide-react';

export default function CTASection({
  isZh,
}: {
  isZh: boolean;
}) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-900" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565153995831-29e2f4a4bc3b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="max-w-4xl mx-auto backdrop-blur-xl bg-black/40 border border-white/10 p-12 md:p-20 rounded-3xl text-center shadow-2xl animate-in fade-in duration-500">
          <Building2 className="w-12 h-12 text-blue-400 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
            {isZh ? '点亮全球足迹' : 'Establish Your'} <br />{' '}
            {isZh ? '拓展国际格局' : 'Global Presence'}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto mb-12">
            {isZh
              ? '与我们的移民顾问交谈，为您的家庭的全球流动性和财富保值规划专属战略。'
              : "Speak with our senior immigration counsel to architect a bespoke strategy for your family's global mobility and wealth preservation."}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/book-consultation"
              className="px-8 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 transition-transform w-full sm:w-auto"
            >
              {isZh ? '预约私人咨询' : 'Schedule Private Consultation'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
