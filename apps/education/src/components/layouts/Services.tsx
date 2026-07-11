'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroSection } from '@repo/ui';
// Removed useLanguageStore as data is passed from server
import { Check, X } from 'lucide-react';

import { SegmentedControl } from '@repo/ui';
import {
  PricingTier,
  TabPricing,
  ComparisonCategory,
  TabOption,
  Testimonial,
  FAQ,
} from '@repo/apps-config/content/education/pricing/servicesPricing';


function PricingCard({
  title,
  price,
  originalPrice,
  unit,
  description,
  buttonText,
  features,
}: PricingTier) {
  return (
    <div
      className="group bg-white dark:bg-[#1A1A1A] rounded-3xl overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm border border-gray-200/60 dark:border-white/5 hover:border-[#4C5CEC] hover:shadow-[#4C5CEC]/20"
    >
      <div>
        <div className="relative flex items-center pl-6 h-14 text-xs font-black tracking-wider uppercase border-b border-gray-200/50 dark:border-white/10 transition-colors duration-300 bg-gray-50 dark:bg-zinc-800/40 group-hover:bg-[#4C5CEC] text-gray-900 dark:text-gray-200 group-hover:text-white overflow-hidden">
          <div 
            className="absolute inset-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(0, 0, 0, 0.03) 6px, rgba(0, 0, 0, 0.03) 12px)'
            }}
          />
          <span className="relative z-10">{title}</span>
        </div>
        <div className="p-6 md:p-8">
          <div className="min-h-[150px] sm:min-h-[170px] md:min-h-[190px] lg:min-h-[160px]">
            <div className="mb-4">
              {originalPrice ? (
                <div className="text-gray-400 line-through text-sm font-semibold mb-1">
                  {originalPrice}
                </div>
              ) : (
                <div className="text-sm font-semibold mb-1 invisible select-none" aria-hidden="true">
                  &nbsp;
                </div>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
                  {price}
                </span>
                {unit && (
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {unit}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              {description}
            </p>
          </div>

          <Link
            href="/#contact"
            className="block w-full font-bold py-3.5 px-6 rounded-full transition-all duration-300 text-center text-sm cursor-pointer mb-8 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 shadow-xs group-hover:bg-[#4C5CEC] group-hover:text-white group-hover:shadow-md group-hover:shadow-[#4C5CEC]/30"
          >
            {buttonText}
          </Link>

          <div className="space-y-4 border-t border-gray-200/50 dark:border-white/10 pt-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
              >
                {!feat.isHeader ? (
                  <>
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#4C5CEC] dark:text-blue-400 stroke-3" />
                    <span>{feat.text}</span>
                  </>
                ) : (
                  <span className="text-gray-500 font-normal mt-1 mb-1 block">
                    {feat.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ item }: { item: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 dark:border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-6 flex items-center justify-between focus:outline-hidden cursor-pointer"
      >
        <span className="font-bold text-gray-900 dark:text-gray-100 pr-8">{item.question}</span>
        <div className={`shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400"/>
          </svg>
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

interface ServicesContentProps {
  initialPricingData: Record<'consultation' | 'guidance' | 'onboard' | 'turnaround', TabPricing>;
  initialComparisonData: Record<'consultation' | 'guidance' | 'onboard' | 'turnaround', ComparisonCategory[]>;
  initialTabOptions: TabOption[];
  initialTestimonials: Testimonial[];
  initialFAQs: FAQ[];
  locale: string;
}

export function ServicesContent({
  initialPricingData,
  initialComparisonData,
  initialTabOptions,
  initialTestimonials,
  initialFAQs,
  locale,
}: ServicesContentProps) {
  const isZh = locale === 'zh';
  const [activeTab, setActiveTab] = useState<'consultation' | 'guidance' | 'onboard' | 'turnaround'>('consultation');

  const pricingData = initialPricingData;
  const dynamicComparisonData = initialComparisonData;
  const tabOptions = initialTabOptions;
  const testimonials = initialTestimonials;
  const faqs = initialFAQs;

  const renderCell = (val: string | boolean) => {
    if (typeof val === 'boolean') {
      return val ? (
        <div className="flex justify-center">
          <div className="w-6 h-6 rounded-full bg-[#4C5CEC] flex items-center justify-center shadow-xs">
            <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <X className="w-5 h-5 text-gray-300 dark:text-zinc-700 stroke-[2.5]" />
        </div>
      );
    }
    return <span className="text-sm font-semibold text-center block text-gray-700 dark:text-gray-300">{val}</span>;
  };
const getGridColsClass = (count: number) => {
  switch (count) {
    case 1:
      return 'md:grid-cols-1 max-w-sm';
    case 2:
      return 'md:grid-cols-2 max-w-3xl';
    case 4:
      return 'md:grid-cols-4 max-w-7xl';
    default:
      return 'md:grid-cols-3 max-w-6xl';
  }
};


  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <HeroSection
        mode="page"
        title={isZh ? '专业服务' : 'Our Services'}
        subtitle={isZh ? '量身定制的留学申请服务，助您进入理想学府' : 'Tailored application services to help you get into your dream school'}
      />

      {/* Pricing Section */}
      <div className="bg-gray-50 dark:bg-[#111] py-16 md:py-24 text-gray-900 dark:text-white transition-colors duration-300 border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Tab Pill Switcher */}
          <SegmentedControl
            options={tabOptions}
            value={activeTab}
            onChange={setActiveTab}
            className="mb-12"
          />

          {/* Pricing Grid */}
          <div className={`grid grid-cols-1 ${getGridColsClass(pricingData[activeTab].tiers.length)} gap-8 items-stretch mb-20 mx-auto`}>
            {pricingData[activeTab].tiers.map((tier) => (
              <PricingCard
                key={tier.id}
                {...tier}
              />
            ))}
          </div>

          {/* ADD-ON HEADER */}
          <div className="text-center mb-10">
            <h3 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-2 uppercase">
              {isZh ? '专项加购包' : 'ADD-ONS'}
            </h3>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-semibold">
              {isZh 
                ? '灵活叠加，为您提供专属的冲刺提升' 
                : 'Flexible modules to supercharge your application strategy'}
            </p>
          </div>

          {/* Add-on Card Container */}
          <div className={`grid grid-cols-1 ${getGridColsClass(pricingData[activeTab].addons.length)} gap-8 items-stretch mx-auto`}>
            {pricingData[activeTab].addons.map((addon, idx) => (
              <PricingCard
                key={idx}
                {...addon}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Compare Plans & Features Section */}
      <div className="bg-white dark:bg-[#0a0a0a] py-16 md:py-24 transition-colors duration-300 text-black dark:text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Trust Logo Banner */}
          <div className="text-center mb-12">
            <p className="text-xs md:text-sm uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold mb-6">
              {isZh ? '备受全球顶尖团队的信赖与支持' : 'Trusted by the highest performance teams at'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 py-4 opacity-75 dark:opacity-60 select-none">
              <span className="font-sans font-bold text-xl md:text-2xl tracking-tight text-gray-800 dark:text-gray-200">
                Meta
              </span>
              <span className="font-sans font-black text-xl md:text-2xl text-amber-500 flex items-center">
                aws
              </span>
              <span className="font-serif font-extrabold text-xl md:text-2xl text-emerald-600 dark:text-emerald-500">
                BCG
              </span>
              <span className="font-sans font-semibold text-xl md:text-2xl tracking-tight text-gray-800 dark:text-gray-200">
                Google
              </span>
              <span className="font-sans font-bold text-xl md:text-2xl tracking-tight text-gray-800 dark:text-gray-200 flex items-baseline">
                Deloitte<span className="text-emerald-500 font-black">.</span>
              </span>
              <span className="font-serif font-medium text-lg md:text-xl tracking-tight text-[#002C6C] dark:text-blue-300">
                McKinsey&Company
              </span>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-white/5 pt-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center tracking-tight mb-2 text-black dark:text-white uppercase">
              {isZh ? '方案与功能对比' : 'COMPARE PLANS & FEATURES'}
            </h2>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center mb-16">
              {isZh ? '有疑问吗？直接跳转到我们的 ' : 'Have questions? Jump directly to our '}
              <a href="#faq" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                {isZh ? '常见问题解答' : 'FAQ section'}
              </a>
              {isZh ? '。前往常见问题 ↓' : '. Go to FAQs ↓'}
            </p>

            {/* Secondary Tab Switcher */}
            <SegmentedControl
              options={tabOptions}
              value={activeTab}
              onChange={setActiveTab}
              className="mb-12"
            />

            {/* Dynamic Comparison Table */}
            <div className="w-full overflow-x-auto border border-gray-150 dark:border-white/5 rounded-2xl bg-white dark:bg-[#111111] shadow-xs">
              <table className="w-full border-collapse text-left min-w-[760px]">
                <thead>
                  <tr className="border-b border-gray-150 dark:border-white/10 bg-gray-50/50 dark:bg-zinc-900/30">
                    <th className="py-5 px-6 font-bold text-sm text-gray-450 dark:text-gray-500 w-[40%]"></th>
                    {pricingData[activeTab].tiers.map((tier) => (
                      <th
                        key={tier.id}
                        className="py-5 px-6 font-black text-sm text-center text-black dark:text-white w-[20%] uppercase"
                      >
                        {tier.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Dynamic rendering based on activeTab */}
                  {dynamicComparisonData[activeTab].map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      {/* Category Header Row */}
                      <tr className="bg-gray-100/70 dark:bg-zinc-800/40 border-b border-gray-150 dark:border-white/10">
                        <td
                          colSpan={pricingData[activeTab].tiers.length + 1}
                          className="py-4 px-6 font-black text-xs md:text-sm text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                        >
                          {cat.title}
                        </td>
                      </tr>
                      {/* Item Rows */}
                      {cat.rows.map((row: any, rowIdx: number) => (
                        <tr key={rowIdx} className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50/20 dark:hover:bg-zinc-900/10 transition">
                          <td className="py-5 pl-10 pr-6 text-sm font-semibold text-gray-850 dark:text-gray-200">
                            {row.label}
                          </td>
                          {pricingData[activeTab].tiers.map((tier) => (
                            <td key={tier.id} className="py-5 px-6 text-center">
                              {renderCell(row[tier.id as 'basic' | 'essential' | 'elite'])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Wall of Love Section */}
      <div className="py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <span className="text-3xl">💛</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-gray-900 dark:text-white mb-2">
              WALL OF LOVE
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">
              {isZh ? '听听早期用户的声音' : 'The early adopters have spoken'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-[#FDE047] dark:bg-[#EAB308] rounded-2xl p-6 shadow-xs hover:shadow-md transition flex flex-col">
                <h3 className="font-black text-gray-900 text-lg uppercase mb-3 leading-tight">{t.title}</h3>
                <p className="text-gray-800 text-sm font-medium mb-6 leading-relaxed grow">
                  {t.content}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-gray-900 text-xs font-bold">{t.author}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < t.rating ? 'text-gray-900' : 'text-gray-900/20'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-gray-50 dark:bg-[#111] border-t border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full border-2 border-gray-900 dark:border-white flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900 dark:text-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-gray-900 dark:text-white">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60 dark:border-white/5">
            {faqs.map(faq => <FAQItem key={faq.id} item={faq} />)}
          </div>
        </div>
      </div>
    </div>
  );
}