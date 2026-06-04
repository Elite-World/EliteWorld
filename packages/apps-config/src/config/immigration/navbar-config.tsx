import { NavigationData, NavigationItem } from '@repo/ui';
import {
  HiOutlineHome,
  HiOutlineGlobeAlt,
  HiOutlineBriefcase,
  HiOutlineChartBar,
  HiOutlinePhone,
} from 'react-icons/hi2';
import { siteConfig } from './site-config';

const IS_DEV = process.env.NODE_ENV === 'development';
const LANDING_URL = IS_DEV ? 'http://localhost:3000' : 'https://www.eliteworld.top';

export const navGateway = {
  ...(siteConfig.features.landing
    ? {
        main: {
          id: 'main',
          name: 'ELITE',
          label: 'ELITE',
          href: IS_DEV ? 'http://localhost:3000' : 'https://www.eliteworld.top',
        },
      }
    : {}),
  ...(siteConfig.features.immigration
    ? {
        immi: {
          id: 'immi',
          name: 'ELITE IMMI',
          label: 'IMMIGRATION',
          href: IS_DEV ? 'http://localhost:3001' : 'https://immi.eliteworld.top',
        },
      }
    : {}),
  ...(siteConfig.features.education
    ? {
        edu: {
          id: 'edu',
          name: 'ELITE EDU',
          label: 'EDUCATION',
          href: IS_DEV ? 'http://localhost:3002' : 'https://edu.eliteworld.top',
        },
      }
    : {}),
  ...(siteConfig.features.coursehub
    ? {
        coursehub: {
          id: 'coursehub',
          name: 'CourseHub',
          label: 'COURSEHUB',
          href: IS_DEV ? 'http://localhost:3003' : 'https://coursehub.eliteworld.top',
        },
      }
    : {}),
} as const;

export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HiOutlineHome className="w-5 h-5" />,
  },
  {
    id: 'destinations',
    label: 'Destinations',
    href: '/destinations',
    icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
    children: [
      { id: 'dest-us', label: 'United States', href: '/destinations/united-states' },
      { id: 'dest-uk', label: 'United Kingdom', href: '/destinations/united-kingdom' },
      { id: 'dest-au', label: 'Australia', href: '/destinations/australia' },
      { id: 'dest-nz', label: 'New Zealand', href: '/destinations/new-zealand' },
      { id: 'dest-jp', label: 'Japan', href: '/destinations/japan' },
      { id: 'dest-sg', label: 'Singapore', href: '/destinations/singapore' },
      { id: 'dest-ae', label: 'United Arab Emirates', href: '/destinations/uae' },
      { id: 'dest-pt', label: 'Portugal', href: '/destinations/portugal' },
      { id: 'dest-mt', label: 'Malta', href: '/destinations/malta' },
      { id: 'dest-th', label: 'Thailand', href: '/destinations/thailand' },
      { id: 'dest-kn', label: 'St. Kitts & Nevis', href: '/destinations/st-kitts-nevis' },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    href: '/solutions',
    icon: <HiOutlineBriefcase className="w-5 h-5" />,
    children: [
      { id: 'sol-residency', label: 'Residency & Green Cards', href: '/solutions/residency' },
      { id: 'sol-citizenship', label: 'Second Citizenship (CBI)', href: '/solutions/citizenship' },
      { id: 'sol-longterm', label: 'Long-Term Status', href: '/solutions/long-term-status' },
      { id: 'sol-wealth', label: 'Wealth & Corporate Structuring', href: '/solutions/wealth-structuring' },
    ],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    href: '/intelligence',
    icon: <HiOutlineChartBar className="w-5 h-5" />,
    children: [
      { id: 'intel-passport', label: 'Global Passport Index', href: '/intelligence/passport-index' },
      { id: 'intel-tax', label: 'Corporate Tax Heatmap', href: '/intelligence/tax-heatmap' },
      { id: 'intel-compare', label: 'Compare Solutions', href: '/intelligence/compare' },
      { id: 'intel-insights', label: 'Insights & News', href: '/insights' },
    ],
  },
  {
    id: 'advisory',
    label: 'Advisory',
    href: '/book-consultation',
    icon: <HiOutlinePhone className="w-5 h-5" />,
  },
];

export async function getNavigationData(): Promise<NavigationData> {
  return {
    items: navigationItems,
  };
}
