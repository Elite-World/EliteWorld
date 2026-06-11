import '../globals.css';
import { ModalProvider } from '@repo/domain';
import { CoreAppLayout } from '@repo/domain';
import { getNavigationData, getNavGateway } from '@repo/apps-config/landing/navbar-config';
import { siteConfig } from '@repo/apps-config/landing/site-config';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === 'zh';
  return {
    title: isZh ? 'EliteWorld 精英世界' : siteConfig.name,
    description: isZh ? '专业的留学与移民指导' : siteConfig.description,
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

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CoreAppLayout navigation={navigation} siteConfig={siteConfig} navGateway={localizedNavGateway}>{children}</CoreAppLayout>
        <ModalProvider />
      </body>
    </html>
  );
}
