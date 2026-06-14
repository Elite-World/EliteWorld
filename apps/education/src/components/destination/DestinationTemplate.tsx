'use client';

import React from 'react';
import { HeroSection } from '@repo/ui';
import { DestinationInfo, MustKnowItem } from '@repo/apps-config/content/education/destinations';
import { Landmark, Wallet, Briefcase, Heart, ArrowRight, Building2, Users, BookOpen, GraduationCap, Trophy, Rocket, Globe } from 'lucide-react';
import Link from 'next/link';

const iconMap = {
  Landmark,
  Wallet,
  Briefcase,
  Heart,
  BookOpen,
  GraduationCap,
  Trophy,
  Rocket,
  Globe
};

export function DestinationTemplate({ data, locale = 'en' }: { data: DestinationInfo; locale?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <HeroSection 
        title={locale === 'zh' ? `在 ${data.name} 留学` : `Study in ${data.name}`}
        subtitle={data.tagline}
        backgroundImage={data.heroImage}
        mode="page"
      />

      {/* Stats Ribbon */}
      <div className="relative -mt-16 z-20 container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-2xl rounded-4xl border border-gray-100 dark:border-white/10 shadow-2xl">
          {[
            { icon: Building2, label: locale === 'zh' ? '大学' : 'Universities', value: data.stats.universities },
            { icon: Users, label: locale === 'zh' ? '国际学生' : 'Intl. Students', value: data.stats.internationalStudents },
            { icon: Wallet, label: locale === 'zh' ? '平均学费' : 'Avg. Tuition', value: data.stats.avgTuition },
            { icon: Briefcase, label: locale === 'zh' ? '毕业后工作' : 'Post-Study Work', value: data.stats.postStudyWork },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-6 text-center rounded-2xl bg-gray-50 dark:bg-white/5 border border-transparent dark:hover:border-white/10 transition-colors">
              <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-sm md:text-base font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
              {locale === 'zh' ? '在这里' : 'What to Expect in'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{data.name}</span> {locale === 'zh' ? '有什么期待？' : ''}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.mustKnows.map((item: MustKnowItem) => {
              const Icon = iconMap[item.iconName as keyof typeof iconMap] || Heart;
              return (
                <div 
                  key={item.id}
                  className="group relative p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition duration-500 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <Icon className="w-32 h-32" />
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-8 border border-blue-100 dark:border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Why Study Here Section */}
          {data.whyStudyHere && data.whyStudyHere.length > 0 && (
            <div className="mt-32">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
                  {locale === 'zh' ? '为什么选择在' : 'Why Study in'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-emerald-500">{data.name}</span> {locale === 'zh' ? '留学？' : '?'}
                </h2>
                <div className="h-1 w-20 bg-linear-to-r from-blue-600 to-emerald-500 mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.whyStudyHere.map((item: MustKnowItem) => {
                  const Icon = iconMap[item.iconName as keyof typeof iconMap] || Trophy;
                  return (
                    <div 
                      key={item.id}
                      className="group relative p-8 rounded-3xl bg-linear-to-b from-white to-gray-50 dark:from-[#1A1A1A] dark:to-[#111] border border-gray-100 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition duration-500 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition duration-500">
                        <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <div className="inline-block p-1 rounded-full bg-linear-to-r from-blue-600 to-purple-600">
              <Link 
                href={`/universities?country=${encodeURIComponent(data.name)}`}
                className="flex items-center gap-4 px-8 py-4 rounded-full bg-white dark:bg-[#0a0a0a] hover:bg-transparent dark:hover:bg-transparent transition duration-300 group"
              >
                <span className="font-black text-gray-900 dark:text-white group-hover:text-white uppercase tracking-widest text-sm">
                  {locale === 'zh' ? `探索 ${data.name} 的大学` : `Explore Universities in ${data.name}`}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ArrowRight className="w-4 h-4 text-gray-900 dark:text-white" />
                </div>
              </Link>
            </div>
          </div>

        </div>

        {/* Ambient Background Blur */}
        <div className="hidden md:block absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2 transform-gpu will-change-transform" />
        <div className="hidden md:block absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2 transform-gpu will-change-transform" />
      </section>
    </div>
  );
}
