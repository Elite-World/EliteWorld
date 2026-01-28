'use server';

import { getRankingList as getRankingListService } from '@repo/domain/services/ranking-service';
import { UniversityRanking } from '@repo/domain';

export async function fetchRankings(
  year: number,
  source: string = 'qs',
  rankType: 'General' | 'Subject' = 'General',
  subject?: string
): Promise<UniversityRanking[]> {
  return await getRankingListService(year, source, rankType, subject);
}
