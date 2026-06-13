'use client';

// import { Article, Category } from '@repo/domain';
import { useThemeStore, cn } from '@repo/domain';
// import { Card } from '../ui/Card'; // Card might stay local or go shared? Assuming shared based on prompt? Card is in web-shared but let's check.
// Card is in web-shared/ui/Card.tsx as seen in file listing.
// import { ArticleCard } from '@repo/domain'; // ArticleCard is shared
import { siteConfig } from '@repo/apps-config/landing/site-config';
// import { useUnsplashImage } from '@repo/domain';
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from 'lucide-react';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { getNavGateway } from '@repo/apps-config/landing/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';
import { appOgImage } from '@repo/apps-config/base/company-info';
import dynamic from 'next/dynamic';

const AchievementsSection = dynamic(() => import('../sections/AchievementsSection'), { ssr: true });
const TeamSection = dynamic(() => import('../sections/TeamSection'), { ssr: true });
const CTASection = dynamic(() => import('../sections/CTASection'), { ssr: true });
const ContactSection = dynamic(() => import('../sections/ContactSection'), { ssr: true });

export function HomePage({ locale: propsLocale }: { locale?: string }) {
  const [mounted, setMounted] = useState(false);
  const _isDark = useThemeStore((state) => state.isDark);
  const isDark = mounted ? _isDark : false;
  const { locale: paramsLocale } = useParams();
  const locale = (propsLocale || paramsLocale || 'en') as 'en' | 'zh';
  const isZh = locale === 'zh';
  const currentSiteConfig = siteConfig[locale as 'en' | 'zh'];
  const navGateway = getNavGateway(locale);

  // Define the social media links with proper icon types
  const socialLinks = [
    { icon: Linkedin, href: currentSiteConfig.social.linkedin },
    { icon: Twitter, href: currentSiteConfig.social.twitter },
    { icon: Instagram, href: currentSiteConfig.social.instagram },
    { icon: Facebook, href: currentSiteConfig.social.facebook },
  ];

  // Background images for the landing hero matching the button IDs
  const HERO_BG_IMAGES = {
    main: appOgImage.landing,
    immi: appOgImage.immi,
    edu: appOgImage.edu,
    coursehub: appOgImage.coursehub,
  } as const;

  const [hoveredButtonId, setHoveredButtonId] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);
  const [heroInView, setHeroInView] = useState(true);

  const gatewayButtons = Object.values(navGateway).filter(
    (item) => item.name !== siteConfig.en.name,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

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
      // Loop from 0 to N (0 = default background, 1..N = highlighted buttons)
      setCarouselIndex(
        (prevIndex) => (prevIndex + 1) % (gatewayButtons.length + 1),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, heroInView, gatewayButtons.length]);

  // Current active button ID (prioritizing active mouse hover)
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
            <strong>{isZh ? '梦想起航' : 'Dream Big'}</strong> |{' '}
            {isZh
              ? '专业的留学与移民指导'
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

      <AchievementsSection isZh={isZh} />
      <TeamSection isZh={isZh} />
      <CTASection isZh={isZh} />
      <ContactSection 
        isZh={isZh} 
        currentSiteConfig={currentSiteConfig} 
        isDark={isDark} 
        socialLinks={socialLinks} 
      />
    </div>
  );
}
