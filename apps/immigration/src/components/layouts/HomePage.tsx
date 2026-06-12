'use client';

// import { Article, Category } from '@repo/domain';
import { useThemeStore } from '@repo/domain';
// import { Card } from '../ui/Card'; // Card might stay local or go shared? Assuming shared based on prompt? Card is in web-shared but let's check.
// Card is in web-shared/ui/Card.tsx as seen in file listing.
// import { ArticleCard } from '@repo/domain'; // ArticleCard is shared
import { cn } from '@repo/domain';
import { useState, useEffect } from 'react';
import { siteConfig } from '@repo/apps-config/immigration/site-config';
import Image from 'next/image';
import {
  Globe2,
  ArrowRight,
  Building2,
  ShieldCheck,
  Landmark,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { getNavGateway } from '@repo/apps-config/immigration/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';

// Add subdomain config at the top of the file
// const subdomains = {
//   immigration: 'https://immi.eliteworld.top',
//   education: 'https://edu.eliteworld.top'
// } as const;

// Loading animation component
// function LoadingAnimation() {
//   return (
//     <div className="relative w-24 h-24">
//       <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
//       <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
//     </div>
//   );
// }

// Company loading page
// function CompanyLoadingPage() {
//   const isDark = useThemeStore((state) => state.isDark);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(timer);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 20);

//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div
//       className={cn(
//         'fixed inset-0 z-50 flex flex-col items-center justify-center',
//         'transition-colors duration-300',
//         isDark ? 'bg-black text-white' : 'bg-white text-black',
//       )}
//     >
//       {/* Company Logo */}
//       <div className="mb-8 text-4xl font-bold tracking-tight">
//         {siteConfig.name}
//       </div>

//       {/* Loading Animation */}
//       <LoadingAnimation />

//       {/* Progress Bar */}
//       <div className="w-64 h-1 mt-8 bg-gray-200 rounded-full overflow-hidden">
//         <div
//           className="h-full bg-blue-500 transition-all duration-300 ease-out"
//           style={{ width: `${progress}%` }}
//         />
//       </div>

//       {/* Loading Text */}
//       <div
//         className={cn(
//           'mt-4 text-sm font-medium',
//           isDark ? 'text-gray-400' : 'text-gray-600',
//         )}
//       >
//         Loading... {progress}%
//       </div>
//     </div>
//   );
// }

// interface HomePageProps {
//   categories: Category[];
//   articles: Article[];
// }

// Define the social media links with proper icon types

// Add skeleton loading states
// function ArticleListSkeleton() {
//   return (
//     <div className="space-y-4">
//       {[...Array(3)].map((_, i) => (
//         <div key={i} className="animate-pulse">
//           <div className="h-4 bg-gray-200 rounded w-3/4" />
//           <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
//         </div>
//       ))}
//     </div>
//   );
// }

interface HomePageProps {
  recentArticles?: any[];
  locale?: string;
}

const HERO_BG_IMAGES = {
  main: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop',
  immi: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1920',
  edu: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920',
  coursehub: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1920',
} as const;

export function HomePage({ recentArticles = [], locale }: HomePageProps) {
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const isDark = useThemeStore((state) => state.isDark);
  // The language from store isn't reliable for server-side props passing, prefer locale prop
  const isZh = locale === 'zh';
  const navGateway = getNavGateway(locale);

  const gatewayButtons = Object.values(navGateway).filter(
    (item) => item.name !== siteConfig.name
  );

  // Reset hover and slideshow states on scroll to prevent stuck active backgrounds
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (scrolled > 100) {
        setIsHovered(false);
        setHoveredButtonId(null);
        setCarouselIndex(0);
      }
      setHeroInView(scrolled < 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autoplay slideshow for mobile and idle desktop screens (every 5 seconds)
  useEffect(() => {
    if (isHovered || !heroInView || gatewayButtons.length === 0) return;

    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % (gatewayButtons.length + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, heroInView, gatewayButtons.length]);

  // Active button and corresponding background image selection
  const currentButtonId = isHovered
    ? hoveredButtonId
    : (carouselIndex === 0 ? null : gatewayButtons[carouselIndex - 1]?.id || null);

  const activeBgImage = currentButtonId
    ? HERO_BG_IMAGES[currentButtonId as keyof typeof HERO_BG_IMAGES] || HERO_BG_IMAGES.main
    : HERO_BG_IMAGES.main;

  // const [isLoading, setIsLoading] = useState(false);
  // Disabled for SEO
  /*
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return <CompanyLoadingPage />;
  }
  */

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <HeroSection
        mode="main"
        title={siteConfig.name}
        backgroundImage={activeBgImage}
        subtitle={
          <em>
            <strong>{isZh ? 'Elite 环球移居 ' : 'Elite Mobility'}</strong> |{' '}
            {isZh ? '智选全球卓越之路' : 'Premium Pathways for Global Citizens'}
          </em>
        }
      >
        {gatewayButtons.map((button: NavigationItem, index: number) => {
          const isActive = button.id === currentButtonId;
          return (
            <a
              key={index}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                setIsHovered(true);
                setHoveredButtonId(button.id);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
                setHoveredButtonId(null);
              }}
              className={cn(
                // Base styles
                'px-8 py-3 rounded-lg text-lg font-medium text-center',
                'text-white border-2 w-48 backdrop-blur-sm transition-all duration-300',
                // Highlight state matching hover preview
                isActive
                  ? 'bg-white/20 border-white scale-105 shadow-[0_0_25px_rgba(255,255,255,0.3)]'
                  : 'bg-white/5 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]'
              )}
            >
              {button.label}
            </a>
          );
        })}
      </HeroSection>

      {/* Achievements Section */}
      <section
        id="about"
        className="py-24 bg-linear-to-b from-transparent to-gray-50 dark:to-gray-900"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2
              className={cn(
                'text-4xl font-bold text-center mb-16',
                'bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent',
              )}
            >
              {isZh ? '我们的全球影响力' : 'Our Global Impact'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                number: '1,000+',
                label: isZh ? '成功移民' : 'Successful Relocations',
                description: isZh
                  ? '安全协助家庭与高净值人士完成搬迁'
                  : 'Families and high-net-worth individuals securely relocated',
              },
              {
                number: '20+',
                label: isZh ? '覆盖地区' : 'Jurisdictions',
                description: isZh
                  ? '遍布欧洲、美洲和全球的尊贵移民通道'
                  : 'Premium pathways across Europe, Americas, and Oceania',
              },
              {
                number: '100%',
                label: isZh ? '隐私保密' : 'Confidentiality',
                description: isZh
                  ? '在财富和身份规划方面保持绝对的保密性'
                  : 'Absolute discretion in wealth and mobility structuring',
              },
              {
                number: '15+',
                label: isZh ? '年经验' : 'Years Experience',
                description: isZh
                  ? '十余年全球移民战略规划的卓越经验'
                  : 'Decade of excellence in global immigration strategy',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'text-center p-8 rounded-2xl transition-all duration-300 border',
                  'hover:transform hover:-translate-y-1',
                  isDark
                    ? 'bg-[#1A1A1A] hover:bg-[#222] border-white/5 hover:border-white/10'
                    : 'bg-white hover:bg-white border-gray-100 shadow-sm hover:shadow-xl',
                )}
              >
                <div className="text-4xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold mb-2">{stat.label}</div>
                <p
                  className={cn(
                    'text-sm',
                    isDark ? 'text-gray-400' : 'text-gray-600',
                  )}
                >
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2
              className={cn(
                'text-4xl font-bold text-center mb-4 text-[#010022] dark:text-white',
              )}
            >
              {isZh ? '认识我们的移民专家' : 'Meet Our Immigration Experts'}
            </h2>
            <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-purple-500 mx-auto mb-6" />
            <p
              className={cn(
                'text-center max-w-2xl mx-auto mb-16',
                isDark ? 'text-gray-400' : 'text-gray-600',
              )}
            >
              {isZh
                ? '我们经验丰富的顾问团队致力于为您家庭的全球流动性和财富保值制定量身定制的策略。'
                : "Our experienced counsel are dedicated to architecting bespoke strategies for your family's global mobility and wealth preservation."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'David Lim',
                role: isZh ? '高级顾问' : 'Senior Consultant',
                image: '/images/team/david-lim.png',
                speciality: isZh
                  ? '投资与技术移民'
                  : 'Investor & Skilled Migration',
              },
              {
                name: 'Linda Wu',
                role: isZh ? '移民律师' : 'Immigration Lawyer',
                image: '/images/team/linda-wu.png',
                speciality: isZh
                  ? '签证合规与申诉'
                  : 'Visa Compliance & Appeals',
              },
              {
                name: 'Robert Ng',
                role: isZh ? '搬迁专家' : 'Relocation Specialist',
                image: '/images/team/robert-ng.png',
                speciality: isZh ? '全球流动' : 'Global Mobility',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'flex flex-col rounded-2xl overflow-hidden transition-all duration-300',
                  'hover:transform hover:-translate-y-1',
                  isDark ? 'bg-gray-800' : 'bg-white shadow-lg',
                  'h-full',
                )}
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-t-2xl"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p
                    className={cn(
                      'text-sm mb-2 font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400',
                    )}
                  >
                    {member.role}
                  </p>
                  <p
                    className={cn(
                      'text-sm',
                      isDark ? 'text-gray-400' : 'text-gray-500',
                    )}
                  >
                    {member.speciality}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Destinations Showcase */}
      <section className="py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe2 className="w-5 h-5 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                  {isZh ? '全球流动' : 'Global Mobility'}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                {isZh ? '首选' : 'Premium'}
                {/* <br /> */}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  {isZh ? '目的地' : ' Destinations'}
                </span>
              </h2>
            </div>
            <Link
              href="/destinations"
              className={cn(
                'group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all',
                isDark
                  ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  : 'bg-black/5 hover:bg-black/10 text-black border border-black/10',
              )}
            >
              {isZh ? '探索所有项目' : 'Explore All Programs'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                country: isZh ? '美国' : 'United States',
                program: isZh ? 'EB-5 投资移民签证' : 'EB-5 Investor Visa',
                image:
                  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
                timeframe: isZh ? '24-36 个月' : '24-36 Months',
                investment: isZh ? '80万美元起' : 'From $800,000',
              },
              {
                country: isZh ? '英国' : 'United Kingdom',
                program: isZh ? '创新创始人签证' : 'Innovator Founder Visa',
                image:
                  'https://images.unsplash.com/photo-1513635269975-59693e2d8400?auto=format&fit=crop&q=80&w=800',
                timeframe: isZh ? '3-6 个月' : '3-6 Months',
                investment: isZh ? '基于商业计划' : 'Business Plan Based',
              },
              {
                country: isZh ? '澳大利亚' : 'Australia',
                program: isZh
                  ? '商业创新签证 (188)'
                  : 'Business Innovation (188)',
                image:
                  'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=800',
                timeframe: isZh ? '12-18 个月' : '12-18 Months',
                investment: isZh ? '125万澳元起' : 'From AUD 1.25M',
              },
            ].map((dest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'group relative overflow-hidden rounded-3xl aspect-4/5 cursor-pointer border border-white/10',
                )}
              >
                <Image
                  src={dest.image}
                  alt={dest.country}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                      {dest.country}
                    </h3>
                    <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">
                      {dest.program}
                    </p>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex gap-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex-1">
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                          {isZh ? '时间范围' : 'Timeframe'}
                        </p>
                        <p className="text-xs text-white font-bold">
                          {dest.timeframe}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 flex-1">
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">
                          {isZh ? '投资金额' : 'Investment'}
                        </p>
                        <p className="text-xs text-white font-bold">
                          {dest.investment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pathways by Goal Section */}
      <section className="py-24 bg-white dark:bg-[#111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
              {isZh ? '按目标' : 'Pathways by'}{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {isZh ? '规划路径' : 'Goal'}
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {isZh
                ? '选择您的主要目标，探索为您量身定制的移民和财富结构策略。'
                : 'Select your primary objective to explore tailored immigration and wealth structuring strategies.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                href: '/solutions/residency',
                icon: Globe2,
                colorClass: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                hoverClass: 'hover:bg-blue-50 dark:hover:bg-blue-900/10',
                title: isZh ? '投资居留' : 'Residency by Investment',
                description: isZh
                  ? '在优质司法管辖区获得黄金签证和永久居留权。'
                  : 'Secure golden visas and permanent residency rights in prime jurisdictions.',
              },
              {
                href: '/solutions/citizenship',
                icon: ShieldCheck,
                colorClass: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                hoverClass: 'hover:bg-purple-50 dark:hover:bg-purple-900/10',
                title: isZh ? '第二公民身份 (CBI)' : 'Second Citizenship (CBI)',
                description: isZh
                  ? '在数月内直接获得公民身份和强大的护照。'
                  : 'Obtain direct citizenship and powerful passports within months.',
              },
              {
                href: '/solutions/wealth-structuring',
                icon: Landmark,
                colorClass: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
                hoverClass: 'hover:bg-emerald-50 dark:hover:bg-emerald-900/10',
                title: isZh ? '财富架构' : 'Wealth Structuring',
                description: isZh
                  ? '优化税务框架并在全球范围内保护您家族的财富。'
                  : "Optimize tax frameworks and protect your family's legacy globally.",
              },
            ].map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={pathway.href}
                    className={cn(
                      'group block bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 transition-colors h-full',
                      pathway.hoverClass,
                    )}
                  >
                    <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform', pathway.colorClass)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {pathway.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pathway.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Intelligence Section */}
      {recentArticles.length > 0 && (
        <section className="py-24 bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
            >
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">
                  {isZh ? '全球流动性' : 'Global Mobility'}{' '}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                    {isZh ? '智库' : 'Intelligence'}
                  </span>
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                  {isZh
                    ? '关于全球公民和居住权的专家见解、政策更新和突发新闻。'
                    : 'Expert insights, policy updates, and breaking news on global citizenship and residency.'}
                </p>
              </div>
              <Link
                href="/insights"
                className={cn(
                  'group inline-flex items-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all',
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    : 'bg-black/5 hover:bg-black/10 text-black border border-black/10',
                )}
              >
                {isZh ? '查看所有智库' : 'View All Intelligence'}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/insights/${article.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-200 dark:bg-white/5">
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
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">
                          {article.category || (isZh ? '新闻' : 'News')}
                        </span>
                        <span className="text-gray-400 dark:text-gray-600 text-xs">
                          •
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">
                          {article.date
                            ? new Date(article.date).toLocaleDateString(
                                isZh ? 'zh-CN' : 'en-US',
                                {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                },
                              )
                            : ''}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Premium Private Consultation CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565153995831-29e2f4a4bc3b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto backdrop-blur-xl bg-black/40 border border-white/10 p-12 md:p-20 rounded-3xl text-center shadow-2xl"
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}
