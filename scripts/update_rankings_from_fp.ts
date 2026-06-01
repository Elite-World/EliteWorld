import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University, RankingSystem } from '../packages/domain/src/data/models';
import { Types } from 'mongoose';

const DATA_FILE = path.join(__dirname, '../forwardpathway_data.json');
const UNMATCHED_FILE = path.join(__dirname, '../unmatched_universities.csv');

interface FPRankingData {
  name_cn: string;
  name_en: string;
  rankings: {
    qs?: Record<string, number>;
    usnews?: Record<string, number>;
    the?: Record<string, number>;
    arwu?: Record<string, number>;
  };
}

// --- Fuzzy Match Logic ---
function levenshteinDistance(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

function getBestMatch(name: string, universities: { id: Types.ObjectId, name_en: string }[]): Types.ObjectId | null {
  if (!name) return null;
  const normalizedTarget = normalize(name);

  // Exact match
  const exactMatch = universities.find(u => normalize(u.name_en) === normalizedTarget);
  if (exactMatch) return exactMatch.id;

  // Fuzzy match
  let bestMatch = null;
  let minDistance = Infinity;
  const threshold = 5;

  for (const uni of universities) {
    const cleanName = normalize(uni.name_en);
    if (cleanName.includes(normalizedTarget) || normalizedTarget.includes(cleanName)) return uni.id;

    const dist = levenshteinDistance(normalizedTarget, cleanName);
    if (dist < minDistance && dist <= threshold) {
      minDistance = dist;
      bestMatch = uni.id;
    }
  }
  return bestMatch;
}

async function updateRankings() {
  console.log('🚀 Starting Ranking Update from Forward Pathway...');
  
  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Data file not found at: ${DATA_FILE}. Please run the scraper first.`);
    process.exit(1);
  }

  const scrapedData: FPRankingData[] = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`📋 Loaded ${scrapedData.length} universities from scraped data.`);

  await dbConnect();
  
  const allUnis = await University.find({}, '_id name.en').lean();
  const uniDict = allUnis.map(u => ({ id: u._id, name_en: u.name.en }));

  console.log(`🔍 Mapping universities...`);
  
  // Prepare Ranking System Buckets
  const systemBuckets: Record<string, Record<string, any[]>> = {
    qs: {},
    usnews: {},
    the: {},
    arwu: {}
  };

  const unmatched: FPRankingData[] = [];
  let matchCount = 0;

  for (const data of scrapedData) {
    const uniId = getBestMatch(data.name_en, uniDict);

    if (uniId) {
      matchCount++;
      // Process rankings
      for (const [sysSlug, years] of Object.entries(data.rankings)) {
        if (!systemBuckets[sysSlug]) systemBuckets[sysSlug] = {};
        
        for (const [year, rank] of Object.entries(years)) {
          if (!systemBuckets[sysSlug][year]) systemBuckets[sysSlug][year] = [];
          
          if (rank && !isNaN(Number(rank))) {
             systemBuckets[sysSlug][year].push({
               rank: Number(rank),
               uni_id: uniId
             });
          }
        }
      }
    } else {
      unmatched.push(data);
    }
  }

  console.log(`✅ Matched ${matchCount}/${scrapedData.length} universities.`);
  
  if (unmatched.length > 0) {
    const csvContent = 'name_cn,name_en\n' + unmatched.map(u => `"${u.name_cn}","${u.name_en}"`).join('\n');
    fs.writeFileSync(UNMATCHED_FILE, csvContent);
    console.log(`⚠️ Logged ${unmatched.length} unmatched universities to ${UNMATCHED_FILE}`);
  }

  console.log(`💾 Updating RankingSystem documents in MongoDB...`);
  
  const systemNames: Record<string, string> = {
    qs: 'QS World University Rankings',
    usnews: 'U.S. News Best Global Universities',
    the: 'Times Higher Education World University Rankings',
    arwu: 'Academic Ranking of World Universities'
  };

  for (const [sysSlug, generalBuckets] of Object.entries(systemBuckets)) {
    if (Object.keys(generalBuckets).length === 0) continue;
    
    // Convert object to Map for Mongoose
    const generalMap = new Map();
    for (const [year, entries] of Object.entries(generalBuckets)) {
      // Sort entries by rank for easier consumption
      entries.sort((a, b) => a.rank - b.rank);
      generalMap.set(year, entries);
    }

    await RankingSystem.findOneAndUpdate(
      { slug: sysSlug },
      { 
        $set: { 
          name: systemNames[sysSlug],
          general: generalMap
        } 
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Updated rankings for ${systemNames[sysSlug]}`);
  }

  console.log('🎉 Update Complete!');
  process.exit(0);
}

updateRankings().catch(err => {
  console.error('❌ Update Failed:', err);
  process.exit(1);
});
