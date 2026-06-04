'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '../../lib/utils';

interface CountryFlagProps {
  countrySlug: string;
  countryCode?: string;
  countryName?: string;
  fallbackUrl?: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

export function CountryFlag({
  countrySlug,
  countryCode,
  countryName = 'Country Flag',
  fallbackUrl,
  className,
  fill = true,
  width,
  height
}: CountryFlagProps) {
  const [error, setError] = useState(false);

  // If there's an explicit fallbackUrl in the DB, we can use it.
  // Otherwise default to Cloudinary using the slug.
  const src = error && fallbackUrl ? fallbackUrl : `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dr435quj2'}/image/upload/elite-world/countries-logos/${countrySlug}.png`;

  if (error && !fallbackUrl) {
    // If Cloudinary fails AND no DB fallback, show the placeholder code
    return (
      <div className={cn("w-full h-full flex items-center justify-center font-bold text-gray-400 bg-gray-100 dark:bg-zinc-800", className)}>
        {countryCode || '?'}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={countryName}
      fill={fill}
      width={width}
      height={height}
      className={cn("object-cover", className)}
      onError={() => setError(true)}
    />
  );
}
