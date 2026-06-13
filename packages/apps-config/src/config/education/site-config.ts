import { baseSiteConfig } from '../base/base-site-config';
import { appOgImage } from '../base/company-info';

const ogImage = appOgImage.edu;

const contactOverride = {
  email: 'edu@eliteworld.top',
} as const;

export const siteConfig = {
  en: {
    ...baseSiteConfig.en,
    name: 'ELITE EDU',
    description: 'Premium educational consultancy for top universities.',
    ogImage,
    contact: {
      ...baseSiteConfig.en.contact,
      ...contactOverride,
    },
    features: {
      ...baseSiteConfig.en.features,
      user: false,
    },
  },
  zh: {
    ...baseSiteConfig.zh,
    name: '精英 海外教育',
    description: '敢于梦想 | 留学与移民的专业指导',
    ogImage,
    contact: {
      ...baseSiteConfig.zh.contact,
      ...contactOverride,
    },
    features: {
      ...baseSiteConfig.zh.features,
      user: false,
    },
  }
} as const;
