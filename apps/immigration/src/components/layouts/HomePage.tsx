'use client';

import { useThemeStore, cn, optimizeCloudinaryUrl } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/immigration/site-config';
import { getNavGateway } from '@repo/apps-config/immigration/navbar-config';
import { HeroSection, NavigationItem } from '@repo/ui';
import dynamic from 'next/dynamic';

const AchievementsSection = dynamic(
  () => import('../sections/AchievementsSection'),
);
const TeamSection = dynamic(() => import('../sections/TeamSection'));
const DestinationsSection = dynamic(
  () => import('../sections/DestinationsSection'),
);
const SolutionsSection = dynamic(() => import('../sections/SolutionsSection'));
const InsightsSection = dynamic(() => import('../sections/InsightsSection'));
const CTASection = dynamic(() => import('../sections/CTASection'));

interface HomePageProps {
  recentArticles?: any[];
  locale?: string;
  featuredDestinations?: any[];
}

export function HomePage({
  recentArticles = [],
  locale,
  featuredDestinations = [],
}: HomePageProps) {
  const isDark = useThemeStore((state) => state.isDark);
  // The language from store isn't reliable for server-side props passing, prefer locale prop
  const isZh = locale === 'zh';

  const destinationsList =
    featuredDestinations && featuredDestinations.length > 0
      ? featuredDestinations.map((item: any) => {
          const solution = item.solutions?.[0];
          const countryName = isZh
            ? item.country.translations?.cn?.name ||
              item.country.name?.cn ||
              item.country.name?.en
            : item.country.translations?.en?.name || item.country.name?.en;

          const programName = solution
            ? isZh
              ? solution.translations?.cn?.name ||
                solution.name?.cn ||
                solution.name?.en
              : solution.translations?.en?.name || solution.name?.en
            : '';

          const timeframe = solution
            ? isZh
              ? solution.translations?.cn?.requirements?.timeframe ||
                solution.requirements?.timeframe
              : solution.translations?.en?.requirements?.timeframe ||
                solution.requirements?.timeframe
            : '';

          const investment = solution
            ? isZh
              ? solution.translations?.cn?.requirements?.investment_amount ||
                solution.requirements?.investment_amount
              : solution.translations?.en?.requirements?.investment_amount ||
                solution.requirements?.investment_amount
            : '';

          return {
            country: countryName,
            slug: item.country.slug,
            program: programName,
            image:
              optimizeCloudinaryUrl(item.country.image, 800) ||
              'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
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

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <HeroSection
        mode="main"
        title={currentSiteConfig.name}
        backgroundImage={currentSiteConfig.ogImage}
        subtitle={
          <em>
            <strong>{isZh ? '环球移居 ' : 'Elite Mobility'}</strong> |{' '}
            {isZh ? '智选全球卓越之路' : 'Premium Pathways for Global Citizens'}
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
      <TeamSection isZh={isZh} isDark={isDark} />
      <DestinationsSection
        isZh={isZh}
        isDark={isDark}
        destinationsList={destinationsList}
      />
      <SolutionsSection isZh={isZh} />
      <InsightsSection
        isZh={isZh}
        isDark={isDark}
        recentArticles={recentArticles}
      />
      <CTASection isZh={isZh} />
    </div>
  );
}
