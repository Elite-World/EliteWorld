'use client';

// import { Article, Category } from '@repo/domain';
import { useThemeStore, cn } from '@repo/domain';
// import { Card } from '../ui/Card'; // Card might stay local or go shared? Assuming shared based on prompt? Card is in web-shared but let's check.
// Card is in web-shared/ui/Card.tsx as seen in file listing.
// import { ArticleCard } from '@repo/domain'; // ArticleCard is shared
import { siteConfig } from '@repo/apps-config/landing/site-config';
// import { useUnsplashImage } from '@repo/domain';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import { getNavGateway } from '@repo/apps-config/landing/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';
import dynamic from 'next/dynamic';

const AchievementsSection = dynamic(
  () => import('../sections/AchievementsSection'),
);
const TeamSection = dynamic(() => import('../sections/TeamSection'));
const CTASection = dynamic(() => import('../sections/CTASection'));
const ContactSection = dynamic(() => import('@repo/domain').then(mod => mod.ContactSection));

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

  const gatewayButtons = Object.values(navGateway).filter(
    (item) => item.name !== siteConfig.en.name,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <HeroSection
        mode="main"
        title={currentSiteConfig.name}
        backgroundImage={currentSiteConfig.ogImage}
        subtitle={
          <em>
            <strong>{isZh ? '梦想起航' : 'Dream Big'}</strong> |{' '}
            {isZh
              ? '专业的留学与移民指导'
              : 'Expert Guidance for Study and Immigration'}
          </em>
        }
      >
        {gatewayButtons.map((button: NavigationItem, index: number) => (
          <a
            key={index}
            href={button.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              // Base styles
              'px-8 py-3 rounded-lg text-lg font-medium text-center',
              'text-white border-2 w-48 backdrop-blur-sm transition duration-300',
              // Highlight state matching hover preview
              'bg-white/5 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]',
            )}
          >
            {button.label}
          </a>
        ))}
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
