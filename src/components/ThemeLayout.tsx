import { BaseLayoutProps } from '@/lib/themes/types';
import { NavigationData } from '@/lib/types/navigation';
import { ClientThemeLayout } from './ClientThemeLayout';

interface ThemeLayoutProps {
  data: BaseLayoutProps & {
    navigation: NavigationData;
  };
}

export function ThemeLayout({ data }: ThemeLayoutProps) {
  return (
    <ClientThemeLayout data={data} />
  );
} 