import { ScrollProgress } from '../components/ScrollProgress';
import { Navbar } from '../components/Navbar';
import { NavigationData } from '@/lib/types/navigation';
import { ScrollToTopButton } from '../components/ScrollToTopButton';
import { Footer } from '../components/Footer'; // Added Footer import

interface BaseLayoutProps {
  children: React.ReactNode;
  navigation: NavigationData;
}

export function Layout({ children, navigation }: BaseLayoutProps) {
  return (
    <div className="min-h-screen transition-colors bg-white text-black dark:bg-black dark:text-white">
      {/* Fixed position elements with higher z-index */}
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <ScrollProgress />
      </div>

      {/* Navbar */}
      <div className="sticky top-0 z-40">
        <Navbar navigation={navigation} />
      </div>

      {/* Main content */}
      <div className="relative">
        {children}
      </div>
      <footer>
        <Footer />
      </footer>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
} 