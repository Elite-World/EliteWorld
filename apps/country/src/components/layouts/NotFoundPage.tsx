'use client';

import { HeroSection } from '@repo/ui';
import { useThemeStore } from '@repo/web-shared';
import { cn } from '@repo/web-shared';
import Link from 'next/link';

export function NotFoundPage() {
  const isDark = useThemeStore((state) => state.isDark);

  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection
        mode="page"
        title="404 - Page Not Found"
        subtitle="Oops! It seems you've ventured into uncharted territory."
      />

      <div className="flex-1 container mx-auto px-4 flex flex-col items-center justify-center text-center py-24">
        <div
          className={cn(
            'p-8 rounded-2xl max-w-lg w-full',
            isDark ? 'bg-gray-800/50' : 'bg-gray-100'
          )}
        >
          <div className="text-6xl mb-6">🧭</div>
          <h2
            className={cn(
              'text-2xl font-bold mb-4',
              isDark ? 'text-white' : 'text-gray-900'
            )}
          >
            Lost your way?
          </h2>
          <p className={cn('mb-8', isDark ? 'text-gray-400' : 'text-gray-600')}>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
