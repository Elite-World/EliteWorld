import 'dotenv/config';
import fs from 'fs';
import readline from 'readline';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

const API_KEY = process.env.GEMINI_API_KEY;
const OUTPUT_FILE = 'generated_profiles.jsonl';
const CONCURRENT_REQUESTS = 5;

if (!API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env.local');
  process.exit(1);
}

// Ensure the file exists
if (!fs.existsSync(OUTPUT_FILE)) {
  fs.writeFileSync(OUTPUT_FILE, '');
}

async function getProcessedSlugs(): Promise<Set<string>> {
  const processed = new Set<string>();
  const fileStream = fs.createReadStream(OUTPUT_FILE);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (line.trim()) {
      try {
        const data = JSON.parse(line);
        if (data.slug) processed.add(data.slug);
      } catch (e) {
        // Skip malformed lines
      }
    }
  }
  return processed;
}

async function generateProfile(slug: string, name: string, country: string) {
  const prompt = `You are an expert education consultant writing a highly specific, factual profile for ${name} located in ${country}. 
CRITICAL RULES:
- DO NOT use generic marketing fluff (avoid words like "beacon of innovation", "world-class", "paragon of excellence").
- Include concrete facts: Mention specific famous alumni, historical milestones, specific renowned research centers, distinct campus traditions, or exact academic subjects it is historically famous for.

Return exactly a JSON object with two fields:
- "description": A concise 2-sentence summary packed with hard facts.
- "overview": A comprehensive 3 to 4 paragraph detailed overview based strictly on real-world facts, specific academic strengths, and unique campus features.`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const json = await response.json();
    const resultText = json.candidates[0].content.parts[0].text;
    const parsedData = JSON.parse(resultText);

    return {
      slug,
      description: parsedData.description,
      overview: parsedData.overview,
    };
  } catch (err) {
    console.error(`\n[!] Error generating profile for ${name}:`, err);
    return null;
  }
}

async function run() {
  await dbConnect();
  console.log('Connected to MongoDB.');

  const processedSlugs = await getProcessedSlugs();
  console.log(`Found ${processedSlugs.size} already processed profiles.`);

  // Get all universities that don't have descriptions, or just get all and filter locally
  const unis = await University.find({}, 'slug name location')
    .populate({ path: 'location.country_id', select: 'name' })
    .lean() as any[];

  const toProcess = unis.filter((u) => !processedSlugs.has(u.slug));
  console.log(`Universities left to process: ${toProcess.length}`);

  if (toProcess.length === 0) {
    console.log('All universities processed!');
    process.exit(0);
  }

  // Remove the artificial test limit, process everything!
  const batchLimit = toProcess.length;
  console.log(`\n--- Running FULL BATCH of ${batchLimit} universities ---`);

  const queue = toProcess.slice(0, batchLimit);
  let completed = 0;

  // Simple concurrency queue
  while (queue.length > 0) {
    const chunk = queue.splice(0, CONCURRENT_REQUESTS);
    
    const promises = chunk.map(async (u) => {
      const countryName = u.location?.country_id?.name?.en || u.location?.country || 'Unknown';
      const uniName = u.name?.en || 'Unknown University';
      
      const result = await generateProfile(u.slug, uniName, countryName);
      if (result) {
        fs.appendFileSync(OUTPUT_FILE, JSON.stringify(result) + '\n');
        completed++;
        process.stdout.write(`\rProgress: ${completed} / ${batchLimit}`);
      }
    });

    await Promise.all(promises);
    
    // Sleep briefly to avoid aggressive rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n\nTest batch finished! Processed ${completed} universities.`);
  console.log(`Please review ${OUTPUT_FILE} to verify the quality.`);
  console.log(`If you are satisfied, edit scripts/generate_descriptions.ts to remove the 10-item limit and run it again to process the rest!`);
  
  process.exit(0);
}

run();
