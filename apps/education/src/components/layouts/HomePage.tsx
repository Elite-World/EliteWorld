'use client';

import { Article } from '@repo/domain';
import { useThemeStore, useDevStore } from '@repo/domain';

import { cn } from '@repo/domain';
import { useState, useEffect } from 'react';
import { siteConfig } from '@repo/apps-config/education/site-config';
import { getNavGateway } from '@repo/apps-config/education/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';
import { appOgImage } from '@repo/apps-config/base/company-info';
import dynamic from 'next/dynamic';

const AchievementsSection = dynamic(() => import('../sections/AchievementsSection'), { ssr: false });
const TeamSection = dynamic(() => import('../sections/TeamSection'), { ssr: false });
const TopUniversitiesSection = dynamic(() => import('../sections/TopUniversitiesSection'), { ssr: false });
const DestinationsSection = dynamic(() => import('../sections/DestinationsSection'), { ssr: false });
const InsightsSection = dynamic(() => import('../sections/InsightsSection'), { ssr: false });
const TipsSection = dynamic(() => import('../sections/TipsSection'), { ssr: false });

interface HomePageProps {
  articles?: Article[];
  tips?: Article[];
  locale?: string;
}

const HERO_BG_IMAGES = {
  main: appOgImage.landing,
  immi: appOgImage.immi,
  edu: appOgImage.edu,
  coursehub: appOgImage.coursehub,
} as const;

export function HomePage({ articles, tips = [], locale }: HomePageProps) {
  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const isDark = useThemeStore((state) => state.isDark);
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  // The language from store isn't reliable for server-side props passing, prefer locale prop
  const isZh = locale === 'zh';
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
            <strong>{isZh ? '敢于梦想' : 'Dream Big'}</strong> |{' '}
            {isZh
              ? '留学与移民的专业指导'
              : 'Expert Guidance for Study and Immigration'}
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
      <TeamSection isZh={isZh} isDark={isDark} showHiddenElements={showHiddenElements} />
      <TopUniversitiesSection isZh={isZh} isDark={isDark} />
      <DestinationsSection isZh={isZh} isDark={isDark} />
      <InsightsSection isZh={isZh} isDark={isDark} articles={articles} />
      <TipsSection isZh={isZh} isDark={isDark} tips={tips} />
    </div>
  );
}
