import { University, RankingSystem, Scholarship, } from '../data/models';
import dbConnect from '../lib/mongoose';
import { UniversityRanking, RankingHistoryItem } from '../data/rankings';
import 'server-only';

// Helper to get localized string (default to en)
function getLoc(field: any, lang: 'en' | 'cn' = 'en'): string {
  if (!field) return '';
  if (typeof field === 'string') return field;
  return field[lang] || field['en'] || '';
}

export async function getGlobalRankingMeta(): Promise<{
  generalSources: { value: string; label: string }[];
  subjectSources: { value: string; label: string }[];
  years: {
    general: Record<string, number[]>;
    subject: Record<string, number[]>;
  };
  subjects: Record<string, Record<string, { label: string; value: string }[]>>; 
}> {
  await dbConnect();
  
  const systems = await RankingSystem.find({}).lean();
  
  const generalSourcesMap = new Map<string, string>();
  const subjectSourcesMap = new Map<string, string>();
  const generalYears: Record<string, number[]> = {};
  const subjectYears: Record<string, number[]> = {};
  const subjects: Record<string, Record<string, { label: string; value: string }[]>> = {};

  for (const sys of systems) {
      if (sys.general && Object.keys(sys.general).length > 0) {
          generalSourcesMap.set(sys.slug, sys.name);
          const ys = Object.keys(sys.general).map(Number).sort((a,b) => b-a);
          generalYears[sys.slug] = ys;
      }

      if (sys.subjects && Object.keys(sys.subjects).length > 0) {
          // If this system has subjects, it's a valid subject source
          subjectSourcesMap.set(sys.slug, sys.name);
          
          // Collect all years across all subjects to show available years
          const allYears = new Set<number>();
          const sysSubjects: Record<string, { label: string; value: string }[]> = {}; // category -> subjects

          // Group subjects (flat structure in DB, we'll put them all in "All" or similar for now)
          // Since our schema stores flattened subjects, we need to reconstruct categories if needed.
          // For now, we'll put them under 'General' or classify dynamically.
          // To keep it simple for M3: We'll put all under 'All Subjects' category.
          const subjectKeys = Object.keys(sys.subjects).sort();
          
          /* 
             NOTE: 'sys.subjects' and 'sys.subject_labels' from .lean() are usually plain objects 
             if simple lean/toJSON was used, but if strict schema types are Map, helper might be needed.
             However since we used lean(), they are POJOs.
             The type definition in models.ts says Map, but .lean() returns Record<string, ...>.
          */
          
          const translatedList = subjectKeys.map(slug => {
              // @ts-ignore
              const labelObj: any = sys.subject_labels ? sys.subject_labels[slug] : null;
              return {
                  value: slug,
                  label: labelObj ? (labelObj.en || slug) : slug
              };
          });
          
          sysSubjects['Different Subjects'] = translatedList;
          subjects[sys.slug] = sysSubjects;

          for (const subj of subjectKeys) {
             // @ts-ignore
             const yKeys = Object.keys(sys.subjects[subj] || {});
             yKeys.forEach(y => allYears.add(Number(y)));
          }

          subjectYears[sys.slug] = Array.from(allYears).sort((a,b) => b-a);
      }
  }

  return {
    generalSources: Array.from(generalSourcesMap.entries()).map(([v, l]) => ({ value: v, label: l })),
    subjectSources: Array.from(subjectSourcesMap.entries()).map(([v, l]) => ({ value: v, label: l })), 
    years: {
      general: generalYears,
      subject: subjectYears
    },
    subjects
  };
}

export async function getRankingList(
  year?: number,
  source: string = 'qs',
  rankType: 'General' | 'Subject' = 'General',
  subject?: string
): Promise<UniversityRanking[]> {
  await dbConnect();

  // 1. Fetch Ranking Bucket
  const system = await RankingSystem.findOne({ slug: source }).lean();
  if (!system) return [];

  // 2. Select Bucket (General Bucket)
  let entries: { rank: number; uni_id: any }[] = [];
  let availableYears: number[] = [];
  let targetYear = year;

  // We need to fetch 'peer' rankings to show "Other Rankings" on the card
  // e.g. if viewing "QS 2025", we also want "THE 2025", "USNEWS 2025" etc for the same unis.
  const peerSystems = await RankingSystem.find({ 
      slug: { $in: ['qs', 'the', 'usnews', 'arwu'] }, // Major ones only for performance
      _id: { $ne: system._id } 
  }).lean();

  if (rankType === 'General') {
      if (!system.general) return [];
      availableYears = Object.keys(system.general).map(Number).sort((a,b) => b-a);
      
      if (!targetYear) targetYear = availableYears[0] || 2025;
      
      entries = system.general[String(targetYear)] || [];
  
  } else {
      // Subject Ranking
      if (!subject || !system.subjects) return [];
      
      // With .lean(), system.subjects is a POJO Record<string, ...> despite Map schema
      // New DB uses English slugs directly (e.g. 'business')
      // @ts-ignore
      const subjectBucket = system.subjects[subject];
      
      if (!subjectBucket) return [];

      availableYears = Object.keys(subjectBucket).map(Number).sort((a,b) => b-a);
      
      if (!targetYear) targetYear = availableYears[0] || 2025;

      entries = subjectBucket[String(targetYear)] || [];
  }

  if (entries.length === 0) return [];

  // 3. Extract Uni IDs and Fetch Profile Data
  const uniIds = entries.map((e: any) => e.uni_id);
  const universities = await University.find({ _id: { $in: uniIds } })
      .populate({ path: 'location.country_id', strictPopulate: false })
      .lean();

  const uniMap = new Map<string, any>();
  universities.forEach((u: any) => uniMap.set(u._id.toString(), u));

  // 4. Build Cross-Ranking Map
  // Map<uniId, Record<source, rank>>
  const crossRanks = new Map<string, Record<string, number>>();
  
  // Pre-fill with current list
  entries.forEach((e: any) => {
      const uid = e.uni_id.toString();
      if (!crossRanks.has(uid)) crossRanks.set(uid, {});
      crossRanks.get(uid)![source] = e.rank;
  });

  // Fill from peers (General rankings only for cross-comparison)
  if (rankType === 'General') { // Only valid to cross-compare general ranks usually
      for (const peer of peerSystems) {
          const peerEntries = peer.general?.[String(targetYear)];
          if (peerEntries) {
              peerEntries.forEach((pe: any) => {
                  const uid = pe.uni_id.toString();
                  // Only add if this university is in our main list (optimization)
                  if (crossRanks.has(uid)) {
                      crossRanks.get(uid)![peer.slug] = pe.rank;
                  }
              });
          }
      }
  }

  // 5. Map to Response
  return entries.map((entry: any) => {
      const u = uniMap.get(entry.uni_id.toString());
      if (!u) return null;

      const countryName = u.location?.country_id?.name?.en || 'Unknown';
      const uid = entry.uni_id.toString();

      return {
          id: u.slug, 
          rank: entry.rank,
          name: getLoc(u.name),
          nameEn: u.name?.en,
          country: countryName,
          region: countryName,
          logoUrl: u.assets?.logo ? `/logos/${u.assets.logo}` : undefined,
          websiteUrl: u.assets?.website,
          description: u.description,
          details: u.details || {},
          stats: u.details?.stat || [],
          ranks: crossRanks.get(uid) || { [source]: entry.rank }
      };
  }).filter(Boolean) as UniversityRanking[];
}

