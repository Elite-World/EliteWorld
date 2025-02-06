'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { usePathname } from 'next/navigation';
import { getLayoutFromPath, LAYOUT_MAPPINGS } from '@/lib/themes/registry';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { BaseLayoutProps } from '@/lib/themes/types';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { NavigationData } from '@/lib/types/navigation';
import { themes } from '@/lib/themes';

interface ClientThemeLayoutProps {
  data: BaseLayoutProps & {
    navigation: NavigationData;
  };
}

// Create dynamic imports based on theme registry and layout mappings
const themeLayouts = Object.keys(themes).reduce((acc, themeName) => {
  // Initialize theme entry
  acc[themeName] = {
    // Dynamic import for each layout type
    layouts: Object.values(LAYOUT_MAPPINGS).reduce((layouts, layoutName) => {
      layouts[layoutName] = dynamic(() => 
        import(`@/lib/themes/${themeName}/layouts/${layoutName}`).then(mod => mod[layoutName])
      );
      return layouts;
    }, {} as Record<string, React.ComponentType<BaseLayoutProps>>),
    
    // Theme layout wrapper
    ThemeLayout: dynamic(() => 
      import(`@/lib/themes/${themeName}/layouts/ThemeLayout`).then(mod => mod.ThemeLayout), 
      { ssr: true }
    )
  };
  return acc;
}, {} as Record<string, {
  layouts: Record<string, React.ComponentType<BaseLayoutProps>>;
  ThemeLayout: React.ComponentType<{ children: React.ReactNode; navigation: NavigationData }>;
}>);

export function ClientThemeLayout({ data }: ClientThemeLayoutProps) {
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const pathname = usePathname() ?? '/';
  
  const layoutName = getLayoutFromPath(pathname);
  const Layout = themeLayouts[currentTheme].layouts[layoutName];
  const ThemeLayout = themeLayouts[currentTheme].ThemeLayout;

  if (!Layout) {
    console.warn(`Layout ${layoutName} not found for theme ${currentTheme}`);
    return <LoadingSpinner variant="page" size="lg" />;
  }

  return (
    <Suspense fallback={<LoadingSpinner variant="page" size="lg" />}>
      <ThemeLayout navigation={data.navigation}>
        <Layout {...data} />
      </ThemeLayout>
    </Suspense>
  );
} 