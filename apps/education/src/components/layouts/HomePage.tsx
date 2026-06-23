'use client';

import { Article } from '@repo/domain';
import { useThemeStore, useDevStore } from '@repo/domain';

import { cn } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/education/site-config';
import { getNavGateway } from '@repo/apps-config/education/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';
import dynamic from 'next/dynamic';
import { Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

import { ContactSection } from '@repo/domain';

const AchievementsSection = dynamic(
  () => import('../sections/AchievementsSection'),
);
const TeamSection = dynamic(() => import('../sections/TeamSection'));
const TopUniversitiesSection = dynamic(
  () => import('../sections/TopUniversitiesSection'),
);
const DestinationsSection = dynamic(
  () => import('../sections/DestinationsSection'),
);
const InsightsSection = dynamic(() => import('../sections/InsightsSection'));
const TipsSection = dynamic(() => import('../sections/TipsSection'));

interface HomePageProps {
  articles?: Article[];
  tips?: Article[];
  locale?: string;
}

export function HomePage({ articles, tips = [], locale }: HomePageProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  // The language from store isn't reliable for server-side props passing, prefer locale prop
  const isZh = locale === 'zh';
  const currentSiteConfig = siteConfig[locale as 'en' | 'zh'];
  const navGateway = getNavGateway(locale);

  const gatewayButtons = Object.values(navGateway).filter(
    (item) => item.name !== siteConfig.en.name,
  );

  const socialLinks = [
    { icon: Linkedin, href: currentSiteConfig.social.linkedin },
    { icon: Twitter, href: currentSiteConfig.social.twitter },
    { icon: Instagram, href: currentSiteConfig.social.instagram },
    { icon: Facebook, href: currentSiteConfig.social.facebook },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <HeroSection
        mode="main"
        title={currentSiteConfig.name}
        backgroundImage={currentSiteConfig.ogImage}
        subtitle={
          <em>
            <strong>{isZh ? '敢于梦想' : 'Dream Big'}</strong> |{' '}
            {isZh
              ? '留学与移民的专业指导'
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

      <AchievementsSection isZh={isZh} isDark={isDark} />
      <TeamSection
        isZh={isZh}
        isDark={isDark}
        showHiddenElements={showHiddenElements}
      />
      <TopUniversitiesSection isZh={isZh} isDark={isDark} />
      <DestinationsSection isZh={isZh} isDark={isDark} />
      <InsightsSection isZh={isZh} isDark={isDark} articles={articles} />
      <TipsSection isZh={isZh} isDark={isDark} tips={tips} />
      <ContactSection
        isZh={isZh}
        currentSiteConfig={currentSiteConfig}
        isDark={isDark}
        socialLinks={socialLinks}
      />
    </div>
  );
}
