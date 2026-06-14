'use client';

import { HeroSection } from '@repo/ui';
import Image from 'next/image';
import { useLanguageStore } from '@repo/domain';
import {
  DIYPackage,
  HighEndPackage,
  MentorTeam,
  ServiceStep,
} from '@repo/apps-config/content/education/pricing/admissionsConsulting';

interface AdmissionsConsultingProps {
  mentorTeams: MentorTeam[];
  serviceProcess: ServiceStep[];
  highEndPackages: HighEndPackage[];
  diyPackages: DIYPackage[];
}

export function AdmissionsConsultingContent({
  mentorTeams,
  serviceProcess,
  highEndPackages,
  diyPackages,
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
            ? '精英导师团队提供端到端指导'
            : 'End-to-end guidance from elite mentor teams'
        }
      />

      {/* Mentor Team Section */}
      <div className="bg-gray-50 dark:bg-[#111] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-4">
              {isZh ? '导师团队介绍' : 'Mentor Team Introduction'}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mentorTeams.map((team) => (
              <div
                key={team.id}
                className="bg-white dark:bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-white/5 transition duration-300 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={team.image}
                    alt={team.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{team.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-2">
                    {team.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {team.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4">
                    {team.description}
                  </p>

                  <div className="flex justify-between items-center border-t border-gray-100 dark:border-white/10 pt-4">
                    <div className="text-center">
                      <div className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 font-bold text-xl">
                        {team.stats.served}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {isZh ? '已服务人数' : 'Served'}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />
                    <div className="text-center">
                      <div className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 font-bold text-xl">
                        {team.stats.score}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        {isZh ? '录取率' : 'Score'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Process Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-4">
            {isZh ? '服务流程' : 'Service Process'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {isZh
              ? '我们的“5对1”专属服务模式确保从头脑风暴到入学的每一步都有精准指导。'
              : 'Our "5v1" exclusive service model ensures precision guidance at every step, from brainstorming to enrollment.'}
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
                <div className="hidden md:block w-12 h-0.5 bg-gray-200 dark:bg-white/10 ml-8 mb-6" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* High-End Pricing Section */}
      <div className="bg-[#f8f9fa] dark:bg-[#111] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-2">
              {isZh ? '高端申请服务' : 'High-End Applications'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {isZh
                ? '为精英录取提供的高端定制服务'
                : 'Premium bespoke services for elite admissions'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highEndPackages.map((pkg, idx) => (
              <div
                key={pkg.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-white/5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#010022] dark:text-white mb-6 pr-8">
                  {pkg.title}
                </h3>
                <div className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 text-3xl font-bold mb-8">
                  {pkg.price}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {isZh ? '地区' : 'Region'}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      {pkg.region}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {isZh ? '学校' : 'Schools'}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      {pkg.schoolCount}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {isZh ? '额外学校' : 'Extra School'}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      {pkg.extraPrice}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 dark:border-white/5 pb-3">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      {isZh ? '服务周期' : 'Validity'}
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-sm">
                      {pkg.validity}
                    </span>
                  </div>
                </div>

                <button className="w-full mt-8 bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-bold shadow-md hover:shadow-lg transition hover:scale-[1.02] active:scale-[0.98]">
                  {isZh ? '立即预订' : 'Book Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DIY Packages */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-2">
            {isZh ? '留学 DIY 服务' : 'Study Abroad DIY Services'}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diyPackages.map((pkg) => (
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
  );
}
