'use client';

import { useModalStore } from '@/lib/stores/useModalStore';
import { Modal } from '../components/Modal';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { NavigationItem } from '@/lib/types/navigation';
import { navigationIcons } from '@/lib/components/NavigationIcons';

interface MainMenuModalProps {
  items: NavigationItem[];
}

export function MainMenuModal({ items }: MainMenuModalProps) {
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
          <h2 className="text-lg font-semibold">Menu</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.map(item => (
            <div key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-5 py-3 transition-colors',
                  isDark 
                    ? 'text-gray-200 hover:bg-gray-900' 
                    : 'text-gray-800 hover:bg-gray-50'
                )}
                onClick={close}
              >
                {navigationIcons[item.id] && (
                  <span className="mr-3">{navigationIcons[item.id]}</span>
                )}
                {item.label}
              </Link>
              {item.children && (
                <div className={cn(
                  'pl-8 border-l',
                  isDark ? 'border-gray-800' : 'border-gray-100'
                )}>
                  {item.children.map(child => (
                    <Link
                      key={child.id}
                      href={child.href}
                      className={cn(
                        'flex items-center px-5 py-3 transition-colors',
                        isDark 
                          ? 'text-gray-300 hover:bg-gray-900' 
                          : 'text-gray-600 hover:bg-gray-50'
                      )}
                      onClick={close}
                    >
                      {navigationIcons[child.id] && (
                        <span className="mr-3">{navigationIcons[child.id]}</span>
                      )}
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
} 