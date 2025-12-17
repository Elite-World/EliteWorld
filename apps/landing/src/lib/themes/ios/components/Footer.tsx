'use client';

import { cn } from '@/lib/utils';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { siteConfig } from '@/config/site-config';

export function Footer() {
  const isDark = useThemeStore((state) => state.isDark);
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      "border-t py-8 mt-auto",
      isDark 
        ? "bg-black border-gray-800 text-gray-400" 
        : "bg-white border-gray-100 text-gray-600"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <a href="/privacy-policy" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-blue-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
