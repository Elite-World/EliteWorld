'use client';

import { useModalStore } from '@/lib/stores/useModalStore';
import { Modal } from '../components/Modal';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { menuIcons } from '../components/UserMenuIcons';

interface UserMenuModalProps {
  items: Array<{
    id: string;
    label: string;
    href: string;
    onClick?: () => void;
  }>;
}

export function UserMenuModal({ items }: UserMenuModalProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const { close } = useModalStore();

  return (
    <Modal 
      isOpen 
      onClose={close}
      variant="bottom"
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold">Account</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.map(item => (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex items-center px-5 py-3 transition-colors',
                isDark 
                  ? 'text-gray-200 hover:bg-gray-900' 
                  : 'text-gray-800 hover:bg-gray-50'
              )}
              onClick={() => {
                close();
                item.onClick?.();
              }}
            >
              {menuIcons[item.id] && (
                <span className="mr-3">{menuIcons[item.id]}</span>
              )}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </Modal>
  );
} 