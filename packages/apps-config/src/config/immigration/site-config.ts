import { baseSiteConfig } from '../base/base-site-config';

export const siteConfig = {
  ...baseSiteConfig,
  name: 'ELITE IMMI',
  description: 'Pro immigration services for Canada, UK, and Australia.',
  ogImage: 'https://picsum.photos/1920/1080?flight.webp',
  contact: {
      ...baseSiteConfig.contact,
      email: 'tech@eliteworld.top',
      phone: '+60 11-1234 5678',
      whatsapp: {
          label: '+60 11-1234 5678',
          link: 'https://wa.me/601112345678',
          qr: '/qr/whatsapp-qr.png',
      },
      wechat: {
          label: 'eliteworld_immi',
          qr: '/qr/wechat-qr.png',
      },
  },
  features: {
    ...baseSiteConfig.features,
    user: false,
  },
} as const; 
 