export const siteConfig = {
  name: 'Elite World',
  description: 'A modern blog platform',
  url: 'https://eliteworld.com',
  ogImage: 'https://picsum.photos/1920/1080?flight.webp', // High quality hero image
  mainNav: [
    {
      title: '首页',
      href: '/',
    },
    {
      title: '关于我们',
      href: '/about',
    },
  ],
  links: {
    twitter: 'https://twitter.com/eliteworld',
    github: 'https://github.com/eliteworld',
    linkedin: 'https://linkedin.com/in/elite',
  },
} as const; 