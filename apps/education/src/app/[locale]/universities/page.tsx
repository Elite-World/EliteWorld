import React from 'react';
import { Metadata } from 'next';
import { HeroSection } from '@repo/ui';
import { getAllUniversitiesDirectory } from '@repo/domain/services/ranking-service';
import UniversityDirectoryClient from './UniversityDirectoryClient';

import { unstable_cache } from 'next/cache';

export const metadata: Metadata = {
  title: 'Global Universities Directory | Elite World Education',
  description: 'Explore our comprehensive directory of universities worldwide.',
};

const getCachedUniversities = unstable_cache(
  async () => {
    return await getAllUniversitiesDirectory();
  },
  ['all-universities'],
  { revalidate: 3600 }
);

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

export default async function UniversitiesPage() {
  const universities = await getCachedUniversities();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-black/20 pb-20">
      <HeroSection
        mode="page"
        title="Global Universities Directory"
        className=""
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl -mt-24 relative z-10">
        <UniversityDirectoryClient initialUniversities={universities} />
      </div>
    </div>
  );
}
