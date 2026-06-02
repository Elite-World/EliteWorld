'use server';

import { getRankingList as getRankingListService, getGlobalRankingMeta } from '@repo/domain/services/ranking-service';
import { UniversityRanking } from '@repo/domain';

import { unstable_cache } from 'next/cache';

const getCachedRankingList = unstable_cache(
  async (year: number | undefined, source: string, rankType: 'General' | 'Subject', subject?: string) => {
    return await getRankingListService(year, source, rankType, subject);
  },
  ['rankings-list'],
  { revalidate: 3600 }
);

export async function fetchRankings(
  year?: number,
  source: string = 'qs',
  rankType: 'General' | 'Subject' = 'General',
  subject?: string
): Promise<UniversityRanking[]> {
  return await getCachedRankingList(year, source, rankType, subject);
}

const getCachedMeta = unstable_cache(
  async () => {
    return await getGlobalRankingMeta();
  },
  ['global-ranking-meta'],
  { revalidate: 3600 }
);

export async function fetchMeta() {
  return await getCachedMeta();
}
