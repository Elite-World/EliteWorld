import { NavigationData, NavigationItem } from '@repo/ui';
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineUserGroup,
  HiOutlineEnvelope,
  HiOutlineLightBulb,
} from 'react-icons/hi2';

export const navGateway = {
  ...(siteConfig.features.landing
    ? {
        main: {
          id: 'main',
          name: 'ELITE',
          label: 'ELITE',
          href: 'https://www.eliteworld.top',
        },
      }
    : {}),
  ...(siteConfig.features.immigration
    ? {
        immi: {
          id: 'immi',
          name: 'ELITE IMMI',
          label: 'IMMIGRATION',
          href: 'https://immi.eliteworld.top',
        },
      }
    : {}),
  ...(siteConfig.features.education
    ? {
        edu: {
          id: 'edu',
          name: 'ELITE EDU',
          label: 'EDUCATION',
          href: 'https://edu.eliteworld.top',
        },
      }
    : {}),
  ...(siteConfig.features.coursehub
    ? {
        coursehub: {
          id: 'coursehub',
          name: 'CourseHub',
          label: 'COURSEHUB',
          href: 'https://coursehub.eliteworld.top',
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
  // {
  //   id: 'categories',
  //   label: 'Categories',
  //   href: '/categories',
  //   children: [
  //     ...
  //   ]
  // },
  {
    id: 'about',
    label: 'About',
    href: '/#about',
    icon: <HiOutlineInformationCircle className="w-5 h-5" />,
  },
  {
    id: 'team',
    label: 'Our Team',
    href: '/#team',
    icon: <HiOutlineUserGroup className="w-5 h-5" />,
  },
  {
    id: 'contact',
    label: 'Contact Us',
    href: '/#contact',
    icon: <HiOutlineEnvelope className="w-5 h-5" />,
  },
  // {
  //   id: 'insights',
  //   label: 'Insights',
  //   href: '/insights',
  //   icon: <HiOutlineLightBulb className="w-5 h-5" />,
  // },
  // {
  //   id: 'blog',
  //   label: 'Blog',
  //   href: '/blog',
  //   icon: <HiOutlineLightBulb className="w-5 h-5" />,
  // },
];

import { siteConfig } from './site-config';

export async function getNavigationData(): Promise<NavigationData> {
  return {
    items: navigationItems,
  };
}
