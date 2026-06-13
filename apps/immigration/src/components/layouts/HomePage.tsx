'use client';

import { useThemeStore, cn, optimizeCloudinaryUrl } from '@repo/domain';
import { useState, useEffect } from 'react';
import { siteConfig } from '@repo/apps-config/immigration/site-config';
import Image from 'next/image';
import { Globe2, ArrowRight, Building2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { getNavGateway } from '@repo/apps-config/immigration/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';
import { appOgImage } from '@repo/apps-config/base/company-info';
import {
  getHomeStats,
  getHomeTeam,
  getHomeSolutions,
} from '@repo/apps-config/immigration/home-config';

interface HomePageProps {
  recentArticles?: any[];
  locale?: string;
  featuredDestinations?: any[];
}


const HERO_BG_IMAGES = {
  main: appOgImage.landing,
  immi: appOgImage.immi,
  edu: appOgImage.edu,
  coursehub: appOgImage.coursehub,
} as const;

export function HomePage({ recentArticles = [], locale, featuredDestinations = [] }: HomePageProps) {
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const isDark = useThemeStore((state) => state.isDark);
  // The language from store isn't reliable for server-side props passing, prefer locale prop
  const isZh = locale === 'zh';

  const destinationsList = featuredDestinations && featuredDestinations.length > 0
    ? featuredDestinations.map((item: any) => {
        const solution = item.solutions?.[0];
        const countryName = isZh
          ? (item.country.translations?.cn?.name || item.country.name?.cn || item.country.name?.en)
          : (item.country.translations?.en?.name || item.country.name?.en);

        const programName = solution
          ? (isZh
              ? (solution.translations?.cn?.name || solution.name?.cn || solution.name?.en)
              : (solution.translations?.en?.name || solution.name?.en))
          : '';

        const timeframe = solution
          ? (isZh
              ? (solution.translations?.cn?.requirements?.timeframe || solution.requirements?.timeframe)
              : (solution.translations?.en?.requirements?.timeframe || solution.requirements?.timeframe))
          : '';

        const investment = solution
          ? (isZh
              ? (solution.translations?.cn?.requirements?.investment_amount || solution.requirements?.investment_amount)
              : (solution.translations?.en?.requirements?.investment_amount || solution.requirements?.investment_amount))
          : '';

        return {
          country: countryName,
          slug: item.country.slug,
          program: programName,
          image: optimizeCloudinaryUrl(item.country.image, 800) || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
          timeframe,
          investment,
        };
      })
    : [];


  const currentSiteConfig = siteConfig[locale as 'en' | 'zh'];
  const navGateway = getNavGateway(locale);

  const gatewayButtons = Object.values(navGateway).filter(
    (item) => item.name !== siteConfig.en.name,
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
      setCarouselIndex(
        (prevIndex) => (prevIndex + 1) % (gatewayButtons.length + 1),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, heroInView, gatewayButtons.length]);

  // Active button and corresponding background image selection
  const currentButtonId = isHovered
    ? hoveredButtonId
    : carouselIndex === 0
      ? null
      : gatewayButtons[carouselIndex - 1]?.id || null;

  const activeBgImage = currentButtonId
    ? HERO_BG_IMAGES[currentButtonId as keyof typeof HERO_BG_IMAGES] ||
      currentSiteConfig.ogImage
    : currentSiteConfig.ogImage;

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <HeroSection
        mode="main"
        title={currentSiteConfig.name}
        backgroundImage={activeBgImage}
        subtitle={
          <em>
            <strong>{isZh ? '环球移居 ' : 'Elite Mobility'}</strong> |{' '}
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
                  : 'bg-white/5 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
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
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
            {getHomeStats(isZh).map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
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
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
            {getHomeTeam(isZh).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
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
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
            {destinationsList.map((dest, idx) => {
              const cardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    delay: idx * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={cn(
                    'group relative overflow-hidden rounded-3xl aspect-4/5 cursor-pointer border border-white/10 h-full w-full',
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
              );

              if (dest.slug) {
                return (
                  <Link key={idx} href={`/destinations/${dest.slug}`} className="block h-full">
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div key={idx} className="h-full">
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pathways by Goal Section */}
      <section className="py-24 bg-white dark:bg-[#111]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
            {getHomeSolutions(isZh).map((pathway, index) => {
              const Icon = pathway.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={pathway.href}
                    className={cn(
                      'group block bg-gray-50 dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 transition-colors h-full',
                      pathway.hoverClass,
                    )}
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform',
                        pathway.colorClass,
                      )}
                    >
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
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
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
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
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
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
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
