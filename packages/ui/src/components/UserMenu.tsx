import { User } from 'lucide-react';
import { cn } from '../utils';

export function UserMenu({
  isMobile,
  isTransparent,
}: {
  isMobile?: boolean;
  isTransparent?: boolean;
}) {
  return (
    <button
      className={cn(
        'p-2.5 rounded-xl transition duration-300',
        isTransparent
          ? 'text-white/80 hover:text-white hover:bg-white/10'
          : 'text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent dark:hover:border-white/5',
      )}
    >
      <User className="w-5 h-5" />
      <span className="sr-only">User Menu</span>
    </button>
  );
}
