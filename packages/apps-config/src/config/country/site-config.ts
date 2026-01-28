export const siteConfig = {
  name: 'ELITE WORLD',
  description: 'Explore opportunities worldwide',
  url: 'https://world.eliteworld.top',
  ogImage: 'https://picsum.photos/1920/1080',
  contact: {
    address: "D-17-08, Empire Damansara, Jalan PJU 8/8, Damansara Perdana, 47820 Petaling Jaya, Selangor, Malaysia.",
    phone: "+60 11-1144 5900",
    email: "info@eliteworld.top",
    whatsapp: {
      label: "+60 11-1144 5900",
      url: "https://wa.me/601111445900",
      qr: "/qr/whatsapp-qr.png"
    },
    wechat: {
      label: "Eliteworld_my",
      id: "Eliteworld_my",
      qr: "/qr/wechat-qr.png"
    }
  },
  social: {
    linkedin: "#",
    twitter: "#",
    facebook: "#",
    instagram: "#"
  },
  features: {
    landing: true,
    immigration: true,
    education: true,
    coursehub: true,
    search: false, // Globe view doesn't need global search immediately
    mode: true,    // Theme toggle
    user: false    // No user login for globe view yet
  }
};
