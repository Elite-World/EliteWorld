'use client';

import { useState, useEffect } from 'react';

import { ScrollProgress } from '@repo/web-shared';
import { Navbar, Footer } from '@repo/ui';
import { NavigationData } from '@/lib/types/navigation';
import { ScrollToTopButton } from '@repo/web-shared';
// import { Footer } from '../Footer';
import { useThemeStore } from '@repo/web-shared';
import { useModalStore } from '@repo/web-shared';
import { siteConfig } from '@repo/web-shared/config/landing/site-config';
import { navGateway } from '@repo/web-shared/config/landing/navbar-config';

interface BaseLayoutProps {
  children: React.ReactNode;
  navigation: NavigationData;
}

export function AppLayout({ children, navigation }: BaseLayoutProps) {
  // Theme Handling
  const isDark = useThemeStore((state) => state.isDark); // Consumed by Navbar
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const setIsDark = useThemeStore((state) => state.setIsDark);
  const openModal = useModalStore((state) => state.open);

  // Hydration fix / Initial load
  useEffect(() => {
    const handleThemeChange = () => {
      const isSystemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      const shouldBeDark =
        mode === 'dark' || (mode === 'system' && isSystemDark);

      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
    };

    handleThemeChange();

    // Listen for system changes if in system mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => {
      if (mode === 'system') handleThemeChange();
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, [mode, setIsDark]);

  const toggleTheme = () => {
    // Cycle: system -> light -> dark -> system
    if (mode === 'system') setMode('light');
    else if (mode === 'light') setMode('dark');
    else setMode('system');
  };

  return (
    <div className="min-h-screen transition-colors bg-white text-black dark:bg-black dark:text-white">
      {/* Fixed position elements with higher z-index */}
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
      </div>

      {/* Navbar */}
      <div className="sticky top-0 z-40">
        <Navbar
          navigation={navigation}
          siteConfig={siteConfig}
          navGateway={navGateway}
          isDark={isDark}
          mode={mode} // Pass correct mode here
          onToggleTheme={toggleTheme}
          onOpenSearch={() => openModal('search')}
          onOpenMenu={(items) => openModal('mainMenu', { items })}
        />
      </div>

      {/* Main content */}
      <div className="relative">{children}</div>
      <footer>
        <Footer siteConfig={{ name: siteConfig.name }} />
      </footer>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}
