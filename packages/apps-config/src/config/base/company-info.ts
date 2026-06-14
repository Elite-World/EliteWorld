const sharedContact = {
  phone: '+86 187 1510 5148',
  email: "info@eliteworld.top",
  url: 'https://www.eliteworld.top',
  whatsapp: {
    label: "+86 187 1510 5148",
    link: "https://wa.me/8618715105148",
    qr: "https://res.cloudinary.com/dr435quj2/image/upload/q_auto,f_auto/v1781140230/qr-whatsapp.webp"
  },
  wechat: {
    label: "bjtiew",
    qr: "https://res.cloudinary.com/dr435quj2/image/upload/q_auto,f_auto/v1781140228/qr-wechat.webp"
  },
  social: {
    twitter: '',
    github: '',
    linkedin: '',
    instagram: '',
    facebook: '',
  }
} as const;

export const companyInfo = {
  en: {
    ...sharedContact,
    name: 'ELITE',
    description: 'Elite World',
    address: "D-17-08, Empire Damansara, Jalan PJU 8/8, Damansara Perdana, 47820 Petaling Jaya, Selangor, Malaysia.",
  },
  zh: {
    ...sharedContact,
    name: '精英 世界',
    description: '专业的留学与移民指导',
    address: "马来西亚雪兰莪州八打灵再也，白沙罗柏兰岭，白沙罗帝国 D-17-08（邮编 47820）",
  }
} as const;

export const appOgImage ={
  landing: "https://res.cloudinary.com/dr435quj2/image/upload/q_auto,f_auto/v1781334640/landing-2.jpg",
  immi: "https://res.cloudinary.com/dr435quj2/image/upload/q_auto,f_auto/v1781334639/immi-1.jpg",
  edu: "https://res.cloudinary.com/dr435quj2/image/upload/q_auto,f_auto/v1781334639/edu-1.jpg",
  coursehub: "https://res.cloudinary.com/dr435quj2/image/upload/q_auto,f_auto/v1781334640/coursehub-1.jpg",
} as const;

export const footerConfig = {
  en: {
    address: companyInfo.en.address,
    phone: companyInfo.en.phone,
    email: companyInfo.en.email,
  },
  zh: {
    address: companyInfo.zh.address,
    phone: companyInfo.zh.phone,
    email: companyInfo.zh.email,
  }
} as const;
