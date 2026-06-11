export const companyInfo = {
  name: 'ELITE',
  description: 'Elite World',
  address: "D-17-08, Empire Damansara, Jalan PJU 8/8, Damansara Perdana, 47820 Petaling Jaya, Selangor, Malaysia.",
  phone: "+60(16)668 4985",
  email: "info@eliteworld.top",
  url: 'https://www.eliteworld.top',
  whatsapp: {
    label: "+60(16)668 4985",
    link: "https://wa.me/60166684985",
    qr: "https://res.cloudinary.com/dr435quj2/image/upload/v1781140230/qr-whatsapp.webp"
  },
  wechat: {
    label: "bjtiew",
    qr: "https://res.cloudinary.com/dr435quj2/image/upload/v1781140228/qr-wechat.webp"
  },
  social: {
    twitter: 'https://twitter.com/eliteworld',
    github: 'https://github.com/eliteworld',
    linkedin: 'https://linkedin.com/in/elite',
  }
} as const;

export const footerConfig = {
  address: companyInfo.address,
  phone: companyInfo.phone,
  email: companyInfo.email,
} as const;
