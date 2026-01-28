export const siteConfig = {
  name: 'ELITE EDU',  // Capitalized
  description: 'Premium educational consultancy for top universities.',
  url: 'https://eliteworld.com',
  domain: 'edu.eliteworld.top',
  ogImage: 'https://picsum.photos/1920/1080?flight.webp',
  contact: {
      email: 'edu@eliteworld.top',
      phone: '+60 11-8765 4321',
      address: 'Penang, Malaysia',
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
  social: {
    twitter: 'https://twitter.com/eliteworld',
    github: 'https://github.com/eliteworld',
    linkedin: 'https://linkedin.com/in/elite',
  },
  features: {
    search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
    mode: process.env.NEXT_PUBLIC_ENABLE_MODE === 'true',
    user: process.env.NEXT_PUBLIC_ENABLE_USER === 'true',
    landing: process.env.NEXT_PUBLIC_ENABLE_LANDING === 'true',
    education: process.env.NEXT_PUBLIC_ENABLE_EDUCATION === 'true',
    immigration: process.env.NEXT_PUBLIC_ENABLE_IMMIGRATION === 'true',
    coursehub: process.env.NEXT_PUBLIC_ENABLE_COURSEHUB === 'true',
  },
} as const; 
