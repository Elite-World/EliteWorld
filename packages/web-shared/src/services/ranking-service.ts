import { getDb } from '../lib/db';
import { UniversityRanking } from '../data/rankings';
import 'server-only';

// Define the shape of the row returned from the DB query
interface RankingRow {
  rank_display: string;
  rank_sort: number;
  score: number;
  name_en: string;
  name_cn: string; // University Chinese name
  region_name: string; // Country name from regions table
  univ_id: number;
}

interface AggregatedRanking {
  univ_id: number;
  name_en: string;
  name_cn: string;
  region_name: string;
  logo_file?: string;
  website_url?: string;
  ranks: Record<string, number>;
  scores: Record<string, number>;
}

export async function getRankingList(
  year: number = 2025,
  defaultSource: string = 'qs'
): Promise<UniversityRanking[]> {
  const db = getDb();
  
  // 1. Get all General ranking lists for the target year
  // We want to fetch QS, THE, USNEWS, ARWU if available for this year.
  // We select source_code and lib_id.
  const listsQuery = db.prepare(`
    SELECT lib_id, source_code
    FROM ranking_lists 
    WHERE year = ? AND rank_type = 'General'
  `);
  
  const lists = listsQuery.all(year) as { lib_id: number; source_code: string }[];
  
  if (lists.length === 0) {
    console.warn(`No ranking lists found for year=${year}`);
    return [];
  }

  // 2. Aggregate data
  const universityMap = new Map<number, AggregatedRanking>();

  for (const list of lists) {
    const itemsQuery = db.prepare(`
      SELECT 
        ri.rank_sort,
        ri.score,
        ri.univ_id,
        u.name_en,
        u.name_cn,
        u.logo_file,
        u.website_url,
        r.name_cn as region_name
      FROM ranking_items ri
      JOIN universities u ON ri.univ_id = u.univ_id
      LEFT JOIN regions r ON u.region_id = r.id
      WHERE ri.list_id = ?
    `);

    const items = itemsQuery.all(list.lib_id) as any[];

    for (const item of items) {
      if (!universityMap.has(item.univ_id)) {
        universityMap.set(item.univ_id, {
          univ_id: item.univ_id,
          name_en: item.name_en,
          name_cn: item.name_cn,
          region_name: item.region_name,
          logo_file: item.logo_file,
          website_url: item.website_url,
          ranks: {},
          scores: {}
        });
      }
      
      const uni = universityMap.get(item.univ_id)!;
      uni.ranks[list.source_code] = item.rank_sort;
      if (item.score) {
        uni.scores[list.source_code] = item.score;
      }
    }
  }

  // 3. Convert to UniversityRanking array
  const rankings: UniversityRanking[] = Array.from(universityMap.values()).map(uni => {
    // Determine primary rank based on defaultSource, fallback to others or max integer
    const primaryRank = uni.ranks[defaultSource] || 999999;
    const primaryScore = uni.scores[defaultSource] || 0;

    return {
      id: uni.univ_id.toString(),
      rank: primaryRank,
      name: uni.name_cn || uni.name_en, // Prefer Chinese name
      nameEn: uni.name_en, // Assign English name for logo lookup
      country: uni.region_name || 'Unknown', // Using region_name (country) from DB
      region: 'Global',
      overallScore: primaryScore,
      ranks: uni.ranks, // Pass all ranks
      description: '',
      history: '',
      visitGuide: '',
      logoUrl: uni.logo_file ? `/logos/${uni.logo_file}` : undefined,
      websiteUrl: uni.website_url,
      badges: [],
    };
  });

  // 4. Sort by default source rank, then by name for deterministic order
  rankings.sort((a, b) => {
    if (a.rank !== b.rank) {
      return a.rank - b.rank;
    }
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });

  return rankings;
}
