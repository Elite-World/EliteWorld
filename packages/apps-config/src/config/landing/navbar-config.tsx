import { NavigationData, NavigationItem } from '@repo/ui';
import {
  HiOutlineHome,
  HiOutlineInformationCircle,
  HiOutlineUserGroup,
  HiOutlineEnvelope,
  HiOutlineLightBulb,
} from 'react-icons/hi2';
import { siteConfig } from './site-config';

import { buildNavGateway } from '../base/base-nav-gateway';

export const getNavGateway = (locale: string = 'en') => {
  // const config = locale === 'zh' ? siteConfig.zh : siteConfig.en;
  const config = siteConfig.en;
  return buildNavGateway(config.apps, locale);
};

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
