'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe2, Briefcase, Landmark } from 'lucide-react';

interface JurisdictionCardData {
  country: {
    slug: string;
    name?: { en: string; cn?: string };
    translations?: {
      en?: { name: string };
      cn?: { name: string };
    };
  };
  profile: {
    tax_profile: { corporate_tax: string };
    passport_power: { visa_free_score: number };
  };
  solutionCount: number;
}

interface DestinationsGridProps {
  jurisdictions: JurisdictionCardData[];
  locale: string;
}

function DestinationCard({ data, locale }: { data: JurisdictionCardData; locale: string }) {
  const [imgError, setImgError] = useState(false);
  
  // Try to use a static image based on slug if we eventually add them to public folder,
  // or a cloudinary image. For now, we will try a cloudinary generic url.
  // We can use the same Cloudinary setup as Education if we upload images there.
  const src = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dr435quj2'}/image/upload/elite-world/destinations/${data.country.slug}.jpg`;
  
  const dbLocale = locale === 'zh' ? 'cn' : 'en';
  // @ts-ignore
  const countryName = data.country.translations?.[dbLocale]?.name || data.country.name?.[dbLocale] || data.country.name?.en || 'Unknown';

  return (
    <Link 
      href={`/destinations/${data.country.slug}`} 
      className="group relative rounded-4xl overflow-hidden flex flex-col h-[480px] hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl shadow-blue-900/5 bg-zinc-950"
    >
      {/* Background Image / Fallback */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-900/80 to-transparent z-10" />
        
        {imgError ? (
          /* Premium Mesh Gradient Fallback */
          <div className="absolute inset-0 z-0">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen group-hover:bg-blue-500/40 transition-colors duration-700" />
            <div className="absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen group-hover:bg-purple-500/30 transition-colors duration-700" />
            <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>
        ) : (
          <Image 
            src={src} 
            alt={countryName}
            fill
            className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
            onError={() => setImgError(true)}
            unoptimized // Using unoptimized in case cloudinary domain isn't configured in next.config.js yet
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full p-8 text-white">
        
        <div className="mb-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold mb-4">
            <Globe2 className="w-3.5 h-3.5" />
            {locale === 'zh' ? '司法管辖区简介' : 'Jurisdiction Profile'}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-black uppercase tracking-tight mb-6">
            {countryName}
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Landmark className="w-3 h-3" /> {locale === 'zh' ? '企业税' : 'Corp Tax'}
              </span>
              <span className="font-bold text-lg text-white">{data.profile.tax_profile.corporate_tax}</span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Globe2 className="w-3 h-3" /> {locale === 'zh' ? '护照分数' : 'Passport Score'}
              </span>
              <span className="font-bold text-lg text-emerald-400">{data.profile.passport_power.visa_free_score}</span>
            </div>

            <div className="flex flex-col gap-1 col-span-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> {locale === 'zh' ? '有效途径' : 'Active Pathways'}
              </span>
              <span className="font-bold text-sm text-gray-200">{data.solutionCount} {locale === 'zh' ? '种移民方案' : 'Mobility Solutions'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest group-hover:text-blue-400 transition-colors">
            {locale === 'zh' ? '查看简介' : 'View Profile'} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function DestinationsGrid({ jurisdictions, locale }: DestinationsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jurisdictions.map((j) => (
        <DestinationCard key={j.country.slug} data={j} locale={locale} />
      ))}
    </div>
  );
}
