import { useModalStore } from '../../lib/stores/useModalStore';
import { Modal } from '../../components/ui/Modal';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { cn } from '../../lib/utils';
import Link from 'next/link';
import { NavbarModeToggle } from '@repo/ui';
import { UserMenu } from '../shared/UserMenu';

export interface MainMenuModalProps {
  items: any[]; // specific type should be imported or defined
  siteConfig: {
    features: {
      mode: boolean;
      user: boolean;
    };
  };
}

export function MainMenuModal({ items = [], siteConfig }: MainMenuModalProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const mode = useThemeStore((state) => state.mode);
  const setMode = useThemeStore((state) => state.setMode);
  const { close } = useModalStore();

  const toggleTheme = () => {
    if (mode === 'system') setMode('light');
    else if (mode === 'light') setMode('dark');
    else setMode('system');
  };

  return (
    <Modal isOpen onClose={close} variant="bottom">
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <h2
            className={cn(
              'text-lg font-semibold',
              isDark ? 'text-white' : 'text-black'
            )}
          >
            Menu
          </h2>
          <div className="flex items-center space-x-2">
            {siteConfig?.features?.mode && (
              <NavbarModeToggle
                isTransparent={false}
                onClick={toggleTheme}
                mode={mode}
              />
            )}
            {siteConfig?.features?.user && <UserMenu isTransparent={false} />}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {items.map((item) => (
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
                {item.icon && <span className="mr-3">{item.icon}</span>}
                {item.label}
              </Link>
              {item.children && (
                <div
                  className={cn(
                    'pl-8 border-l',
                    isDark ? 'border-gray-800' : 'border-gray-100'
                  )}
                >
                  {item.children.map((child: any) => (
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
                      {child.icon && <span className="mr-3">{child.icon}</span>}
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
