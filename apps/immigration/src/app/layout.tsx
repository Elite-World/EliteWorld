import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar, Footer } from '@repo/ui'; // Shared UI!

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Elite Immigration',
  description: 'Expert immigration services.',
};

// Simple navigation mock for now
const navigation = {
  items: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ]
};

const navGateway = {
    'home': { href: '/', name: 'Home' }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar 
          navigation={navigation}
          siteConfig={{ name: 'Elite Immigration', features: { search: true, mode: true, user: true } }}
          navGateway={navGateway}
          isDark={false} // Default for now
        />
        <main className="min-h-screen">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
