import { ScrollProgress } from '../components/ScrollProgress';
import { Navbar } from '../components/Navbar';
import { getNavigationData } from '@/lib/services/navigation';
import { NavigationData } from '@/lib/types/navigation';

interface ThemeLayoutProps {
  children: React.ReactNode;
  navigation: NavigationData;
}

export function ThemeLayout({ children, navigation }: ThemeLayoutProps) {
  return (
    <div className="min-h-screen transition-colors bg-white text-black dark:bg-black dark:text-white">
      {/* Fixed position elements with higher z-index */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
      </div>
      <div className="sticky top-0 z-40">
        <Navbar navigation={navigation} />
      </div>
      {/* Main content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
} 