export async function getUniversity(slug: string): Promise<UniversityRanking | null> {
  await dbConnect();
  
  // 1. Fetch University
  const u = await University.findOne({ slug })
    .populate({ path: 'location.country_id', strictPopulate: false })
    .lean() as any;
    
  if (!u) return null;

  // 2. Parallel Fetch: Scholarships + ALL Ranking Buckets
  // Fetching all buckets is cheap because there are few systems (<10 typically)
  const [scholarships, countryScholarships, allSystems] = await Promise.all([
     Scholarship.find({ entity_id: u._id, scope: 'university' }).lean() as Promise<any[]>,
     u.location?.country_id?._id 
        ? Scholarship.find({ entity_id: u.location.country_id._id, scope: 'country' }).lean() as Promise<any[]>
        : Promise.resolve([]),
     RankingSystem.find({}).lean()
  ]);

  const allScholarships = [...scholarships, ...(countryScholarships as any[])];

  // 3. Scan Buckets for Rankings
  const ranks: Record<string, number | string> = {};
  const history: RankingHistoryItem[] = [];
  const bestRanks: Record<string, any> = {};

  const uniIdStr = u._id.toString();

  for (const sys of allSystems) {
      // Check General Rankings
      if (sys.general) {
          for (const [yearStr, entries] of Object.entries(sys.general)) {
              // @ts-ignore
              const entry = entries.find((e: any) => e.uni_id.toString() === uniIdStr);
              if (entry) {
                  const yearNum = parseInt(yearStr);
                  history.push({
                      source: sys.slug,
                      year: yearNum,
                      rank: entry.rank,
                      score: 0
                  });
                  // Latest General Rank Logic
                  if (!bestRanks[sys.slug] || bestRanks[sys.slug].year < yearNum) {
                      bestRanks[sys.slug] = { ...entry, year: yearNum };
                      ranks[sys.slug] = entry.rank;
                  }
              }
          }
      }
      
      // Note: We currently don't add specific SUBJECT rankings to the main 'ranks' map 
      // or 'history' list displayed on the main profile, as that would be overwhelming.
      // We only show General rankings there. Subject rankings are viewed via the Ranking List filter.
  }

  // Sort history
  history.sort((a, b) => b.year - a.year);

  // Map Details
  const overview = (u.details?.overall || []).map((d: any) => ({
      label: getLoc(d.label),
      content: getLoc(d.content)
  }));
  
  const stats = (u.details?.stat || []).map((s: any) => ({
      label: getLoc(s.label),
      content: getLoc(s.content),
      type: s.type || 'statistic'
  }));

//   const detailsOverall = overview.map((d: any) => d.content).join('\n\n');
  
  const countryName = u.location?.country_id?.name?.en || 'Unknown';

  return {
    id: u.slug, // Use slug
    name: getLoc(u.name),
    nameEn: u.name?.en,
    country: countryName,
    region: 'Global',
    locationCoords: (u.location?.coordinates && u.location.coordinates.length > 0) 
      ? u.location.coordinates 
      : (u.rich_data?.lat && u.rich_data?.long 
          ? [{ label: getLoc(u.name), lat: parseFloat(u.rich_data.lat), lng: parseFloat(u.rich_data.long) }] 
          : []),
    logoUrl: u.assets?.logo ? `/logos/${u.assets.logo}` : undefined,
    websiteUrl: u.assets?.website,
    
    description: u.description, // Direct field now
    // Fallback mapping for old interface fields if needed, or use specific new fields
    // For now mapping back to the interface expected by frontend
    overview, // New dynamic field 
    stats, // New dynamic field 
    
    // Legacy stats mapping removed
     
    scholarships: allScholarships.map((s: any) => ({
        name: getLoc(s.name),
        amount: getLoc(s.amount),
        type: s.type
    })),

    rank: (ranks['qs'] as number) || (ranks['the'] as number) || 0,
    ranks: ranks,
    rankingHistory: history,
    rich_data: u.rich_data,
    badges: [],
  };
}
