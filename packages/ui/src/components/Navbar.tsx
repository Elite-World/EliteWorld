'use client';

import { cn } from '../utils';
import { NavigationData, NavigationItem } from '../types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { UserMenu } from './UserMenu';
import {
  Search,
  Menu,
  Sun,
  Moon,
  Monitor,
  Globe,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  X,
} from 'lucide-react';

export interface NavbarConfig {
  features: {
    search: boolean;
    mode: boolean;
    user: boolean;
    language?: boolean;
  };
  name: string;
  enName?: string;
}

export interface NavbarProps {
  navigation: NavigationData;
  navGateway?: Record<string, { href: string; name: string }>;
  siteConfig?: NavbarConfig;
  isDark?: boolean;
  mode?: 'light' | 'dark' | 'system';
  onToggleTheme?: () => void;
  onOpenSearch?: () => void;
  onOpenMenu?: (items: NavigationItem[]) => void;
  forceSolid?: boolean;
  language?: 'en' | 'zh';
  onToggleLanguage?: () => void;
}

function IconButton({
  icon,
  label,
  onClick,
  isTransparent,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isTransparent?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2.5 rounded-xl transition duration-300',
        isTransparent
          ? 'text-white/80 hover:text-white hover:bg-white/10'
          : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-white/5',
      )}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

export function NavbarModeToggle({
  isTransparent,
  onClick,
  mode,
}: {
  isTransparent?: boolean;
  onClick?: () => void;
  mode?: 'light' | 'dark' | 'system';
}) {
  let icon = <Monitor className="w-4 h-4" />;
  let label = 'System Theme';

  if (mode === 'light') {
    icon = <Sun className="w-4 h-4" />;
    label = 'Light Mode';
  } else if (mode === 'dark') {
    icon = <Moon className="w-4 h-4" />;
    label = 'Dark Mode';
  }

  return (
    <IconButton
      icon={icon}
      label={label}
      onClick={onClick}
      isTransparent={isTransparent}
    />
  );
}

export function NavbarLanguageToggle({
  isTransparent,
  onClick,
  language,
}: {
  isTransparent?: boolean;
  onClick?: () => void;
  language?: 'en' | 'zh';
}) {
  return (
    <IconButton
      icon={
        <div className="flex items-center justify-center font-bold text-xs w-4 h-4 leading-none">
          {language === 'zh' ? '中' : 'EN'}
        </div>
      }
      label="Toggle Language"
      onClick={onClick}
      isTransparent={isTransparent}
    />
  );
}

