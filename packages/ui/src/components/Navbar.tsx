'use client';

import { cn } from '../utils';
import { NavigationData, NavigationItem } from '../types';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { UserMenu } from './UserMenu'; 
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlineBars3, 
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineComputerDesktop
} from 'react-icons/hi2';

export interface NavbarConfig {
  features: { search: boolean; mode: boolean; user: boolean; };
  name: string;
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
    const isDark = false; 
    
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
  
export function NavbarModeToggle({ isTransparent, onClick, mode }: { isTransparent?: boolean; onClick?: () => void; mode?: 'light' | 'dark' | 'system' }) {
    let icon = <HiOutlineComputerDesktop className="w-5 h-5" />;
    let label = "System Theme";

    if (mode === 'light') {
        icon = <HiOutlineSun className="w-5 h-5" />;
        label = "Light Mode";
    } else if (mode === 'dark') {
        icon = <HiOutlineMoon className="w-5 h-5" />;
        label = "Dark Mode";
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

function DesktopMenuItem({ item, isTransparent, isDark }: { item: NavigationItem; isTransparent?: boolean; isDark?: boolean }) {
  const hasChildren = item.children && item.children.length > 0;
  
  return (
    <div className="relative group">
      <Link 
        href={item.href}
        className={cn(
          'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors relative',
          'hover:text-blue-500',
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
          <svg className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
          {item.children?.map((child: NavigationItem) => (
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

function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState({ scrollY: 0, isHeroVisible: true });
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({ 
        scrollY: window.scrollY, 
        isHeroVisible: window.scrollY < 100 // Approximation
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollPosition;
}

export function Navbar({ 
  navigation, 
  navGateway = {}, 
  siteConfig = { name: 'EliteWorld', features: { search: true, mode: true, user: true } },
  isDark = false,
  mode = 'system', 
  onToggleTheme,
  onOpenSearch,
  onOpenMenu
}: NavbarProps) {
  const { scrollY, isHeroVisible } = useScrollPosition();
  const isScrolled = scrollY > 0;
  
  const open = (view: string, data?: any) => { console.log('Open modal', view, data); };

  return (
    <nav className={cn(
      'sticky top-0 border-b transition-all duration-300',
      isScrolled && 'backdrop-blur-lg',
      isHeroVisible ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none',
      isScrolled ? (isDark ? 'bg-black/75 border-[#2C2C2E] text-gray-200' : 'bg-white/75 border-gray-200 text-gray-800') : ('bg-transparent border-transparent text-white')
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <div className="relative group">
            <Link href="/" className={cn('text-lg font-semibold relative transition-colors', isScrolled ? 'hover:text-blue-500' : 'hover:text-blue-200')}>
              {navGateway?.['main']?.name || siteConfig.name}
            </Link>
            
            {/* Brand Dropdown */}
            {navGateway && Object.keys(navGateway).length > 1 && (
                <div className={cn(
                    'absolute top-full left-0 mt-2 py-2 min-w-[200px]',
                    'rounded-lg overflow-hidden',
                    'transform opacity-0 -translate-y-2 invisible',
                    'group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible',
                    'transition-all duration-200',
                    !isScrolled 
                        ? 'bg-white/10 backdrop-blur-md'
                        : isDark
                            ? 'bg-black/90 backdrop-blur-lg shadow-lg' 
                            : 'bg-white/90 backdrop-blur-lg shadow-lg'
                )}>
                 {Object.entries(navGateway)
                    .filter(([key]) => key !== 'main')
                    .map(([key, item]) => (
                     <a 
                        key={key} 
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            'block px-4 py-2 text-sm font-medium transition-colors',
                            !isScrolled
                                ? 'text-white/90 hover:text-white hover:bg-white/20'
                                : isDark 
                                    ? 'text-gray-200 hover:text-blue-500 hover:bg-gray-800/50' 
                                    : 'text-gray-700 hover:text-blue-500 hover:bg-gray-100/50'
                        )}
                     >
                        {item.name}
                     </a>
                 ))}
                </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-2">
              {navigation.items.map((item: NavigationItem) => (
                <DesktopMenuItem key={item.id} item={item} isTransparent={!isScrolled} isDark={isDark} />
              ))}
            </div>
            <div className={cn("flex items-center space-x-2 pl-4 border-l", isScrolled ? (isDark ? "border-gray-800" : "border-gray-200") : "border-white/20")}>
               {siteConfig.features.search && <IconButton icon={<HiOutlineMagnifyingGlass className="w-5 h-5" />} label="Search" onClick={() => onOpenSearch?.()} isTransparent={!isScrolled} />}
               {siteConfig.features.mode && <NavbarModeToggle isTransparent={!isScrolled} onClick={onToggleTheme} mode={mode} />}
               {siteConfig.features.user && <UserMenu isTransparent={!isScrolled} />}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:hidden">
             <IconButton icon={<HiOutlineBars3 className="w-5 h-5" />} label="Main menu" onClick={() => onOpenMenu?.(navigation.items)} isTransparent={!isScrolled} />
          </div>
        </div>
      </div>
    </nav>
  );
}