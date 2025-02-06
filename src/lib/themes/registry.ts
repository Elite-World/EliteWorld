import { themes } from './index';
import type { Theme } from './types';

export const LAYOUT_MAPPINGS = {
  '/': 'HomePage',
  '/about': 'AboutPage',
  '/blog': 'BlogPage',
  '/[slug]': 'ArticlePage',
  // Add more routes and their corresponding layouts
} as const;

export type LayoutType = typeof LAYOUT_MAPPINGS[keyof typeof LAYOUT_MAPPINGS];

export type PathType = keyof typeof LAYOUT_MAPPINGS;

// Helper to get layout name from path
export function getLayoutFromPath(path: string): LayoutType {
  // Remove query parameters and hash
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Check exact match
  if (cleanPath in LAYOUT_MAPPINGS) {
    return LAYOUT_MAPPINGS[cleanPath as PathType];
  }

  // Check dynamic routes
  if (cleanPath.includes('/')) {
    const dynamicPath = Object.keys(LAYOUT_MAPPINGS).find(pattern => {
      const regex = new RegExp(
        '^' + pattern.replace(/\[.*?\]/g, '[^/]+') + '$'
      );
      return regex.test(cleanPath);
    });
    if (dynamicPath) {
      return LAYOUT_MAPPINGS[dynamicPath as PathType];
    }
  }

  return 'HomePage'; // Default layout
}

// Get modal registry from each theme with proper typing
export const modalRegistry = Object.entries(themes).reduce<Record<ThemeName, Theme['modals']>>(
  (acc, [themeName, theme]) => ({
    ...acc,
    [themeName as ThemeName]: theme.modals,
  }), 
  {} as Record<ThemeName, Theme['modals']>
);

export type ThemeName = keyof typeof themes;
export type ModalType = keyof Theme['modals']; 