import { NavigationData, NavigationItem } from '@repo/ui';
import { HiOutlineHome } from 'react-icons/hi2';

import { siteConfig } from './site-config';

const IS_DEV = process.env.NODE_ENV === 'development';

// Define the gateway links (switchers between apps)
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

// Minimal navigation for the 3D world view (maybe just Home or minimal items)
export const navigationItems: NavigationItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/',
    icon: <HiOutlineHome className="w-5 h-5" />,
  },
];

export async function getNavigationData(): Promise<NavigationData> {
  return {
    items: navigationItems,
  };
}
