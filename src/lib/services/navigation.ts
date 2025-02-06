import { NavigationData, NavigationItem } from '../types/navigation';

export const navigationItems: NavigationItem[] = [
    {
        id: 'home',
        label: 'Home',
        href: '/',
      },
      {
        id: 'categories',
        label: 'Categories',
        href: '/categories',
        children: [
          {
            id: 'tech',
            label: 'Technology',
            href: '/categories/tech',
          },
          {
            id: 'lifestyle',
            label: 'Lifestyle',
            href: '/categories/lifestyle',
          },
          {
            id: 'business',
            label: 'Business',
            href: '/categories/business',
          }
        ]
      },
      {
        id: 'about',
        label: 'About',
        href: '/about',
        children: [
          {
            id: 'team',
            label: 'Our Team',
            href: '/about/team',
          },
          {
            id: 'contact',
            label: 'Contact Us',
            href: '/about/contact',
          }
        ]
      }
];

export async function getNavigationData(): Promise<NavigationData> {
  return {
    items: navigationItems
  };
} 