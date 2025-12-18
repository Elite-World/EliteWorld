export const siteConfig = {
  name: 'ELITE',  // Capitalized
  description: 'Elite World',
  url: 'https://www.eliteworld.com',
  ogImage: 'https://picsum.photos/1920/1080?flight.webp', // High quality hero image
 contact: {
    address: "D-17-08, Empire Damansara, Jalan PJU 8/8, Damansara Perdana, 47820 Petaling Jaya, Selangor, Malaysia.",
    phone: "+60(16)668 4985",
    email: "info@eliteworld.top",
    whatsapp: {qr:"/qr/whatsapp-qr.png", link:"https://wa.me/60166684985"},
    wechat: {qr:"/qr/wechat-qr.png", label:"bjtiew"},
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
