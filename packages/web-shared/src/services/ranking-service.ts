import { getDb } from '../lib/db';
import { UniversityRanking } from '../data/rankings';
import 'server-only';

interface AggregatedRanking {
  univ_id: number;
  name_en: string;
  name_cn: string;
  region_name: string;
  region_name_en?: string;
  region_name_cn?: string;
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
        r.name_en as region_name_en,
        r.name_cn as region_name_cn
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
          region_name: item.region_name_cn || item.region_name_en || '',
          region_name_en: item.region_name_en,
          region_name_cn: item.region_name_cn,
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
    const countryName = uni.region_name_en || uni.region_name_cn || 'Unknown';
    return {
      id: uni.univ_id.toString(),
      rank: typeof primaryRank === 'string' ? parseInt(primaryRank) || 999 : primaryRank || 999,
      name: uni.name_en || uni.name_cn,
      nameEn: uni.name_en,
      country: countryName,
      region: countryName, // Fallback as DB regions are countries
      overallScore: uni.scores[source] || 0,
      logoUrl: uni.logo_file ? `/logos/${uni.logo_file}` : undefined,
      badges: [],
      ranks: uni.ranks,
    };
  });

  return result;
}
export async function getUniversity(slug: string): Promise<UniversityRanking | null> {
  const db = getDb();

  // 1. Find university ID by matching slug
  // This is a temporary inefficient solution until we have indexed slugs in DB
  const unis = db.prepare('SELECT univ_id, name_en FROM universities').all() as {
    univ_id: number;
    name_en: string;
  }[];

  const matchedUni = unis.find((u) => {
    const s = (u.name_en || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    return s === slug;
  });

  if (!matchedUni) return null;

  // 2. Fetch Aggregated Data for this University
  // We reuse logic similar to getRankingList but strictly for one ID
  // and aggregating all available data (all years/sources)

  const rankings = db
    .prepare(
      `SELECT
        r.score as ranking_score,
        r.rank_display,
        l.source_code,
        l.year
      FROM ranking_items r
      JOIN ranking_lists l ON r.list_id = l.lib_id
      WHERE r.univ_id = ?
      ORDER BY l.year DESC`
    )
    .all(matchedUni.univ_id) as {
    ranking_score: number; 
    rank_display: string;
    source_code: string;
    year: number;
  }[];

  const uniDetails = db
    .prepare(
      `SELECT
        u.*,
        r.name_cn as region_name,
        r.name_en as region_name_en
      FROM universities u
      LEFT JOIN regions r ON u.region_id = r.id
      WHERE u.univ_id = ?`
    )
    .get(matchedUni.univ_id) as any;

  // 3. Fetch Scholarships
  const scholarships = db.prepare('SELECT name, amount, type FROM university_scholarships WHERE univ_id = ?').all(matchedUni.univ_id) as any[];

  if (!uniDetails) return null;

  // Process Ranks: showing the LATEST rank for each source
  const ranks: Record<string, number | string> = {};
  const seenSources = new Set<string>();

  for (const r of rankings) {
    if (!seenSources.has(r.source_code)) {
      ranks[r.source_code] = r.rank_display || 0; // or parse int
      seenSources.add(r.source_code);
    }
  }

  // Construct Result
  return {
    id: uniDetails.univ_id,
    name: uniDetails.name_en || uniDetails.name_cn, 
    nameEn: uniDetails.name_en, 
    country: uniDetails.region_name_en || uniDetails.region_name,
    region: 'Global', // TODO: Populate if available in DB
    logoUrl: uniDetails.logo_file
      ? `/logos/${uniDetails.logo_file}`
      : undefined,
    websiteUrl: uniDetails.website_url,
    description: uniDetails.description,
    history: uniDetails.history,
    education: uniDetails.education,
    research: uniDetails.research,
    accreditation: uniDetails.accreditation,
    visitGuide: uniDetails.visit_guide,
    
    // Stats
    foundedYear: uniDetails.founded_year,
    campusType: uniDetails.campus_type,
    studentCount: uniDetails.student_count,
    undergradCount: uniDetails.undergrad_count,
    postgradCount: uniDetails.postgrad_count,
    staffCount: uniDetails.staff_count,
    femaleMaleRatio: uniDetails.female_male_ratio,
    intlStudentPercent: uniDetails.intl_student_percent,
    
    // Programs
    courseShortCount: uniDetails.course_short_count,
    courseBachelorCount: uniDetails.course_bachelor_count,
    courseMasterCount: uniDetails.course_master_count,
    coursePhdCount: uniDetails.course_phd_count,

    scholarships: scholarships,

    rank: (ranks['qs'] as number) || (ranks['the'] as number) || 0, // Fallback/Primary rank
    ranks: ranks,
    rankingHistory: rankings.map(r => {
      const rankNum = parseInt(r.rank_display.replace(/[^0-9].*$/, '')) || 999; 
      return {
        year: r.year,
        source: r.source_code,
        rank: rankNum,
        score: r.ranking_score
      };
    }),
    badges: [], // TODO: Populate badges if needed
    overallScore: 0, // To be populated

  };
}
