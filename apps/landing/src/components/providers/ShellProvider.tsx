// handle theme specified navbar, footer , and fonts.

import { getThemeFromCookie } from '@/lib/services/theme-cookie';
import { getNavigationData } from '@/config/navbar-config';
import { ClientThemeSwitcher } from '../ClientThemeSwitcher';
import { themes } from '@/lib/themes';
import React from 'react';

interface ShellProviderProps {
  children: React.ReactNode;
}

export async function ShellProvider({ children }: ShellProviderProps) {
  const themeName = (await getThemeFromCookie()) || 'ios';
  const navigation = await getNavigationData();
  const currentTheme = themes[themeName];
  const ThemeWrapper = currentTheme.wrapper;

  // Server-side render of the shell
  const serverContent = (
      <ThemeWrapper navigation={navigation}>
        {children}
      </ThemeWrapper>
  );

  return (
    <ClientThemeSwitcher
      initialTheme={themeName}
      data={{ navigation }}
      mode="shell"
    >
      {serverContent}
    </ClientThemeSwitcher>
  );
}
