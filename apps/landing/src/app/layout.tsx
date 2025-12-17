import type { Metadata } from 'next';

import './globals.css';
import { ModalProvider } from '@/components/providers/ModalProvider';
import { AppLayout } from '@/components/layouts/AppLayout';
import { getNavigationData } from '@/config/navbar-config';

export const metadata: Metadata = {
  title: 'Elite World',
  description: 'Elite World Landing Page',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getNavigationData();

  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <AppLayout navigation={navigation}>{children}</AppLayout>
        <ModalProvider />
      </body>
    </html>
  );
}
