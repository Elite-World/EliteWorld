import { getNavigationData } from '@/lib/services/navigation';
import { NavigationData } from '@/lib/types/navigation';

interface ThemeLayoutProps {
  children: React.ReactNode;
  navigation: NavigationData;
}

export function ThemeLayout({ children, navigation }: ThemeLayoutProps) {
  return (
    <div className="min-h-screen transition-colors bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Add Daisy-specific components here */}
      {/* <DaisyNavbar navigation={navigation} /> */}
      {children}
    </div>
  );
} 