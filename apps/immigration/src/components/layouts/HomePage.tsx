'use client';

import { useThemeStore, cn, optimizeCloudinaryUrl } from '@repo/domain';
import { useState, useEffect } from 'react';
import { siteConfig } from '@repo/apps-config/immigration/site-config';
import { getNavGateway } from '@repo/apps-config/immigration/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';
import { appOgImage } from '@repo/apps-config/base/company-info';
import dynamic from 'next/dynamic';

const AchievementsSection = dynamic(() => import('../sections/AchievementsSection'));
const TeamSection = dynamic(() => import('../sections/TeamSection'));
const DestinationsSection = dynamic(() => import('../sections/DestinationsSection'));
const SolutionsSection = dynamic(() => import('../sections/SolutionsSection'));
const InsightsSection = dynamic(() => import('../sections/InsightsSection'));
const CTASection = dynamic(() => import('../sections/CTASection'));

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

      <AchievementsSection isZh={isZh} isDark={isDark} />
      <TeamSection isZh={isZh} isDark={isDark} />
      <DestinationsSection isZh={isZh} isDark={isDark} destinationsList={destinationsList} />
      <SolutionsSection isZh={isZh} />
      <InsightsSection isZh={isZh} isDark={isDark} recentArticles={recentArticles} />
      <CTASection isZh={isZh} />
    </div>
  );
}
