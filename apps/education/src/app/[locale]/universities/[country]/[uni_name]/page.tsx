import React from 'react';
import { notFound } from 'next/navigation';
import { getUniversity } from '@repo/domain/services/ranking-service';
import { Metadata } from 'next';

import { UsUniTemplate } from '@/components/university/UsUniTemplate';
import { GlobalUniTemplate } from '@/components/university/GlobalUniTemplate';

export const revalidate = 3600; // Cache this page for 1 hour (ISR)

export async function generateStaticParams() {
  const { getAllUniversitiesDirectory } = await import('@repo/domain/services/ranking-service');
  const universities = await getAllUniversitiesDirectory();
  const params: any[] = [];
  universities.forEach((uni) => {
    if (uni.location && uni.location.country_slug) {
      params.push({ locale: 'en', country: uni.location.country_slug, uni_name: uni.slug });
      params.push({ locale: 'zh', country: uni.location.country_slug, uni_name: uni.slug });
    }
  });
  return params;
}

type PageProps = {
  params: Promise<{ locale: string; country: string; uni_name: string }>;
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

  // If the university has detailed US rich_data (e.g. historical_scores), 
  // render the immersive US template. Otherwise, fall back to the global overview template.
  // We check for historical_scores because the global scraper now adds qs_id to rich_data
  if (university.rich_data && university.rich_data.historical_scores) {
    return <UsUniTemplate university={university} />;
  }

  return <GlobalUniTemplate university={university} />;
}
