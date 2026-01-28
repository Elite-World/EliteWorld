import type { Metadata } from 'next';

import './globals.css';
import { ModalProvider } from '@repo/domain';
import { AppLayout } from '@/components/layouts/AppLayout';
import { getNavigationData } from '@repo/apps-config/landing/navbar-config';
import { siteConfig } from '@repo/apps-config/landing/site-config';

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
