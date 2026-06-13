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

import { buildNavGateway, GATEWAY_URLS } from '../base/base-nav-gateway';

const LANDING_URL = GATEWAY_URLS.landing;

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
        id: 'services',
        label: isZh ? '服务项目' : 'Services',
        href: '',
        icon: <HiOutlineSparkles className="w-5 h-5" />,
        children: [
          {
            id: 'admissions-consulting',
            label: isZh ? '升学指导' : 'Admissions Consulting',
            href: `/${locale}/services/admissions-consulting`,
            icon: <HiOutlineAcademicCap className="w-5 h-5" />,
          },
          {
            id: 'essay-coaching',
            label: isZh ? '文书辅导' : 'Essay Coaching',
            href: `/${locale}/services/essay-coaching`,
            icon: <HiOutlinePencilSquare className="w-5 h-5" />,
          },
        ],
      },
      {
        id: 'resources',
        label: isZh ? '教育资源' : 'Resources',
        href: '',
        icon: <HiOutlineBookOpen className="w-5 h-5" />,
        children: [
          {
            id: 'insights',
            label: isZh ? '深度解析' : 'Insights',
            href: `/${locale}/insights`,
            icon: <HiOutlinePresentationChartLine className="w-5 h-5" />,
          },
          {
            id: 'tips',
            label: isZh ? '干货分享' : 'Tips',
            href: `/${locale}/tips`,
            icon: <HiOutlineLightBulb className="w-5 h-5" />,
          },
          {
            id: 'ranking',
            label: isZh ? '大学排名' : 'Ranking',
            href: `/${locale}/ranking`,
            icon: <HiOutlineChartBar className="w-5 h-5" />,
          },
          {
            id: 'universities',
            label: isZh ? '世界名校' : 'Universities',
            href: `/${locale}/universities`,
            icon: <HiOutlineChartBar className="w-5 h-5" />,
          },
          {
            id: 'destinations',
            label: isZh ? '留学国家' : 'Destinations',
            href: `/${locale}/destinations`,
            icon: <HiOutlineGlobeAlt className="w-5 h-5" />,
          },
        ],
      },
      {
        id: 'contact',
        label: isZh ? '联系我们' : 'Contact Us',
        href: `${LANDING_URL}/${locale}?source=education#contact`,
        external: true,
        icon: <HiOutlineEnvelope className="w-5 h-5" />,
      },
    ],
  };
}
