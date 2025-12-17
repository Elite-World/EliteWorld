import { HiOutlineUser } from 'react-icons/hi2';
import { cn } from '../utils';

export function UserMenu({ isMobile, isTransparent }: { isMobile?: boolean, isTransparent?: boolean }) {
  return (
    <button className={cn(
        "p-2 rounded-lg transition-colors",
        isTransparent ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
    )}>
       <HiOutlineUser className="w-5 h-5" />
       <span className="sr-only">User Menu</span>
    </button>
  );
}
