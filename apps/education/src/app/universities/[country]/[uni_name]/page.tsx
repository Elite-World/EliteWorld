import React from 'react';
import { notFound } from 'next/navigation';
import { getUniversity } from '@repo/domain/services/ranking-service';
import { Metadata } from 'next';

import { UsUniTemplate } from '@/components/university/UsUniTemplate';
import { GlobalUniTemplate } from '@/components/university/GlobalUniTemplate';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ country: string; uni_name: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const university = await getUniversity(resolvedParams.uni_name);
  if (!university) return { title: 'University Not Found' };

  return {
    title: `${university.name} - Ranking & Profile | Elite World`,
    description: `Detailed profile for ${university.name}. Rankings, subjects, and admission info.`,
  };
}

export default async function UniversityPage({ params }: PageProps) {
  const resolvedParams = await params;
  const university = await getUniversity(resolvedParams.uni_name);

  if (!university) {
    notFound();
  }

  // If the university has detailed rich_data (e.g. scraped from US US universities), 
  // render the immersive US template. Otherwise, fall back to the global overview template.
  if (university.rich_data) {
    return <UsUniTemplate university={university} />;
  }

  return <GlobalUniTemplate university={university} />;
}
