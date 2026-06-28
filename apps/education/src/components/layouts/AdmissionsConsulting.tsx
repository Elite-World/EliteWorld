'use client';

import { HeroSection } from '@repo/ui';
import Image from 'next/image';
import { useLanguageStore } from '@repo/domain';
import {
  ALaCarteService,
  ServiceStep,
} from '@repo/apps-config/content/education/pricing/admissionsConsulting';
import { DestinationInfo } from '@repo/apps-config/content/education/destinations';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AdmissionsConsultingProps {
  serviceProcess: ServiceStep[];
  aLaCarteServices: ALaCarteService[];
  destinations: DestinationInfo[];
}

export function AdmissionsConsultingContent({
  serviceProcess,
  aLaCarteServices,
  destinations,
}: AdmissionsConsultingProps) {
  const language = useLanguageStore((state) => state.language);
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <HeroSection
        mode="page"
        title={isZh ? '升学指导' : 'Admissions Consulting'}
        subtitle={
          isZh
            ? '梦想进入顶尖学府，却对复杂的申请流程感到迷茫？您并不孤单。让我们一起开启这段旅程。'
            : 'Dreaming of a top-tier university, but overwhelmed by the application process? You\'re not alone. Let\'s navigate this journey together.'
        }
      />

      {/* Why EliteWorld / Value Proposition Section */}
      <div className="bg-white dark:bg-[#0a0a0a] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-4">
              {isZh ? '为什么选择我们' : 'Why Choose EliteWorld'}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto" />
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-6 text-lg">
              {isZh 
                ? '在规划您的未来之前，您需要知道自己正处于可靠的双手之中。在EliteWorld，我们不仅是修改文书——我们打造让招生官青睐的全面背景。我们用数据说话。' 
                : 'Before we start planning your future, you need to know you\'re in safe hands. At EliteWorld, we don\'t just edit essays—we build comprehensive profiles that admissions officers love. We speak with data.'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-2xl border border-gray-100 dark:border-white/5 text-center shadow-sm hover:shadow-xl transition duration-300">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 mb-4">
                98%
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                {isZh ? '名校录取率' : 'Top School Acceptance'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isZh ? '我们的学生绝大多数都获得了全球前50名大学的录取。' : 'The vast majority of our students receive offers from Top 50 global universities.'}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-2xl border border-gray-100 dark:border-white/5 text-center shadow-sm hover:shadow-xl transition duration-300">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 mb-4">
                100+
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                {isZh ? '常春藤/G5导师' : 'Ivy League & G5 Mentors'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isZh ? '我们的导师团队均毕业于世界最顶尖的学术殿堂。' : 'Our mentorship team graduated from the world’s most prestigious academic institutions.'}
              </p>
            </div>
            <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-2xl border border-gray-100 dark:border-white/5 text-center shadow-sm hover:shadow-xl transition duration-300">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 mb-4">
                5v1
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                {isZh ? '全方位服务模式' : 'Comprehensive Support'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {isZh ? '每位学生都配备由主顾问、文书导师、外籍导师等组成的5人专属团队。' : 'Every student is supported by a dedicated 5-person team including head consultants and native editors.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Destinations Section */}
      <div className="bg-gray-50 dark:bg-[#111] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-2">
              {isZh ? '探索目标国家与地区' : 'Explore Destinations'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-4 text-lg">
              {isZh
                ? '首先：您期望在哪里学习？无论是美国的常春藤联盟还是英国的G5名校，我们都有专门针对您梦想目的地的专家团队。您的目标是哪里？'
                : 'First things first: where do you see yourself studying? Whether it\'s the US Ivy League or the UK G5, we have highly specialized teams for your exact destination. Where to?'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="group relative rounded-2xl overflow-hidden h-64 border border-gray-100 dark:border-white/5 hover:border-blue-500/50 shadow-sm hover:shadow-2xl transition duration-300 flex items-end p-6"
              >
                <Image
                  src={dest.heroImage}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative z-10 w-full flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-bold text-2xl mb-1">{dest.name}</h3>
                    <p className="text-white/80 text-sm font-medium">{isZh ? '查看详情' : 'View Details'}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors shadow-lg">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Service Process Section */}
      <div className="bg-white dark:bg-[#0a0a0a] container-none py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-4">
              {isZh ? '服务流程' : 'Service Process'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-4 text-lg">
              {isZh
                ? '一旦您选择了梦想的目的地，我们如何带您到达那里？我们标志性的“5对1”服务模式确保不会遗漏任何细节。以下是您与我们共度的旅程，从第一天到顺利入学：'
                : 'Once you\'ve chosen your dream destination, how do we actually get you there? Our signature "5v1" framework ensures no detail is overlooked. Here is what your journey with us will look like, from day one to enrollment:'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {serviceProcess.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center gap-3 group">
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white/20 transition-transform group-hover:scale-110">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {step.title}
                  </span>
                </div>
                {idx < serviceProcess.length - 1 && (
                  <div className="hidden md:block w-12 h-0.5 bg-gray-300 dark:bg-white/10 ml-8 mb-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* A-La-Carte Services */}
      <div className="bg-gray-50 dark:bg-[#111] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-2">
              {isZh ? '专项附加服务' : 'Additional Support Services'}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mt-4" />
            <p className="text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mt-6 text-lg mb-4">
              {isZh
                ? '您的申请已经基本准备就绪？没问题。如果您只需要专家帮您润色文书，或者协助办理签证，我们提供针对性的单项支持服务。'
                : 'Already have your application mostly figured out? No problem. If you just need an expert eye on an essay or help securing your visa, we offer targeted, a-la-carte support.'}
            </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aLaCarteServices.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 p-8 flex flex-col md:flex-row gap-6 hover:border-blue-500/50 shadow-sm hover:shadow-xl transition group"
            >
              <div className="grow">
                <h3 className="text-xl font-bold text-[#010022] dark:text-white mb-2 group-hover:text-[#4c5cec] transition-colors">
                  {pkg.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {pkg.description}
                </p>
              </div>
              <div className="flex flex-col justify-center items-start md:items-end min-w-[140px]">
                <div className="text-2xl font-bold text-[#010022] dark:text-white mb-4">
                  {pkg.price}
                </div>
                <button className="px-6 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition active:scale-95">
                  {isZh ? '选择' : 'Select'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>

      {/* Global CTA Section */}
      <div className="bg-linear-to-br from-[#010022] to-blue-900 py-24 transition-colors duration-300 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {isZh ? '准备好开启您的名校之旅了吗？' : 'Ready to Start Your Journey to a Top School?'}
          </h2>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            {isZh 
              ? '不要让繁杂的申请流程阻碍您的潜力。立即预约免费的1对1战略咨询，我们的专家将为您定制专属的升学规划。' 
              : 'Don’t let the complex application process hold back your potential. Book a free 1-on-1 strategy call today, and our experts will customize your admissions roadmap.'}
          </p>
          <Link href="/contact" className="inline-block px-8 py-4 bg-white text-blue-900 rounded-full font-black text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300">
            {isZh ? '预约免费战略咨询' : 'Book a Free Strategy Call'}
          </Link>
        </div>
      </div>
    </div>
  );
}
