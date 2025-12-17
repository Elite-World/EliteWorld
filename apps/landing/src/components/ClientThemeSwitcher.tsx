'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { usePathname } from 'next/navigation';
import { getLayoutFromPath, LAYOUT_MAPPINGS, LayoutType } from '@/lib/themes/registry';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { BaseLayoutProps } from '@/lib/themes/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { NavigationData } from '@/lib/types/navigation';
import { themes } from '@/lib/themes';
import { ThemeName } from '@/lib/themes/registry';

interface ClientThemeSwitcherProps {
  children: React.ReactNode; // Server-rendered default layout (fast!)
  initialTheme: ThemeName;
  layoutName?: LayoutType; // Explicit layout name, fallback to path inference
  data: Partial<BaseLayoutProps> & {
    navigation?: NavigationData;
  };
}

// Create dynamic imports registry (same as before)
const themeLayouts = Object.keys(themes).reduce((acc, themeName) => {
  acc[themeName] = {
    layouts: Object.values(LAYOUT_MAPPINGS).reduce((layouts, layoutName) => {
      layouts[layoutName] = dynamic(() => 
        import(`@/lib/themes/${themeName}/layouts/${layoutName}`).then(mod => mod[layoutName])
      );
      return layouts;
    }, {} as Record<string, React.ComponentType<BaseLayoutProps>>),
    
    ThemeLayout: dynamic(() => 
      import(`@/lib/themes/${themeName}/layouts/BaseLayout`).then(mod => mod.ThemeLayout), 
      { ssr: true }
    )
  };
  return acc;
}, {} as Record<string, {
  layouts: Record<string, React.ComponentType<BaseLayoutProps>>;
  ThemeLayout: React.ComponentType<{ children: React.ReactNode; navigation: NavigationData }>;
}>);

export type ThemeSwitcherMode = 'shell' | 'page';

export function ClientThemeSwitcher({ 
  children, 
  initialTheme, 
  layoutName: propLayoutName, 
  data,
  mode = 'page' // Default to page for backward compatibility or safety
}: ClientThemeSwitcherProps & { mode?: ThemeSwitcherMode }) {
  const currentTheme = useThemeStore((state) => state.currentTheme);
  
  const pathname = usePathname() ?? '/';
  const layoutName = propLayoutName || getLayoutFromPath(pathname);

  // OPTIMIZATION: If themes match, render server content
  if (currentTheme === initialTheme) {
    return <>{children}</>;
  }

  // Fallback: Client-side switching logic
  const Layout = themeLayouts[currentTheme].layouts[layoutName];
  const ThemeWrapper = themeLayouts[currentTheme].ThemeLayout;

  if (mode === 'shell') {
      if (!data.navigation) {
          console.warn("Navigation data missing for Shell mode");
          return null; 
      }
      return (
        <Suspense fallback={<LoadingSpinner variant="page" size="lg" />}>
          <ThemeWrapper navigation={data.navigation}>
            {children}
          </ThemeWrapper>
        </Suspense>
      );
  }

  // Page mode
  if (!Layout) {
    console.warn(`Layout ${layoutName} not found for theme ${currentTheme}`);
    return <LoadingSpinner variant="page" size="lg" />;
  }

  return (
    <Suspense fallback={<LoadingSpinner variant="page" size="lg" />}>
        <Layout {...data as BaseLayoutProps} />
    </Suspense>
  );
}
