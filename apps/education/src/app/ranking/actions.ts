'use server';

import { getRankingList as getRankingListService } from '@repo/web-shared/services/ranking-service';
import { UniversityRanking } from '@repo/web-shared';

export async function fetchRankings(
  year: number,
  source: string = 'qs',
  rankType: 'General' | 'Subject' = 'General',
  subject?: string
): Promise<UniversityRanking[]> {
  return await getRankingListService(year, source, rankType, subject);
}
