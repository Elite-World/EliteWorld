import { NavigationData } from '@/lib/types/navigation';

interface BaseLayoutProps {
  children: React.ReactNode;
  navigation: NavigationData;
}

export function Layout({ children, navigation }: BaseLayoutProps) {
  return (
    <div className="min-h-screen transition-colors bg-white text-black dark:bg-gray-900 dark:text-white">
      {/* Add Daisy-specific components here */}
      {/* <DaisyNavbar navigation={navigation} /> */}
      {children}
    </div>
  );
} 