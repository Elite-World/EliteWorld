// handle the page layout (HomePage, Blog, ...)

import { BaseLayoutProps } from '@/lib/themes/types';
import { ClientThemeSwitcher } from '../ClientThemeSwitcher';
import { getThemeFromCookie } from '@/lib/services/theme-cookie';
import { themes } from '@/lib/themes';
import { LayoutType } from '@/lib/themes/registry';

interface LayoutProviderProps {
  layoutName?: LayoutType; 
  data: BaseLayoutProps; 
}

export async function LayoutProvider({ data, layoutName = 'HomePage' }: LayoutProviderProps) { 
  const themeName = (await getThemeFromCookie()) || 'ios';
  
  const currentTheme = themes[themeName];
  const LayoutComponent = currentTheme.layouts[layoutName] || currentTheme.layouts['HomePage'];

  if (!LayoutComponent) {
     return (
        <div className="p-10 text-center">
           <h1 className="text-2xl font-bold">Layout Not Found</h1>
           <p>The layout "{layoutName}" is not implemented for theme "{themeName}".</p>
        </div>
     )
  }

  return (
    <ClientThemeSwitcher 
      initialTheme={themeName} 
      layoutName={layoutName} 
      data={data}
      mode="page"
    >
        <LayoutComponent {...data} />
    </ClientThemeSwitcher>
  );
} 