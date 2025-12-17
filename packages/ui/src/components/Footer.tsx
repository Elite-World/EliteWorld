'use client';

import { cn } from '../utils';
import Link from 'next/link';
import { 
  FaTwitter, 
  FaGithub, 
  FaLinkedin, 
  FaInstagram,
  FaDiscord
} from 'react-icons/fa';

interface FooterProps {
    className?: string;
    siteConfig?: { name: string; description?: string; social?: Record<string, string> };
}

export function Footer({ className, siteConfig = { name: 'EliteWorld' } }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "border-t py-8 mt-auto",
      "bg-white border-gray-100 text-gray-600 dark:bg-black dark:border-gray-800 dark:text-gray-400"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-blue-500 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
