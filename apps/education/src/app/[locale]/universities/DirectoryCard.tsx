import React from 'react';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function DirectoryCard({
  university,
}: {
  university: any;
}) {
  const [logoError, setLogoError] = useState(false);
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dr435quj2';
  const logoUrl =
    university.logoUrl ||
    `https://res.cloudinary.com/${cloudName}/image/upload/${university.id}.png`;

  const countrySlug = (university.country || 'global')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const nameSlug = (university.nameEn || university.name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const href = `/universities/${countrySlug}/${nameSlug}`;

  return (
    <div
      className="group relative flex flex-col p-6 bg-white dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row: Logo */}
        <div className="flex justify-start mb-4">
          <div className="relative w-14 h-14 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 p-1 overflow-hidden shrink-0">
            <Link href={href} className="w-full h-full block relative">
              {logoUrl && !logoError ? (
                <Image
                  src={logoUrl}
                  alt={university.name}
                  fill
                  className="object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <Building2 className="w-8 h-8 text-gray-300 dark:text-gray-600 m-auto mt-2" />
              )}
            </Link>
          </div>
        </div>

        {/* Center: Info */}
        <div className="flex-1 mb-6">
          <Link href={href} className="block">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {university.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            {university.country}
          </div>
        </div>

        {/* Bottom: Action */}
        <div className="mt-auto border-t border-gray-100 dark:border-zinc-800 pt-4 flex justify-between items-center group-hover:border-transparent transition-colors">
          <Link
            href={href}
            className="flex-1 flex justify-between items-center group-hover:text-blue-600 dark:group-hover:text-blue-400"
          >
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider transition-colors">
              View Profile
            </span>
            <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
