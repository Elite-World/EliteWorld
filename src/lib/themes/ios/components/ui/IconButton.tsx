import { cn } from '@/lib/utils';
import { useThemeStore } from '@/lib/stores/useThemeStore';

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export function IconButton({ icon, label, onClick }: IconButtonProps) {
  const isDark = useThemeStore((state) => state.isDark);
  
  return (
    <button
      onClick={onClick}
      className={cn(
        'p-2 rounded-lg transition-colors',
        isDark 
          ? 'hover:bg-[#2C2C2E] text-gray-200' 
          : 'hover:bg-gray-50 text-gray-800'
      )}
      aria-label={label}
    >
      {icon}
    </button>
  );
} 