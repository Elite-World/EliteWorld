'use client';

import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';
import { NavigationData, NavigationItem } from '@/lib/types/navigation';
import {navGateway} from '@/config/navbar-config';
import { siteConfig } from '@/config/site-config';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { UserMenu } from './UserMenu';
import { useModalStore } from '@/lib/stores/useModalStore';
import { 
  HiOutlineMagnifyingGlass, // for search
  HiOutlineBars3, // for menu
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineComputerDesktop
} from 'react-icons/hi2';
import { useScrollPosition } from '@/lib/hooks/useScrollPosition';

interface NavbarProps {
  navigation: NavigationData;
}

function DesktopMenuItem({ item, isTransparent }: { item: NavigationItem; isTransparent?: boolean }) {
  const isDark = useThemeStore((state) => state.isDark);
  const hasChildren = item.children && item.children.length > 0;
  
  return (
    <div className="relative group">
      <Link 
        href={item.href}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors relative',
          'hover:text-blue-500',
          // Hover line effect
          'after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5',
          'after:bg-blue-500 after:scale-x-0 after:origin-left',
          'after:transition-transform group-hover:after:scale-x-100',
          isTransparent
            ? 'text-white hover:bg-white/10'
            : isDark 
              ? 'text-gray-200 hover:bg-[#2C2C2E]' 
              : 'text-gray-700 hover:bg-gray-50'
        )}
      >
        {item.icon && (
          <span>{item.icon}</span>
        )}
        <span>{item.label}</span>
        {hasChildren && (
          <svg 
            className={cn(
              'w-4 h-4 ml-1 transition-transform duration-200',
              'group-hover:rotate-180'
            )}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        )}
      </Link>

      {/* Dropdown Menu */}
      {hasChildren && (
        <div className={cn(
          'absolute top-full left-0 mt-1 py-2 min-w-[200px]',
          'rounded-lg overflow-hidden',
          'transform opacity-0 -translate-y-2 invisible',
          'group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible',
          'transition-all duration-200',
          isTransparent
            ? 'bg-white/10 backdrop-blur-md'
            : isDark 
              ? 'bg-black/90 backdrop-blur-lg shadow-lg' 
              : 'bg-white/90 backdrop-blur-lg shadow-lg'
        )}>
          {item.children?.map(child => (
            <Link
              key={child.id}
              href={child.href}
              className={cn(
                'flex items-center px-4 py-2 text-sm font-medium',
                'transition-colors duration-150',
                isTransparent
                  ? 'text-white/90 hover:text-white hover:bg-white/20'
                  : isDark 
                    ? 'text-gray-200 hover:text-blue-500 hover:bg-gray-800/50' 
                    : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100/50'
              )}
            >
              {child.icon && (
                <span className="mr-2">{child.icon}</span>
              )}
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuLink({ item, mobile = false }: { item: NavigationItem; mobile?: boolean }) {
  const isDark = useThemeStore((state) => state.isDark);
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = mobile && item.children && item.children.length > 0;
  
  if (!mobile) {
    return (
      <Link 
        href={item.href}
        className={cn(
          'px-4 py-2 rounded-lg transition-colors',
          isDark 
            ? 'text-gray-200 hover:bg-[#2C2C2E]' 
            : 'text-gray-800 hover:bg-gray-50'
        )}
      >
        {item.icon && (
          <span className="mr-2">{item.icon}</span>
        )}
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <Link 
          href={item.href}
          className={cn(
            'flex-1 px-5 py-3 transition-colors',
            isDark 
              ? 'text-gray-200 hover:bg-gray-900' 
              : 'text-gray-800 hover:bg-gray-50'
          )}
        >
          {item.icon && (
            <span className="mr-2">{item.icon}</span>
          )}
          {item.label}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'p-3 transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
            aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
      
      {/* Children Menu */}
      {hasChildren && (
        <div 
          className={cn(
            'overflow-hidden transition-all duration-200',
            isExpanded ? 'max-h-96' : 'max-h-0'
          )}
        >
          <div className={cn(
            'pl-8 border-l',
            isDark ? 'border-gray-800' : 'border-gray-100'
          )}>
            {item.children?.map(child => (
              <Link
                key={child.id}
                href={child.href}
                className={cn(
                  'block px-5 py-3 transition-colors',
                  isDark 
                    ? 'text-gray-300 hover:bg-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                {child.icon && (
                  <span className="mr-2">{child.icon}</span>
                )}
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function IconButton({ 
  icon, 
  label, 
  onClick,
  isTransparent 
}: { 
  icon: React.ReactNode; 
  label: string;
  onClick?: () => void;
  isTransparent?: boolean;
}) {
  const isDark = useThemeStore((state) => state.isDark);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-lg transition-colors',
        isTransparent
          ? 'text-white hover:bg-white/10'
          : isDark 
            ? 'text-gray-200 hover:bg-[#2C2C2E]' 
            : 'text-gray-800 hover:bg-gray-50'
      )}
      aria-label={label}
    >
      {icon}
    </button>
  );
}

function NavbarModeToggle({ isTransparent }: { isTransparent?: boolean }) {
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cycleMode = () => {
    if (mode === 'system') setMode('light');
    else if (mode === 'light') setMode('dark');
    else setMode('system');
  };

  const getIcon = () => {
    switch (mode) {
      case 'light': return <HiOutlineSun className="w-5 h-5" />;
      case 'dark': return <HiOutlineMoon className="w-5 h-5" />;
      case 'system': return <HiOutlineComputerDesktop className="w-5 h-5" />;
      default: return <HiOutlineComputerDesktop className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    switch (mode) {
      case 'light': return 'Switch to dark mode';
      case 'dark': return 'Switch to system mode';
      case 'system': return 'Switch to light mode';
      default: return 'Switch mode';
    }
  };

  return (
    <IconButton 
      icon={getIcon()} 
      label={getLabel()} 
      onClick={cycleMode}
      isTransparent={isTransparent}
    />
  );
}

export function Navbar({ navigation }: NavbarProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const { open } = useModalStore();

  const { scrollY, isHeroVisible } = useScrollPosition();
  const isScrolled = scrollY > 0;

  return (
    <nav 
      className={cn(
        'sticky top-0 border-b transition-all duration-300',
        // Only add backdrop blur when scrolled
        isScrolled && 'backdrop-blur-lg',
        // Transform and opacity for smooth transitions
        isHeroVisible 
          ? 'translate-y-0 opacity-100 pointer-events-auto' 
          : '-translate-y-full opacity-0 pointer-events-none',
        isScrolled ? (
          isDark 
            ? 'bg-black/75 border-[#2C2C2E] text-gray-200' 
            : 'bg-white/75 border-gray-200 text-gray-800'
        ) : (
          'bg-transparent border-transparent text-white'
        )
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Site Name with hover effect */}
          <div className="relative group">
            <Link 
              href="/" 
              className={cn(
                'text-lg font-semibold relative',
                'transition-colors',
                // Hover line effect
                'after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5',
                'after:bg-blue-500 after:scale-x-0 after:origin-left',
                'after:transition-transform group-hover:after:scale-x-100',
                isScrolled ? 'hover:text-blue-500' : 'hover:text-blue-200'
              )}
            >
              {navGateway.main?.name || siteConfig.name}
            </Link>

            {/* Dropdown Menu */}
            <div className={cn(
              'absolute top-full left-0 mt-1 py-2 min-w-[160px]',
              'rounded-lg overflow-hidden',
              'transform opacity-0 -translate-y-2 invisible',
              'group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible',
              'transition-all duration-200',
              isScrolled
                ? 'bg-white/90 backdrop-blur-lg shadow-lg dark:bg-black/90'
                : 'bg-white/10 backdrop-blur-md'
            )}>
              {Object.values(navGateway).filter(item => item && item !== navGateway.main).map((site) => (
                <a
                  key={site.href}
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block px-4 py-2 text-sm font-medium',
                    'transition-colors duration-150',
                    isScrolled
                      ? 'text-gray-700 hover:text-blue-500 hover:bg-gray-100/50 dark:text-gray-200 dark:hover:bg-gray-800/50'
                      : 'text-white/90 hover:text-white hover:bg-white/20'
                  )}
                >
                  {site.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Main Menu */}
            <div className="flex space-x-2">
              {navigation.items.map(item => (
                <DesktopMenuItem 
                  key={item.id} 
                  item={item} 
                  isTransparent={!isScrolled}
                />
              ))}
            </div>

            {/* Actions */}
            <div className={cn(
              "flex items-center space-x-2 pl-4 border-l",
              isScrolled ? (
                isDark ? "border-gray-800" : "border-gray-200"
              ) : "border-white/20"
            )}>
              {siteConfig.features.search && (
                <IconButton 
                  icon={<HiOutlineMagnifyingGlass className="w-5 h-5" />} 
                  label="Search" 
                  onClick={() => open('search')}
                  isTransparent={!isScrolled}
                />
              )}
              {siteConfig.features.mode && (
                <NavbarModeToggle isTransparent={!isScrolled} />
              )}
              {siteConfig.features.user && (
                <UserMenu isTransparent={!isScrolled} />
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            {siteConfig.features.mode && (
              <NavbarModeToggle isTransparent={!isScrolled} />
            )}
            {siteConfig.features.user && (
              <UserMenu isMobile isTransparent={!isScrolled} />
            )}
            <IconButton
              icon={<HiOutlineBars3 className="w-5 h-5" />}
              label="Main menu"
              onClick={() => open('mainMenu', { items: navigation.items })}
              isTransparent={!isScrolled}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}