function DesktopMenuItem({
  item,
  isTransparent,
  isDark,
  language = 'en',
}: {
  item: NavigationItem;
  isTransparent?: boolean;
  isDark?: boolean;
  language?: 'en' | 'zh';
}) {
  const hasChildren = item.children && item.children.length > 0;
  const isZh = language === 'zh';

  return (
    <div className="relative group">
      <Link
        href={item.href}
        {...(item.external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-xl transition duration-300 relative text-[10px] font-black uppercase tracking-widest',
          isTransparent
            ? 'text-white/90 hover:text-white hover:bg-white/10'
            : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-white/5',
        )}
      >
        {item.label}
        {hasChildren && (
          <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" />
        )}
      </Link>

      {/* Dropdown Menu */}
      {hasChildren && (
        <div
          className={cn(
            'absolute top-full left-0 mt-2 py-3 min-w-[240px]',
            'rounded-3xl border border-gray-100 dark:border-white/5 overflow-hidden',
            'transform opacity-0 -translate-y-2 invisible',
            'group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible',
            'transition duration-300 shadow-2xl',
            isTransparent
              ? 'bg-white/80 dark:bg-[#1A1A1A]/90 backdrop-blur-xl border-gray-200 dark:border-white/10'
              : 'bg-white dark:bg-[#1A1A1A]',
          )}
        >
          <div className="px-4 py-2 mb-2 border-b border-gray-50 dark:border-white/5">
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">
              {isZh ? '快捷导航' : 'Navigation'}
            </span>
          </div>
          {item.children?.map((child: NavigationItem) => (
            <Link
              key={child.id}
              href={child.href}
              className={cn(
                'flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition',
                isTransparent
                  ? 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-white/5',
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({
    scrollY: 0,
    isHeroVisible: true,
    isScrollingUp: true,
  });
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition({
        scrollY: currentScrollY,
        isHeroVisible: currentScrollY < 100,
        isScrollingUp: currentScrollY < lastScrollY || currentScrollY < 50,
      });
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollPosition;
}

export function Navbar({
  navigation,
  navGateway = {},
  siteConfig = {
    name: 'EliteWorld',
    features: { search: true, mode: true, user: true },
  },
  isDark = false,
  mode = 'system',
  onToggleTheme,
  onOpenSearch,
  onOpenMenu,
  forceSolid = false,
  language = 'en',
  onToggleLanguage,
}: NavbarProps) {
  const { scrollY, isHeroVisible, isScrollingUp } = useScrollPosition();
  const isScrolled = scrollY > 20 || forceSolid;
  const [isDomainOpen, setIsDomainOpen] = useState(false);
  const isZh = language === 'zh';

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-100 border-b transition duration-500 transform-gpu will-change-transform',
        isScrolled
          ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-gray-100 dark:border-white/5 shadow-sm py-2'
          : 'bg-transparent border-transparent py-4',
        !isScrollingUp && scrollY > 20 ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            {/* Brand Logo & Domain Switcher Wrapper */}
            <div
              className="relative group/brand flex items-center gap-1"
              onMouseEnter={() => setIsDomainOpen(true)}
              onMouseLeave={() => setIsDomainOpen(false)}
            >
              <Link href="/" className="flex items-center gap-4 py-2">
                <div
                  className={cn(
                    'p-2.5 rounded-2xl shadow-2xl transition duration-500 group-hover/brand:scale-110',
                    isScrolled ? 'bg-[#0a0a0a] dark:bg-white' : 'bg-white',
                  )}
                >
                  <Globe
                    className={cn(
                      'w-5 h-5',
                      isScrolled ? 'text-white dark:text-black' : 'text-black',
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'font-sans font-black text-xl tracking-tighter uppercase transition-colors',
                    isScrolled ? 'text-gray-900 dark:text-white' : 'text-white',
                  )}
                >
                  {(siteConfig.enName || siteConfig.name)
                    .split(/(?=[A-Z])/)
                    .map((part, i) => (
                      <span key={i} className={i === 1 ? 'text-blue-600' : ''}>
                        {part.toUpperCase()}
                      </span>
                    ))}
                </span>
              </Link>

              {navGateway && Object.keys(navGateway).length > 1 && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDomainOpen(!isDomainOpen);
                  }}
                  className="hidden md:block p-1 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-hidden"
                  aria-label="Toggle Domain Menu"
                >
                  <ChevronDown
                    className={cn(
                      'w-4 h-4 text-gray-400 transition-transform duration-300',
                      isDomainOpen
                        ? 'rotate-180'
                        : 'group-hover/brand:rotate-180',
                    )}
                  />
                </button>
              )}

              {/* Domain Switcher Dropdown */}
              {navGateway && Object.keys(navGateway).length > 1 && (
                <div
                  className={cn(
                    'hidden md:block absolute top-full left-0 mt-2 p-2 w-64 bg-white/90 dark:bg-[#1A1A1A]/95 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-3xl shadow-2xl transition duration-300 transform origin-top-left z-110',
                    isDomainOpen
                      ? 'opacity-100 translate-y-0 visible'
                      : 'opacity-0 translate-y-2 invisible group-hover/brand:opacity-100 group-hover/brand:translate-y-0 group-hover/brand:visible',
                  )}
                >
                  <div className="px-4 py-3 border-b border-gray-50 dark:border-white/5 mb-2">
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                      {isZh ? '关联服务站点' : 'Top-Level Domains'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    {Object.entries(navGateway).map(([key, item]) => (
                      <a
                        key={key}
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-2xl transition group',
                          item.name === siteConfig.name
                            ? 'bg-blue-600/5 dark:bg-blue-600/10'
                            : 'hover:bg-gray-50 dark:hover:bg-white/5',
                        )}
                      >
                        <div
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-colors',
                            item.name === siteConfig.name
                              ? 'bg-blue-600 animate-pulse'
                              : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-blue-600',
                          )}
                        />
                        <span
                          className={cn(
                            'text-[10px] font-black uppercase tracking-widest transition-colors',
                            item.name === siteConfig.name
                              ? 'text-blue-600'
                              : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600',
                          )}
                        >
                          {item.name}
                        </span>
                        {item.name === siteConfig.name && (
                          <Sparkles className="w-3 h-3 text-blue-600 ml-auto" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              {navigation.items.map((item: NavigationItem) => (
                <DesktopMenuItem
                  key={item.id}
                  item={item}
                  isTransparent={!isScrolled}
                  isDark={isDark}
                  language={language}
                />
              ))}
            </div>

            <div
              className={cn(
                'flex items-center gap-2 pl-6 border-l transition-colors duration-500',
                isScrolled
                  ? 'border-gray-100 dark:border-white/5'
                  : 'border-gray-200 dark:border-white/10',
              )}
            >
              {siteConfig.features.search && (
                <IconButton
                  icon={<Search className="w-4 h-4" />}
                  label="Registry Search"
                  onClick={onOpenSearch}
                  isTransparent={!isScrolled}
                />
              )}
              {siteConfig.features.language !== false && (
                <NavbarLanguageToggle
                  isTransparent={!isScrolled}
                  onClick={onToggleLanguage}
                  language={language}
                />
              )}
              {siteConfig.features.mode && (
                <NavbarModeToggle
                  isTransparent={!isScrolled}
                  onClick={onToggleTheme}
                  mode={mode}
                />
              )}
              {siteConfig.features.user && (
                <div className="ml-2">
                  <UserMenu isTransparent={!isScrolled} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            {siteConfig.features.user && (
              <UserMenu isTransparent={!isScrolled} />
            )}
            <IconButton
              icon={<Menu className="w-5 h-5" />}
              label="Main menu"
              onClick={() => onOpenMenu?.(navigation.items)}
              isTransparent={!isScrolled}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
