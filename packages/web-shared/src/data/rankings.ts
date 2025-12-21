export interface RankingSubject {
  name: string;
  rank: number;
  score?: number;
}

export interface UniversityRanking {
  id: string;
  rank: number;
  name: string;
  country: string;
  logoUrl?: string; // URL to logo image
  overallScore: number;
  description?: string;
  subjects?: RankingSubject[];
  badges?: string[]; // e.g. "Top 10", "Best Research"
  // Extended details for Modal
  history?: string;
  visitGuide?: string;
  websiteUrl?: string;
  locationDetails?: string;
}

export interface RankingData {
  lastUpdated: string;
  source: string;
  universities: UniversityRanking[];
}

export const rankingsData: RankingData = {
  "lastUpdated": "2024-06-01",
  "source": "Mock Global Rankings",
  "universities": [
    {
      "id": "mit",
      "rank": 1,
      "name": "Massachusetts Institute of Technology (MIT)",
      "country": "USA",
      "overallScore": 100,
      "description": "A world-class research university known for its strength in physical sciences and engineering.",
      "subjects": [
        { "name": "Computer Science", "rank": 1 },
        { "name": "Engineering", "rank": 1 },
        { "name": "Mathematics", "rank": 2 }
      ],
      "badges": ["Top 1", "Research Leader"]
    },
    {
      "id": "cambridge",
      "rank": 2,
      "name": "University of Cambridge",
      "country": "UK",
      "overallScore": 99.2,
      "subjects": [
        { "name": "Mathematics", "rank": 1 },
        { "name": "Medicine", "rank": 3 },
        { "name": "Humanities", "rank": 2 }
      ]
    },
    {
      "id": "oxford",
      "rank": 3,
      "name": "University of Oxford",
      "country": "UK",
      "overallScore": 98.9,
      "subjects": [
        { "name": "Arts and Humanities", "rank": 1 },
        { "name": "Medicine", "rank": 2 },
        { "name": "Law", "rank": 2 }
      ]
    },
    {
      "id": "harvard",
      "rank": 4,
      "name": "Harvard University",
      "country": "USA",
      "overallScore": 98.3,
      "subjects": [
        { "name": "Law", "rank": 1 },
        { "name": "Business", "rank": 1 },
        { "name": "Life Sciences", "rank": 1 }
      ]
    },
    {
      "id": "stanford",
      "rank": 5,
      "name": "Stanford University",
      "country": "USA",
      "overallScore": 98.1,
      "subjects": [
        { "name": "Computer Science", "rank": 2 },
        { "name": "Business", "rank": 2 },
        { "name": "Engineering", "rank": 2 }
      ]
    },
    {
      "id": "imperial",
      "rank": 6,
      "name": "Imperial College London",
      "country": "UK",
      "overallScore": 97.8
    },
    {
      "id": "eth",
      "rank": 7,
      "name": "ETH Zurich",
      "country": "Switzerland",
      "overallScore": 95.5
    },
    {
      "id": "nus",
      "rank": 8,
      "name": "National University of Singapore (NUS)",
      "country": "Singapore",
      "overallScore": 92.7
    },
    {
      "id": "ucl",
      "rank": 9,
      "name": "UCL",
      "country": "UK",
      "overallScore": 92.4
    },
    {
      "id": "caltech",
      "rank": 10,
      "name": "California Institute of Technology (Caltech)",
      "country": "USA",
      "overallScore": 92.0
    },
     {
      "id": "chicago",
      "rank": 11,
      "name": "University of Chicago",
      "country": "USA",
      "overallScore": 91.5
    },
    {
      "id": "penn",
      "rank": 12,
      "name": "University of Pennsylvania",
      "country": "USA",
      "overallScore": 91.0
    },
    {
      "id": "cornell",
      "rank": 13,
      "name": "Cornell University",
      "country": "USA",
      "overallScore": 89.9
    },
    {
      "id": "unimelb",
      "rank": 14,
      "name": "The University of Melbourne",
      "country": "Australia",
      "overallScore": 88.5
    },
    {
      "id": "peking",
      "rank": 17,
      "name": "Peking University",
      "country": "China",
      "overallScore": 87.0
    },
    {
      "id": "tsinghua",
      "rank": 25,
      "name": "Tsinghua University",
      "country": "China",
      "overallScore": 85.1
    },
    {
      "id": "hku",
      "rank": 26,
      "name": "The University of Hong Kong (HKU)",
      "country": "Hong Kong",
      "overallScore": 84.0
    },
    {
      "id": "u_tokyo",
      "rank": 28,
      "name": "The University of Tokyo",
      "country": "Japan",
      "overallScore": 83.5
    }
  ]
};
