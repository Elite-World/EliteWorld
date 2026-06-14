'use client';;
import { ChevronRight } from 'lucide-react';
import { Button } from '@repo/ui';

export default function CTASection({ isZh }: { isZh: boolean }) {
  return (
    <section className="py-32 relative overflow-hidden bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 opacity-50" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />
      <div
        className="container mx-auto px-4 relative z-10 text-center animate-in fade-in duration-500">
        <div className="mb-12">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-tight mb-6">
            {isZh ? '准备好规划您的' : 'Ready to architect'} <br />{' '}
            {isZh ? '' : 'your '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              {isZh ? '未来了吗？' : 'Future?'}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            {isZh
              ? '启动与我们合伙人的保密咨询。您的全球之旅由此开始。'
              : 'Initiate a confidential consultation with our partner faculty. Your journey to global status begins here.'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <Button
            variant="hero"
            className="px-10 py-5 h-auto text-[10px]"
            rightIcon={
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            }
          >
            {isZh ? '预约咨询' : 'Schedule Consultation'}
          </Button>
          <Button
            variant="hero-outline"
            className="px-10 py-5 h-auto text-[10px]"
          >
            {isZh ? '获取简章' : 'Request Prospectus'}
          </Button>
        </div>
      </div>
    </section>
  );
}
