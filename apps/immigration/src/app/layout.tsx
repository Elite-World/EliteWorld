import type { Metadata } from 'next';

import './globals.css';
import { ModalProvider } from '@repo/web-shared';
import { AppLayout } from '@/components/layouts/AppLayout';
import { getNavigationData } from '@repo/web-shared/config/immigration/navbar-config';
import { siteConfig } from '@repo/web-shared/config/immigration/site-config';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
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
