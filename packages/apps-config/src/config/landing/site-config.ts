import { baseSiteConfig } from '../base/base-site-config';
import { appOgImage } from '../base/company-info';

const ogImage = appOgImage.landing;

export const siteConfig = {
  en: {
    ...baseSiteConfig.en,
    ogImage,
  },
  zh: {
    ...baseSiteConfig.zh,
    ogImage,
  },
  features: {
    ...baseSiteConfig.features,
    search: false,
    user: false,
    // navigationStyle: 'drawer',
  },
  apps: baseSiteConfig.apps,
} as const;
