import { baseSiteConfig } from '../base/base-site-config';
import { appOgImage } from '../base/company-info';

const ogImage = appOgImage.immi;

const contactOverride = {
  email: 'immi@eliteworld.top',
} as const;

export const siteConfig = {
  en: {
    ...baseSiteConfig.en,
    name: 'ELITE IMMI',
    description: 'Pro immigration services for Canada, UK, and Australia.',
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
    name: '精英 环球移居',
    description: '专业的加拿大、英国和澳大利亚移民服务',
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
