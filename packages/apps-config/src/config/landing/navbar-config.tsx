import { NavigationData, NavigationItem } from '@repo/ui';
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineUserGroup,
  HiOutlineEnvelope,
  HiOutlineLightBulb,
} from 'react-icons/hi2';
import { siteConfig } from './site-config';

const IS_DEV = process.env.NODE_ENV === 'development';

export const getNavGateway = (locale: string = 'en') => {
  const isZh = locale === 'zh';
  return {
    ...(siteConfig.features.landing
      ? {
          main: {
            id: 'main',
            name: 'ELITE',
            label: isZh ? '主页' : 'ELITE',
            href: IS_DEV ? 'http://localhost:3000' : 'https://www.eliteworld.top',
          },
        }
      : {}),
    ...(siteConfig.features.immigration
      ? {
          immi: {
            id: 'immi',
            name: 'ELITE IMMI',
            label: isZh ? '移民' : 'IMMIGRATION',
            href: IS_DEV ? 'http://localhost:3001' : 'https://immi.eliteworld.top',
          },
        }
      : {}),
    ...(siteConfig.features.education
      ? {
          edu: {
            id: 'edu',
            name: 'ELITE EDU',
            label: isZh ? '教育' : 'EDUCATION',
            href: IS_DEV ? 'http://localhost:3002' : 'https://edu.eliteworld.top',
          },
        }
      : {}),
    ...(siteConfig.features.coursehub
      ? {
          coursehub: {
            id: 'coursehub',
            name: 'CourseHub',
            label: isZh ? '课程' : 'COURSEHUB',
            href: IS_DEV ? 'http://localhost:3003' : 'https://coursehub.eliteworld.top',
          },
        }
      : {}),
  } as const;
};

// Keep the old one for backwards compatibility or static usage where locale isn't available
export const navGateway = getNavGateway('en');

export async function getNavigationData(locale: string = 'en'): Promise<NavigationData> {
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
        id: 'about',
        label: isZh ? '关于我们' : 'About',
        href: `/${locale}#about`,
        icon: <HiOutlineInformationCircle className="w-5 h-5" />,
      },
      {
        id: 'team',
        label: isZh ? '我们的团队' : 'Our Team',
        href: `/${locale}#team`,
        icon: <HiOutlineUserGroup className="w-5 h-5" />,
      },
      {
        id: 'contact',
        label: isZh ? '联系我们' : 'Contact Us',
        href: `/${locale}#contact`,
        icon: <HiOutlineEnvelope className="w-5 h-5" />,
      },
    ],
  };
}
