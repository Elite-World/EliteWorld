import { getDb } from '../lib/db';
import { UniversityRanking } from '../data/rankings';
import 'server-only';

interface AggregatedRanking {
  univ_id: number;
  name_en: string;
  name_cn: string;
  region_name: string;
  logo_file?: string;
  website_url?: string;
  ranks: Record<string, number | string>;
  scores: Record<string, number>;
}

export async function getGlobalRankingMeta(): Promise<{
  generalSources: { value: string; label: string }[];
  subjectSources: { value: string; label: string }[];
  years: {
    general: Record<string, number[]>;
    subject: Record<string, number[]>;
  };
  subjects: Record<string, Record<string, string[]>>; // source -> category -> subjects
}> {
  const db = getDb();
  
  // Fetch all ranking lists metadata
  const rows = db
    .prepare(
      `SELECT DISTINCT source_code, year, rank_type, field_rank, field_broad, field_specific 
       FROM ranking_lists 
       ORDER BY year DESC`
    )
    .all() as { 
      source_code: string; 
      year: number; 
      rank_type: string; 
      field_rank: string;
      field_broad: string | null;
      field_specific: string | null;
    }[];

  const generalSourcesMap = new Map<string, string>();
  const subjectSourcesMap = new Map<string, string>();
  
  const years = {
    general: {} as Record<string, number[]>,
    subject: {} as Record<string, number[]>
  };
  
  const subjects: Record<string, Record<string, Set<string>>> = {}; 

  for (const row of rows) {
    const isSubject = row.rank_type === 'Subject';
    const sourceMap = isSubject ? subjectSourcesMap : generalSourcesMap;
    const yearRecord = isSubject ? years.subject : years.general;
    
    // Store Source Label
    if (!sourceMap.has(row.source_code)) {
      sourceMap.set(row.source_code, row.field_rank);
    }
    
    // Store Year
    if (!yearRecord[row.source_code]) {
      yearRecord[row.source_code] = [];
    }
    if (!yearRecord[row.source_code].includes(row.year)) {
      yearRecord[row.source_code].push(row.year);
    }

    // Store Subject (if applicable)
    if (isSubject && row.field_broad && row.field_specific) {
      if (!subjects[row.source_code]) {
        subjects[row.source_code] = {};
      }
      if (!subjects[row.source_code][row.field_broad]) {
        subjects[row.source_code][row.field_broad] = new Set();
      }
      subjects[row.source_code][row.field_broad].add(row.field_specific);
    }
  }

  // Convert Sets to Arrays for JSON serialization
  const finalSubjects: Record<string, Record<string, string[]>> = {};
  for (const [source, categories] of Object.entries(subjects)) {
    finalSubjects[source] = {};
    for (const [cat, subSet] of Object.entries(categories)) {
      finalSubjects[source][cat] = Array.from(subSet).sort();
    }
  }

  return {
    generalSources: Array.from(generalSourcesMap.entries()).map(([v, l]) => ({ value: v, label: l })),
    subjectSources: Array.from(subjectSourcesMap.entries()).map(([v, l]) => ({ value: v, label: l })),
    years,
    subjects: finalSubjects
  };
}

export async function getRankingList(
  year?: number,
  source: string = 'qs',
  rankType: 'General' | 'Subject' = 'General',
  subject?: string
): Promise<UniversityRanking[]> {
  const db = getDb();
  let targetYear = year;

  // 1. Determine Target Year
  if (!targetYear) {
    let queryStr = `SELECT MAX(year) as max_year FROM ranking_lists WHERE source_code = ? AND rank_type = ?`;
    const params: any[] = [source, rankType];
    
    if (rankType === 'Subject' && subject) {
      queryStr += ` AND field_specific = ?`;
      params.push(subject);
    } 

    const latestYearQuery = db.prepare(queryStr);
    const result = latestYearQuery.get(...params) as { max_year: number };
    targetYear = result.max_year || 2025;
  }

  // 2. Fetch Lists to Query
  let listsQuerySql = `SELECT lib_id, source_code FROM ranking_lists WHERE year = ? AND rank_type = ?`;
  const listsQueryParams: any[] = [targetYear, rankType];

  if (rankType === 'General') {
    // For General, we get all lists to aggregate
  } else {
    // For Subject, we must filter by Source and Subject Name
    if (!subject) return []; // Subject is required
    listsQuerySql += ` AND source_code = ? AND field_specific = ?`;
    listsQueryParams.push(source, subject);
  }

  const lists = db.prepare(listsQuerySql).all(...listsQueryParams) as {
    lib_id: number;
    source_code: string;
  }[];

  if (lists.length === 0) return [];

  // 3. Aggregate Data
  const universityMap = new Map<number, AggregatedRanking>();

  for (const list of lists) {
    const itemsQuery = db.prepare(`
      SELECT 
        ri.rank_display,
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
          scores: {},
        });
      }
      const uni = universityMap.get(item.univ_id)!;
      uni.ranks[list.source_code] = item.rank_display; 
      if (item.score) uni.scores[list.source_code] = item.score;
    }
  }

  // 4. Convert to array and sort
  const result = Array.from(universityMap.values()).map((uni) => {
    const primaryRank = uni.ranks[source] || Object.values(uni.ranks)[0];
    return {
      id: uni.univ_id.toString(),
      rank: typeof primaryRank === 'string' ? parseInt(primaryRank) || 999 : primaryRank || 999,
      name: uni.name_cn || uni.name_en,
      nameEn: uni.name_en,
      country: uni.region_name || 'Unknown',
      region: uni.region_name || 'Unknown', // Fallback as DB regions are countries
      overallScore: uni.scores[source] || 0,
      logoUrl: uni.logo_file ? `/logos/${uni.logo_file}` : undefined,
      badges: [],
      ranks: uni.ranks,
    };
  });

  return result;
}
