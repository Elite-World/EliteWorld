import '../globals.css';
import { ModalProvider } from '@repo/domain';
import { CoreAppLayout } from '@repo/domain';
import {
  getNavigationData,
  getNavGateway,
} from '@repo/apps-config/landing/navbar-config';
import { siteConfig } from '@repo/apps-config/landing/site-config';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentSiteConfig = siteConfig[locale as 'en' | 'zh'];
  return {
    title: currentSiteConfig.name,
    description: currentSiteConfig.description,
  };
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
  const localizedNavGateway = getNavGateway(locale);

  const currentSiteConfig = siteConfig[locale as 'en' | 'zh'];

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CoreAppLayout
          navigation={navigation}
          siteConfig={{ ...currentSiteConfig, enName: siteConfig.en.name }}
          navGateway={localizedNavGateway}
        >
          {children}
        </CoreAppLayout>
        <ModalProvider />
      </body>
    </html>
  );
}
