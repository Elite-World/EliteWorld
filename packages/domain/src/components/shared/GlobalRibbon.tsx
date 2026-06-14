'use client';
import { useRibbonStore } from '../../lib/stores/useRibbonStore';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import {
  useLanguageStore,
  useLanguageSwitcher,
} from '../../lib/stores/useLanguageStore';
import { useModalStore } from '../../lib/stores/useModalStore';
import { cn } from '../../lib/utils';
import { useEffect, useState } from 'react';
import { ArrowUp, Search, Sun, Moon, Monitor, User } from 'lucide-react';
import { userMenuItems } from './UserMenu';

export interface GlobalRibbonProps {
  siteConfig?: any;
}

export function GlobalRibbon({ siteConfig }: GlobalRibbonProps) {
  const buttons = useRibbonStore((state) => state.buttons);
  const registerButton = useRibbonStore((state) => state.registerButton);
  const updateButton = useRibbonStore((state) => state.updateButton);

  const isDarkStore = useThemeStore((state) => state.isDark);
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);

  const language = useLanguageStore((state) => state.language);
  const { handleToggle: toggleLanguage } = useLanguageSwitcher();

  const openModal = useModalStore((state) => state.open);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted ? isDarkStore : false;

  // --- Centralized Visibility Logic ---
  useEffect(() => {
    const updateVisibility = () => {
      const isScrolled = window.scrollY > 300;

      updateButton('scroll-to-top', { visible: isScrolled });
      if (siteConfig?.features?.search !== false)
        updateButton('search-ribbon', { visible: isScrolled });
      if (siteConfig?.features?.language !== false)
        updateButton('language-ribbon', { visible: isScrolled });
      if (siteConfig?.features?.mode !== false)
        updateButton('theme-ribbon', { visible: isScrolled });
      if (siteConfig?.features?.user !== false)
        updateButton('user-ribbon', { visible: isScrolled });
    };

    window.addEventListener('scroll', updateVisibility);
    window.addEventListener('resize', updateVisibility);

    // Call once initially
    updateVisibility();

    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [updateButton]);

  // --- Button Registrations ---
  useEffect(() => {
    // 1. Scroll To Top
    registerButton({
      id: 'scroll-to-top',
      priority: -100, // Always at bottom
      visible: false, // Updated by listener
      icon: ArrowUp,
      label: 'Scroll to Top',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    });

    // 2. Search
    if (siteConfig?.features?.search !== false) {
      registerButton({
        id: 'search-ribbon',
        priority: 50, // Above scroll-to-top
        visible: false, // Updated by listener
        label: 'Search',
        icon: Search,
        onClick: () => openModal('search'),
      });
    }

    // 3. User
    if (siteConfig?.features?.user !== false) {
      registerButton({
        id: 'user-ribbon',
        priority: 60, // Above Search
        visible: false, // Updated by listener
        label: 'Account',
        icon: User,
        onClick: () =>
          openModal('userMenu', {
            items: userMenuItems.map((item) => ({ ...item })),
          }),
      });
    }
  }, [registerButton, openModal, siteConfig]);

  // 4. Theme Toggle (Needs separate effect because mode changes)
  useEffect(() => {
    if (siteConfig?.features?.mode === false) return;

    const ThemeIcon = mode === 'light' ? Sun : mode === 'dark' ? Moon : Monitor;
    const handleThemeToggle = () => {
      if (mode === 'system') setMode('light');
      else if (mode === 'light') setMode('dark');
      else setMode('system');
    };

    registerButton({
      id: 'theme-ribbon',
      priority: 40, // Between search and scroll-to-top
      visible: false, // Updated by listener
      label: 'Toggle Theme',
      icon: ThemeIcon,
      onClick: handleThemeToggle,
    });

    // Ensure icon and click handler are up to date when mode changes
    updateButton('theme-ribbon', {
      icon: ThemeIcon,
      onClick: handleThemeToggle,
    });
  }, [registerButton, updateButton, mode, setMode, siteConfig]);

  // 5. Language Toggle
  useEffect(() => {
    if (siteConfig?.features?.language === false) return;

    const handleLangToggle = () => toggleLanguage();

    registerButton({
      id: 'language-ribbon',
      priority: 45, // Between search (50) and theme (40)
      visible: false,
      label: 'Toggle Language',
      icon: ({ className }) => (
        <div
          className={cn(
            'flex items-center justify-center font-bold text-xs leading-none',
            className,
          )}
        >
          {language === 'zh' ? '中' : 'EN'}
        </div>
      ),
      onClick: handleLangToggle,
    });

    updateButton('language-ribbon', {
      icon: ({ className }) => (
        <div
          className={cn(
            'flex items-center justify-center font-bold text-xs leading-none',
            className,
          )}
        >
          {language === 'zh' ? '中' : 'EN'}
        </div>
      ),
      onClick: handleLangToggle,
    });
  }, [registerButton, updateButton, language, toggleLanguage, siteConfig]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => setIsMobileMenuOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const visibleButtons = buttons.filter((b) => b.visible);

  if (!isMounted || visibleButtons.length === 0) return null;

  return (
    <div
      className={cn(
        'fixed z-100 pointer-events-none transition duration-500',
        // Mobile positioning
        'bottom-8 right-4 flex flex-col-reverse items-end gap-2',
        // Desktop positioning
        'md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:right-0 md:flex-col md:gap-2',
      )}
    >
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={cn(
          'md:hidden pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition duration-300 z-50',
          isDark
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black text-white hover:bg-gray-800',
          isMobileMenuOpen && 'rotate-45',
        )}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {/* Button List (Desktop always visible, Mobile conditionally visible) */}
      <>
        <div
          className={cn(
            'flex flex-col-reverse items-end gap-2 pointer-events-auto',
            'md:flex-col md:gap-2',
            !isMobileMenuOpen && 'hidden md:flex',
          )}
        >
          {visibleButtons.map((button) => (
            <div key={button.id} className="relative animate-in fade-in duration-500">
              {button.component ? (
                button.component
              ) : (
                <button
                  onClick={() => {
                    button.onClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    'group flex flex-col items-center justify-center transition duration-300 shadow-lg',
                    // Mobile shape
                    'w-10 h-10 rounded-full md:w-16 md:h-16 md:rounded-l-2xl md:rounded-r-none',
                    // Individual ribbon hover expansion (desktop only)
                    'md:translate-x-[calc(100%-8px)] hover:md:translate-x-0',
                    // Colors
                    button.id === 'user-ribbon'
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:text-gray-900 dark:hover:bg-emerald-400'
                      : button.id === 'search-ribbon'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:text-gray-900 dark:hover:bg-blue-300'
                        : button.id === 'language-ribbon'
                          ? 'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-400 dark:text-gray-900 dark:hover:bg-purple-300'
                          : button.id === 'theme-ribbon'
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-400 dark:text-gray-900 dark:hover:bg-indigo-300'
                            : button.id === 'scroll-to-top'
                              ? 'bg-gray-900 text-white hover:bg-black dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white'
                              : 'bg-gray-500 text-white hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600',
                  )}
                  title={button.label}
                >
                  {button.icon && (
                    <button.icon className="w-4 h-4 md:w-6 md:h-6" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </>
    </div>
  );
}
