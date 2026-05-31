import type { Metadata } from 'next';

import './globals.css';
import { ModalProvider } from '@repo/domain';
import { CoreAppLayout } from '@repo/domain';
import { getNavigationData, navGateway } from '@repo/apps-config/country/navbar-config';
import { siteConfig } from '@repo/apps-config/country/site-config';

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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CoreAppLayout navigation={navigation} siteConfig={siteConfig} navGateway={navGateway}>{children}</CoreAppLayout>
        <ModalProvider />
      </body>
    </html>
  );
}
