import { rankingsData, UniversityRanking } from '@repo/web-shared';

const US_NEWS_ENDPOINT = 'https://www.usnews.com/education/best-global-universities/search?format=json&page=1';

interface USNewsItem {
  id: number;
  name: string;
  city: string;
  country_name: string;
  ranks: { value: string; label: string }[];
  stats: { value: string; label: string }[];
}

interface USNewsResponse {
  items: USNewsItem[];
  total_count: number;
}

export async function fetchRankings(): Promise<UniversityRanking[]> {
  try {
    // Attempt to fetch from US News
    const res = await fetch(US_NEWS_ENDPOINT, {
      next: { revalidate: 86400 }, // Cache for 24 hours
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(
        `US News API request failed: ${res.status} ${res.statusText}. Using fallback data.`
      );
      return rankingsData.universities;
    }

    const data: USNewsResponse = await res.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.warn('US News API returned unexpected format. Using fallback data.');
      return rankingsData.universities;
    }

    const mappedRankings: UniversityRanking[] = data.items.map((item) => {
      // Parse rank safely
      const rankVal = item.ranks.find((r) => r.label === 'Best Global Universities')?.value;
      const rank = rankVal ? parseInt(rankVal, 10) : 999;

      // Parse score safely
      const scoreVal = item.stats.find((s) => s.label === 'Global Score')?.value;
      const overallScore = scoreVal ? parseFloat(scoreVal) : 0;

      return {
        id: item.id.toString(),
        name: item.name,
        country: item.country_name,
        rank: isNaN(rank) ? 999 : rank,
        overallScore: isNaN(overallScore) ? 0 : overallScore,
        description: `${item.name} is a top-ranked university located in ${item.city}, ${item.country_name}.`,
        // Mapping US News doesn't give us subjects/badges freely in list view, so we leave them empty or infer
        badges: rank <= 10 ? ['Top 10 Global'] : [],
        subjects: [],
        logoUrl: undefined, 
      };
    });

    return mappedRankings;

  } catch (error) {
    console.error('Error fetching rankings from US News:', error);
    // Silent fallback
    return rankingsData.universities;
  }
}
