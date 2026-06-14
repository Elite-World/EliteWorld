import React from 'react';
import { HeroSection } from '@repo/ui';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SOLUTION_CATEGORIES } from '@repo/apps-config/content/immigration/solutions-content';

import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? '全球身份规划方案 | EliteWorld 移民' : 'Global Mobility Solutions | EliteWorld Immigration',
    description: isZh ? '探索我们面向全球的投资居留、第二公民身份以及公司架构规划方案组合。' : 'Explore our portfolio of residency, citizenship, and corporate structuring solutions worldwide.',
  };
}

export default async function SolutionsHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isZh = locale === 'zh';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <HeroSection 
        title={isZh ? '全球解决方案矩阵' : 'Global Solutions Matrix'}
        subtitle={isZh 
          ? '全球对比流动性通道。无论您是寻求第二护照、欧洲居留权还是税务优化，都能在此找到完美的战略载体。'
          : 'Compare mobility pathways globally. Whether you seek a second passport, European residency, or tax efficiency, find the perfect strategic vehicle.'}
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2400"
        mode="page"
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
              {isZh ? '选择' : 'Select a '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '规划方案' : 'Pathway'}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              {isZh 
                ? '按类别选择浏览我们的方案组合，发现哪个司法管辖区为您的目标提供最佳的战略优势。'
                : 'Browse our portfolio horizontally by category to discover which jurisdiction offers the best strategic advantage for your goals.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {SOLUTION_CATEGORIES.map((cat) => (
              <Link 
                href={`/solutions/${cat.id}`}
                key={cat.id}
                className="group relative rounded-4xl overflow-hidden flex flex-col h-[400px] shadow-xl hover:shadow-2xl transition duration-500 hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors duration-500 z-10" />
                  <div className={`absolute inset-0 bg-linear-to-t ${cat.color} mix-blend-overlay opacity-60 z-10`} />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
                  <Image 
                    src={cat.img} 
                    alt={isZh ? cat.title.zh : cat.title.en} 
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                    unoptimized
                  />
                </div>

                <div className="relative z-20 flex flex-col h-full p-10 text-white justify-end">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 text-white group-hover:scale-110 transition-transform duration-500">
                    {cat.icon}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
                    {isZh ? cat.title.zh : cat.title.en}
                  </h3>
                  <p className="text-gray-300 font-medium mb-8 text-lg max-w-md">
                    {isZh ? cat.description.zh : cat.description.en}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-white/80 transition-colors">
                    {isZh ? '探索方案' : 'Explore Solutions'} <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ambient Effects */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none transform-gpu will-change-transform" />
      </section>
    </div>
  );
}
