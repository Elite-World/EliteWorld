'use client';

import React from 'react';
import { ICountry, IJurisdictionProfile, IMobilitySolution } from '@repo/domain';
import { cn } from '@repo/domain';
import { Globe2, ArrowRight, Briefcase, Landmark } from 'lucide-react';
import Link from 'next/link';

interface JurisdictionTemplateProps {
  country: ICountry;
  profile?: IJurisdictionProfile | null;
  solutions: IMobilitySolution[];
  relatedNews?: any[];
  locale: string;
}

export function JurisdictionTemplate({ country, profile, solutions, relatedNews = [], locale }: JurisdictionTemplateProps) {
  const dbLocale = locale === 'zh' ? 'cn' : 'en';
  // @ts-ignore
  const countryName = country.translations?.[dbLocale]?.name || country.name?.[dbLocale] || country.name?.en || 'Unknown';
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      
      {/* 1. Cinematic Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-zinc-950">
          {/* Premium Mesh Gradient Fallback */}
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-10000" />
          <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute top-[20%] left-[40%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen" />
          
          {/* Subtle noise/texture overlay for a more physical feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                {locale === 'zh' ? '司法管辖区概况' : 'Jurisdiction Profile'}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
              {countryName}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium max-w-2xl">
              {locale === 'zh' ? `在 ${countryName} 建立业务的战略情报与流动途径。` : `Strategic intelligence and mobility pathways for establishing presence in ${countryName}.`}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Intelligence Dashboard */}
      {profile && (
        <section className="pt-16 pb-8 relative z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Passport Power Card */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-white">{locale === 'zh' ? '护照实力' : 'Passport Power'}</h3>
                </div>
                
                <div className="mb-8">
                  <div className="text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                    {profile.passport_power.visa_free_score}
                  </div>
                  <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">{locale === 'zh' ? '免签目的地' : 'Visa-Free Destinations'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: locale === 'zh' ? '申根区' : 'Schengen Area', access: profile.passport_power.access_to_schengen },
                    { label: locale === 'zh' ? '美国' : 'United States', access: profile.passport_power.access_to_us },
                    { label: locale === 'zh' ? '英国' : 'United Kingdom', access: profile.passport_power.access_to_uk },
                    { label: locale === 'zh' ? '中国' : 'China', access: profile.passport_power.access_to_china },
                  ].map((region, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        region.access ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500"
                      )} />
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-300 uppercase">{region.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax Profile Card */}
              <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black uppercase tracking-widest text-gray-900 dark:text-white">{locale === 'zh' ? '税务概况' : 'Tax Profile'}</h3>
                </div>

                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{locale === 'zh' ? '企业税' : 'Corporate Tax'}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{profile.tax_profile.corporate_tax}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{locale === 'zh' ? '个人所得税' : 'Personal Income'}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">{profile.tax_profile.personal_tax}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{locale === 'zh' ? '资本利得税' : 'Capital Gains'}</p>
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{profile.tax_profile.capital_gains}</p>
                  </div>
                  {profile.tax_profile.crypto_tax && (
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{locale === 'zh' ? '加密货币税' : 'Crypto Tax'}</p>
                      <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{profile.tax_profile.crypto_tax}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 3. Solutions & Pathways */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {locale === 'zh' ? `${countryName} 的移民方案` : `Mobility Solutions in ${countryName}`}
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-blue-600 to-purple-600 mt-4" />
          </div>

          {solutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((sol) => {
                // @ts-ignore
                const solName = sol.translations?.[dbLocale]?.name || sol.name?.[dbLocale] || sol.name?.en || 'Unknown';
                // @ts-ignore
                const solDesc = sol.translations?.[dbLocale]?.description || sol.description || '';
                // @ts-ignore
                const solReq = sol.translations?.[dbLocale]?.requirements || sol.requirements || {};
                
                return (
                <div key={sol._id?.toString()} className="group bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {sol.category.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                    {solName}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 grow">
                    {solDesc}
                  </p>

                  <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{locale === 'zh' ? '投资额' : 'Investment'}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{solReq.investment_amount || (locale === 'zh' ? '视情况而定' : 'Varies')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{locale === 'zh' ? '办理时间' : 'Timeframe'}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{solReq.timeframe || (locale === 'zh' ? '视情况而定' : 'Varies')}</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    {/* Use original english name for URLs, or default to slugification of current name if english missing */}
                    <Link href={`/programs/${(sol.name?.en || solName).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${sol._id}`} className="w-full py-4 rounded-xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {locale === 'zh' ? '查看详情' : 'View Details'}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 border border-dashed border-gray-300 dark:border-white/20 rounded-3xl text-center">
              <p className="text-gray-500 dark:text-gray-400 font-medium">{locale === 'zh' ? '该目的地目前没有发布的移民方案。' : 'No mobility solutions are currently published for this jurisdiction.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. News & Updates Section */}
      <section className="py-24 bg-white dark:bg-[#111] border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              {locale === 'zh' ? '目的地' : 'Jurisdiction'} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">{locale === 'zh' ? '新闻与动态' : 'News & Updates'}</span>
            </h2>
            <div className="w-16 h-1 bg-linear-to-r from-blue-600 to-purple-600 mt-4" />
          </div>

          {relatedNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((article) => (
                <Link key={article.id} href={`/insights/${article.slug}`} className="group block">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={article.image || '/images/placeholder.jpg'} 
                      alt={article.title}
                      loading="lazy"
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                      {article.date}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 border border-dashed border-gray-300 dark:border-white/20 rounded-3xl text-center max-w-2xl mx-auto bg-gray-50 dark:bg-white/5">
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {locale === 'zh' ? '该目的地暂无最近的新闻或政策更新。' : 'No recent news or policy updates published for this jurisdiction yet.'}
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
