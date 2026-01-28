'use client';

import { useEffect } from 'react';

import { ScrollProgress } from '@repo/domain';
import { Navbar, Footer } from '@repo/ui';
import { NavigationData } from '@/lib/types/navigation';
import { ScrollToTopButton } from '@repo/domain';
// import { Footer } from '../Footer';
import { useThemeStore } from '@repo/domain';
import { useModalStore } from '@repo/domain';
import { siteConfig } from '@repo/apps-config/country/site-config';
import { navGateway } from '@repo/apps-config/country/navbar-config';

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
        '(prefers-color-scheme: dark)',
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
    <div className="min-h-screen transition-colors bg-black text-white overflow-hidden relative">
      {/* Fixed position elements with higher z-index */}
      {/* Scroll progress - optional for single screen but kept for consistency */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
      </div>

      {/* Navbar - Fixed Overlay */}
      <div className="fixed top-0 left-0 right-0 z-40">
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

      {/* Main content - Full Screen behind overlays */}
      <div className="relative h-screen">{children}</div>

      {/* Footer - Fixed Overlay */}
      <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <Footer
            siteConfig={{ name: siteConfig.name }}
            className="bg-transparent dark:bg-transparent border-none text-[10px] md:text-sm text-white/50 hover:text-white transition-colors"
          />
        </div>
      </div>

      {/* Scroll to top button - likely not needed for h-screen but keeping just in case */}
      <ScrollToTopButton />
    </div>
  );
}
