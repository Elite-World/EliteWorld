export const siteConfig = {
  name: 'ELITE',  // Capitalized
  description: 'Elite World',
  url: 'https://www.eliteworld.top',

  // Option 0: random
  // ogImage: 'https://picsum.photos/1920/1080?flight.webp', // High quality hero image
  
  // Option 1: Space/Global (Current)
  // ogImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
  
  // Option 2: Classic Ivy League (Trinity College Library) - "Old Money" Education vibe
  // ogImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop',

  // Option 3: Modern Elite Architecture - Sleek, futuristic
  // ogImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1920&auto=format&fit=crop',

  // Option 4: Immigration/Global Journey - Airplane Wing at Sunset (Premium Travel)
  //ogImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop',

  // Option 5: Study Abroad/Academic Success - University Graduation/Campus
  // ogImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop',

  // Option 6: Global Destination - Moody City Skyline (Career/Settlement)
  ogImage: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop',

  contact: {
    address: "D-17-08, Empire Damansara, Jalan PJU 8/8, Damansara Perdana, 47820 Petaling Jaya, Selangor, Malaysia.",
    phone: "(+86)18715105148",
    email: "info@eliteworld.top",
    whatsapp: {qr:"https://res.cloudinary.com/dr435quj2/image/upload/v1781140230/qr-whatsapp.webp", link:"https://wa.me/8618715105148"},
    wechat: {qr:"https://res.cloudinary.com/dr435quj2/image/upload/v1781140228/qr-wechat.webp", label:"bjtiew"},
  },
  social: {
    twitter: 'https://twitter.com/eliteworld',
    github: 'https://github.com/eliteworld',
    linkedin: 'https://linkedin.com/in/elite',
  },
  features: {
    search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
    mode: process.env.NEXT_PUBLIC_ENABLE_MODE === 'true',
    // mode: true, // Enable System/Light/Dark toggle
    user: process.env.NEXT_PUBLIC_ENABLE_USER === 'true',
    landing: process.env.NEXT_PUBLIC_ENABLE_LANDING === 'true',
    education: process.env.NEXT_PUBLIC_ENABLE_EDUCATION === 'true',
    immigration: process.env.NEXT_PUBLIC_ENABLE_IMMIGRATION === 'true',
    coursehub: process.env.NEXT_PUBLIC_ENABLE_COURSEHUB === 'true',
  },
} as const; 
