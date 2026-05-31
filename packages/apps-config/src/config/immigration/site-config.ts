export const siteConfig = {
  name: 'ELITE IMMI',   // Capitalized
  description: 'Pro immigration services for Canada, UK, and Australia.',
  domain: 'immi.eliteworld.top',
  ogImage: 'https://picsum.photos/1920/1080?flight.webp', // High quality hero image
  contact: {
      email: 'tech@eliteworld.top',
      phone: '+60 11-1234 5678',
      address: 'Kuala Lumpur, Malaysia',
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
  social: {
    twitter: 'https://twitter.com/eliteworld',
    github: 'https://github.com/eliteworld',
    linkedin: 'https://linkedin.com/in/elite',
  },
  features: {
    search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
    mode: true,
    user: process.env.NEXT_PUBLIC_ENABLE_USER === 'true',
    landing: process.env.NEXT_PUBLIC_ENABLE_LANDING === 'true',
    education: process.env.NEXT_PUBLIC_ENABLE_EDUCATION === 'true',
    immigration: process.env.NEXT_PUBLIC_ENABLE_IMMIGRATION === 'true',
    coursehub: process.env.NEXT_PUBLIC_ENABLE_COURSEHUB === 'true',
  },
} as const; 
