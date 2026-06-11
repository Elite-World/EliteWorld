import { search } from '@notionhq/client/build/src/api-endpoints';
import { baseSiteConfig } from '../base/base-site-config';

export const siteConfig = {
  ...baseSiteConfig,
  ogImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop',
  features: {
    ...baseSiteConfig.features,
    search: false,
    user: false,
  },
} as const;
