import { NavigationData, NavigationItem } from '@repo/ui';
import {
  HiOutlineHome,
  HiOutlineGlobeAlt,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlinePhone,
} from 'react-icons/hi2';
import { siteConfig } from './site-config';

import { buildNavGateway, GATEWAY_URLS } from '../base/base-nav-gateway';

// const LANDING_URL = GATEWAY_URLS.landing;

export const getNavGateway = (locale: string = 'en') =>
  buildNavGateway(siteConfig.apps, locale);

export const navGateway = getNavGateway('en');

export async function getNavigationData(
  locale: string = 'en',
): Promise<NavigationData> {
  const isZh = locale === 'zh';
  return {
    items: [
      {
        id: 'home',
        label: isZh ? '首页' : 'Home',
        href: `/${locale}`,
        icon: <HiOutlineHome className="w-5 h-5" />,
      },
      {
        id: 'destinations',
        label: isZh ? '目的地' : 'Destinations',
        href: `/${locale}/destinations`,
        icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
        children: [
          {
            id: 'dest-us',
            label: isZh ? '美国' : 'United States',
            href: `/${locale}/destinations/united-states`,
          },
          {
            id: 'dest-uk',
            label: isZh ? '英国' : 'United Kingdom',
            href: `/${locale}/destinations/united-kingdom`,
          },
          {
            id: 'dest-au',
            label: isZh ? '澳大利亚' : 'Australia',
            href: `/${locale}/destinations/australia`,
          },
          {
            id: 'dest-nz',
            label: isZh ? '新西兰' : 'New Zealand',
            href: `/${locale}/destinations/new-zealand`,
          },
          {
            id: 'dest-jp',
            label: isZh ? '日本' : 'Japan',
            href: `/${locale}/destinations/japan`,
          },
          {
            id: 'dest-sg',
            label: isZh ? '新加坡' : 'Singapore',
            href: `/${locale}/destinations/singapore`,
          },
          {
            id: 'dest-ae',
            label: isZh ? '阿联酋' : 'United Arab Emirates',
            href: `/${locale}/destinations/uae`,
          },
          {
            id: 'dest-pt',
            label: isZh ? '葡萄牙' : 'Portugal',
            href: `/${locale}/destinations/portugal`,
          },
          {
            id: 'dest-mt',
            label: isZh ? '马耳他' : 'Malta',
            href: `/${locale}/destinations/malta`,
          },
          {
            id: 'dest-th',
            label: isZh ? '泰国' : 'Thailand',
            href: `/${locale}/destinations/thailand`,
          },
          {
            id: 'dest-kn',
            label: isZh ? '圣基茨和尼维斯' : 'St. Kitts & Nevis',
            href: `/${locale}/destinations/st-kitts-nevis`,
          },
        ],
      },
      {
        id: 'solutions',
        label: isZh ? '解决方案' : 'Solutions',
        href: `/${locale}/solutions`,
        icon: <HiOutlineBriefcase className="w-5 h-5" />,
        children: [
          {
            id: 'sol-residency',
            label: isZh ? '居留与绿卡' : 'Residency & Green Cards',
            href: `/${locale}/solutions/residency`,
          },
          {
            id: 'sol-citizenship',
            label: isZh ? '第二公民身份 (CBI)' : 'Second Citizenship (CBI)',
            href: `/${locale}/solutions/citizenship`,
          },
          {
            id: 'sol-longterm',
            label: isZh ? '长期居留身份' : 'Long-Term Status',
            href: `/${locale}/solutions/long-term-status`,
          },
          {
            id: 'sol-wealth',
            label: isZh ? '财富与企业架构' : 'Wealth & Corporate Structuring',
            href: `/${locale}/solutions/wealth-structuring`,
          },
        ],
      },
      {
        id: 'intelligence',
        label: isZh ? '智库' : 'Intelligence',
        href: `/${locale}/intelligence`,
        icon: <HiOutlineChartBar className="w-5 h-5" />,
        children: [
          {
            id: 'intel-passport',
            label: isZh ? '全球护照指数' : 'Global Passport Index',
            href: `/${locale}/intelligence/passport-index`,
          },
          {
            id: 'intel-tax',
            label: isZh ? '企业税率热力图' : 'Corporate Tax Heatmap',
            href: `/${locale}/intelligence/tax-heatmap`,
          },
          {
            id: 'intel-compare',
            label: isZh ? '比较解决方案' : 'Compare Solutions',
            href: `/${locale}/intelligence/compare`,
          },
          {
            id: 'intel-insights',
            label: isZh ? '见解与新闻' : 'Insights & News',
            href: `/${locale}/insights`,
          },
        ],
      },
      {
        id: 'advisory',
        label: isZh ? '咨询' : 'Advisory',
        href: `/${locale}/book-consultation`,
        icon: <HiOutlinePhone className="w-5 h-5" />,
      },
    ],
  };
}
