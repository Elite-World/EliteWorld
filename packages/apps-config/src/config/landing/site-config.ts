import { baseSiteConfig } from '../base/base-site-config';
import { appOgImage } from '../base/company-info';

const ogImage = appOgImage.landing;

export const siteConfig = {
  en: {
    ...baseSiteConfig.en,
    ogImage,
    features: {
      ...baseSiteConfig.en.features,
      search: false,
      user: false,
    },
  },
  zh: {
    ...baseSiteConfig.zh,
    ogImage,
    features: {
      ...baseSiteConfig.zh.features,
      search: false,
      user: false,
    },
  }
} as const;
