import { NavigationData, NavigationItem } from '@repo/ui';
import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineEnvelope,
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineLightBulb,
  HiOutlinePencilSquare,
  HiOutlinePresentationChartLine,
  HiOutlineSparkles,
  HiOutlineUserGroup,
  HiOutlineGlobeAlt,
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
    id: 'services',
    label: 'Services',
    href: '',
    icon: <HiOutlineSparkles className="w-5 h-5" />,
    children: [
      {
        id: 'admissions-consulting',
        label: 'Admissions Consulting',
        href: '/services/admissions-consulting',
        icon: <HiOutlineAcademicCap className="w-5 h-5" />,
      },
      {
        id: 'essay-coaching',
        label: 'Essay Coaching',
        href: '/services/essay-coaching',
        icon: <HiOutlinePencilSquare className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    href: '',
    icon: <HiOutlineBookOpen className="w-5 h-5" />,
    children: [
      {
        id: 'insights',
        label: 'Insights',
        href: '/insights',
        icon: <HiOutlinePresentationChartLine className="w-5 h-5" />,
      },
      {
        id: 'tips',
        label: 'Tips',
        href: '/tips',
        icon: <HiOutlineLightBulb className="w-5 h-5" />,
      },
      {
        id: 'ranking',
        label: 'Ranking',
        href: '/ranking',
        icon: <HiOutlineChartBar className="w-5 h-5" />,
      },
      {
        id: 'universities',
        label: 'Universities',
        href: '/universities',
        icon: <HiOutlineChartBar className="w-5 h-5" />,
      },
      {
        id: 'destinations',
        label: 'Destinations',
        href: '/destinations',
        icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
      },
    ],
  },

  {
    id: 'contact',
    label: 'Contact Us',
    href: `${LANDING_URL}/?source=education#contact`,
    external: true,
    icon: <HiOutlineEnvelope className="w-5 h-5" />,
  },
];

export async function getNavigationData(): Promise<NavigationData> {
  return {
    items: navigationItems,
  };
}
