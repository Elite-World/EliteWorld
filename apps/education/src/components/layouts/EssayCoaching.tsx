'use client';

import Image from 'next/image';
import { HeroSection } from '@repo/ui';
import { useLanguageStore } from '@repo/domain';

import {
  PackageItem,
  ServiceItem,
} from '@repo/apps-config/content/education/pricing/essayCoaching';

interface EssayCoachingProps {
  documentTypes: ServiceItem[];
  packages: PackageItem[];
}

export function EssayCoachingContent({
  documentTypes,
  packages,
}: EssayCoachingProps) {
  const language = useLanguageStore((state) => state.language);
  const isZh = language === 'zh';

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <HeroSection
        mode="page"
        title={isZh ? '文书辅导' : 'Essay Coaching'}
        subtitle={isZh ? '由常春藤联盟校友和招生专家制作的引人入胜的叙述' : 'Compelling narratives crafted by Ivy League alumni and admissions experts'}
      />

      {/* Global Documents Section */}
      <div className="bg-gray-50 dark:bg-[#111] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-4">
              {isZh ? '全球申请文书' : 'Global Application Documents'}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {documentTypes.map((item) => (
              <div
                key={item.id}
                className="relative aspect-4/3 rounded-xl overflow-hidden group cursor-pointer shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-white/5"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 transform transition-transform duration-300 group-hover:translate-x-1">
                  <span className="text-white font-bold text-sm md:text-base tracking-wide border-l-4 border-blue-500 pl-3">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Packages Section */}
      <div className="bg-white dark:bg-[#0a0a0a] py-16 md:py-24 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#010022] dark:text-white mb-4">
              {isZh ? '服务套餐' : 'Service Packages'}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto" />
          </div>

          <div className="space-y-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/5"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8 border-b border-gray-200/50 dark:border-white/10 pb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#010022] dark:text-white mb-2">
                      {pkg.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {pkg.subtitle}
                    </p>
                  </div>
                  {pkg.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0 md:justify-end">
                      {pkg.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Side: Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 grow">
                    {/* Price */}
                    <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-transparent dark:border-white/5 min-h-[100px] flex flex-col justify-center">
                      <h3 className="font-bold text-[#010022] dark:text-white text-sm mb-2 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#4c5cec] rounded-full" />
                        Price
                      </h3>
                      <div className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500 mb-1">
                        {pkg.price}
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight">
                        * Price may vary based on document type
                      </p>
                    </div>

                    {/* Service Category */}
                    <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-transparent dark:border-white/5 min-h-[100px] flex flex-col justify-center">
                      <h3 className="font-bold text-[#010022] dark:text-white text-sm mb-2 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#4c5cec] rounded-full" />
                        Service
                      </h3>
                      <div className="space-y-1.5">
                        {pkg.features
                          .find((f) => f.label === 'Service')
                          ?.value.split('\n')
                          .map((line, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-xs font-medium"
                            >
                              <div className="w-1.5 h-1.5 rotate-45 bg-[#a3b1ff] rounded-[0.5px]" />
                              <span>{line}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Validity */}
                    <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-transparent dark:border-white/5 min-h-[100px] flex flex-col justify-center">
                      <h3 className="font-bold text-[#010022] dark:text-white text-sm mb-2 flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#4c5cec] rounded-full" />
                        Validity
                      </h3>
                      <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold text-xl">
                        <div className="w-1.5 h-1.5 rotate-45 bg-linear-to-br from-blue-500 to-purple-500 rounded-[0.5px]" />
                        <span>
                          {
                            pkg.features.find((f) => f.label === 'Validity')
                              ?.value
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Description & CTA */}
                  <div className="lg:w-1/3 flex flex-col justify-between gap-4">
                    <div className="bg-white/60 dark:bg-white/5 p-4 rounded-xl grow border border-transparent dark:border-white/5">
                      <h3 className="font-bold text-[#010022] dark:text-white text-sm mb-2">
                        Service Description
                      </h3>
                      <div className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 rotate-45 bg-[#a3b1ff] rounded-[0.5px] mt-1.5 shrink-0" />
                        <p className="leading-relaxed text-sm">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
