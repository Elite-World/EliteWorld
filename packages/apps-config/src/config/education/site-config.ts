import { baseSiteConfig } from '../base/base-site-config';

export const siteConfig = {
  ...baseSiteConfig,
  name: 'ELITE EDU',
  description: 'Premium educational consultancy for top universities.',
  ogImage: 'https://picsum.photos/1920/1080?flight.webp',
  contact: {
      ...baseSiteConfig.contact,
      email: 'edu@eliteworld.top',
      phone: '+60 11-8765 4321',
      whatsapp: {
          label: '+60 11-8765 4321',
          link: 'https://wa.me/601187654321',
          qr: '/qr/whatsapp-edu.png',
      },
      wechat: {
          label: 'eliteworld_edu',
          qr: '/qr/wechat-edu.png',
      },
  },
  features: {
    ...baseSiteConfig.features,
    user: false,
  },
} as const; 
