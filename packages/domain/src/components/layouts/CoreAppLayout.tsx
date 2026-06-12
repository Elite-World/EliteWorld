'use client';

import { useEffect, useState } from 'react';
import { ScrollProgress } from '../shared/ScrollProgress';
import { GlobalRibbon } from '../shared/GlobalRibbon';
import { Navbar, Footer, NavigationData } from '@repo/ui';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { useLanguageStore, useLanguageSwitcher } from '../../lib/stores/useLanguageStore';
import { useModalStore } from '../../lib/stores/useModalStore';
import { useDevStore } from '../../lib/stores/useDevStore';
import { useNavbarStore } from '../../lib/stores/useNavbarStore';
import { DevToolsToggle } from '../shared/DevToolsToggle';

export interface CoreAppLayoutProps {
  children: React.ReactNode;
  navigation: NavigationData;
  siteConfig: any;
  navGateway: any;
}

export function CoreAppLayout({ children, navigation, siteConfig, navGateway }: CoreAppLayoutProps) {
  // Theme Handling
  const isDark = useThemeStore((state) => state.isDark);
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const setIsDark = useThemeStore((state) => state.setIsDark);
  
  const { handleToggle } = useLanguageSwitcher();
  const language = useLanguageStore((state) => state.language);
  
  const openModal = useModalStore((state) => state.open);
  const activeModal = useModalStore((state) => state.activeModal);

  // Keep main menu modal props in sync if navigation changes while open
  const navItemsStr = JSON.stringify(navigation.items);
  useEffect(() => {
    if (activeModal === 'mainMenu') {
      openModal('mainMenu', { items: navigation.items, siteConfig });
    }
  }, [navItemsStr, activeModal, openModal, siteConfig]);
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  const forceSolidNavbar = useNavbarStore((state) => state.forceSolid);

  // Hydration fix / Initial load
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
    <div className="min-h-screen transition-colors bg-white text-black dark:bg-black dark:text-white">
      {/* Fixed position elements with higher z-index */}
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
      </div>

      <Navbar
        navigation={navigation}
        siteConfig={siteConfig}
        navGateway={navGateway}
        isDark={mounted ? isDark : false}
        mode={mounted ? mode : 'system'} // Pass correct mode here, matching server initially
        onToggleTheme={toggleTheme}
        onOpenSearch={() => openModal('search')}
        onOpenMenu={(items) => openModal('mainMenu', { items, siteConfig })}
        forceSolid={forceSolidNavbar}
        language={mounted ? language : 'en'}
        onToggleLanguage={handleToggle}
      />

      {/* Main content */}
      <div className="relative">{children}</div>
      <footer>
        <Footer siteConfig={{ name: siteConfig.name }} showHiddenElements={showHiddenElements} />
      </footer>

      {/* Global Side Ribbon */}
      <GlobalRibbon siteConfig={siteConfig} />

      {/* Dev Tools Toggle (Only renders in dev mode) */}
      <DevToolsToggle />
    </div>
  );
}
