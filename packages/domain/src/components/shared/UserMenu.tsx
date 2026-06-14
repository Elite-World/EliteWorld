'use client';

// import { useState } from 'react';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import Link from 'next/link';
import { useModalStore } from '../../lib/stores/useModalStore';
import { menuIcons, UserIcon } from './UserMenuIcons';

export interface UserMenuItem {
  id: string;
  label: string;
  href: string;
  onClick?: () => void;
}

// Menu items without icons
export const userMenuItems: UserMenuItem[] = [
  {
    id: 'login',
    label: 'Log In',
    href: '/login',
  },
  {
    id: 'signup',
    label: 'Sign Up',
    href: '/signup',
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
  },
  {
    id: 'logout',
    label: 'Log Out',
    href: '/logout',
  },
];

interface UserMenuProps {
  isMobile?: boolean;
  isTransparent?: boolean;
}

export function UserMenu({
  isMobile = false,
  isTransparent = false,
}: UserMenuProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const { open } = useModalStore();

  // Desktop Dropdown Menu
  if (!isMobile) {
    return (
      <div className="relative group">
        <button
          className={cn(
            'p-2 rounded-lg transition-colors',
            isTransparent
              ? 'text-white hover:bg-white/10'
              : isDark
                ? 'hover:bg-[#2C2C2E] text-gray-200'
                : 'hover:bg-gray-50 text-gray-800',
          )}
          aria-label="User menu"
        >
          <UserIcon />
        </button>

        <div
          className={cn(
            'absolute right-0 top-full pt-2 w-56',
            'opacity-0 invisible group-hover:opacity-100 group-hover:visible',
            'transition duration-200',
          )}
        >
          <div
            className={cn(
              'rounded-lg shadow-lg py-1',
              isDark
                ? 'bg-[#1C1C1E] border border-[#2C2C2E]'
                : 'bg-white border border-gray-100',
            )}
          >
            {userMenuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-2 text-sm transition-colors',
                  'hover:bg-blue-50 hover:text-blue-500',
                  isDark ? 'text-gray-200 hover:bg-[#2C2C2E]' : 'text-gray-700',
                )}
                onClick={item.onClick}
              >
                {menuIcons[item.id] && (
                  <span className="mr-3">{menuIcons[item.id]}</span>
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Mobile Menu - Pass only serializable data
  return (
    <button
      onClick={() =>
        open('userMenu', {
          items: userMenuItems.map((item) => ({
            ...item,
            // Don't pass icon to store
          })),
        })
      }
      className={cn(
        'p-2 rounded-lg transition-colors',
        isTransparent
          ? 'text-white hover:bg-white/10'
          : isDark
            ? 'hover:bg-[#2C2C2E] text-gray-200'
            : 'hover:bg-gray-50 text-gray-800',
      )}
      aria-label="User menu"
    >
      <UserIcon />
    </button>
  );
}
