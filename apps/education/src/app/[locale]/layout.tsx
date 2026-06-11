import type { Metadata } from 'next';

import '../globals.css';
import { ModalProvider } from '@repo/domain';
import { CoreAppLayout } from '@repo/domain';
import { getNavigationData, navGateway } from '@repo/apps-config/education/navbar-config';
import { siteConfig } from '@repo/apps-config/education/site-config';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const navigation = await getNavigationData(locale);

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CoreAppLayout navigation={navigation} siteConfig={siteConfig} navGateway={navGateway}>{children}</CoreAppLayout>
        <ModalProvider />
      </body>
    </html>
  );
}
