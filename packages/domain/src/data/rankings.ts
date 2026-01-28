export interface RankingSubject {
  name: string;
  rank: number;
  score?: number;
}


export interface RankingHistoryItem {
  year: number;
  source: string;
  rank: number;
  score?: number;
}

export interface UniversityRanking {
  id: string;
  rank: number;
  name: string;
  nameEn?: string; // English name for logo matching
  country: string;
  region: string;
  logoUrl?: string; // URL to logo image
  description?: string;
  subjects?: RankingSubject[];
  badges?: string[]; // e.g. "Top 10", "Best Research"
  // Extended Profile Details
  education?: string; // New
  research?: string; // New
  websiteUrl?: string;
  locationDetails?: string;
  locationCoords?: { label: string; lat: number; lng: number }[];
  
  // Dynamic Overview Sections
  overview?: { label: string; content: string }[];

  // Dynamic Key Stats
  stats?: { label: string; content: string; type: 'statistic' | 'highlight' }[];
  // Programs
  courseShortCount?: number;
  courseBachelorCount?: number;
  courseMasterCount?: number;
  coursePhdCount?: number;

  scholarships?: { name: string; amount?: string; type?: string }[];
  
  ranks?: Record<string, number | string>; // Map of source code to rank (e.g. { qs: 1, the: 5 })
  rankingHistory?: RankingHistoryItem[];
}

export interface RankingData {
  lastUpdated: string;
  source: string;
  universities: UniversityRanking[];
}
