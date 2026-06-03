import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Papa from 'papaparse';
import { University, Country, Scholarship } from '../packages/domain/src/data/models';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function seedScholarships() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env.local');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('🔗 Connected to MongoDB');

  // Load all countries and universities for matching
  const countries = await Country.find({});
  const universities = await University.find({});

  console.log(`Loaded ${countries.length} countries and ${universities.length} universities from DB.`);

  const csvPath = path.resolve(process.cwd(), 'international_scholarships_cleaned.csv');
  const csvData = fs.readFileSync(csvPath, 'utf8');

  // Parse CSV
  const parsed = Papa.parse(csvData, {
    header: true,
    skipEmptyLines: true,
  });

  const records = parsed.data;
  console.log(`Parsed ${records.length} scholarship records from CSV.`);

  // Clean out old scholarships to avoid duplication on re-runs
  await Scholarship.deleteMany({});
  console.log('🧹 Cleared existing scholarships from database.');

  let savedCount = 0;
  const majorCountriesToGlobalize = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Singapore'];

  const batchSize = 1000;
  let currentBatch: any[] = [];

  const flushBatch = async () => {
    if (currentBatch.length > 0) {
      await Scholarship.insertMany(currentBatch);
      savedCount += currentBatch.length;
      currentBatch = [];
    }
  };

  for (const record of records as any[]) {
    const name = record['Scholarship Name']?.trim();
    const amountRaw = record['Amount'];
    const location = record['Location']?.trim();
    const desc = record['Description']?.trim(); 
    const deadline = record['Deadline']?.trim();

    if (!name || !location) continue;
    
    let amountStr = 'Varies';
    if (amountRaw && amountRaw !== '0.0' && amountRaw !== '0') {
      const num = parseFloat(amountRaw);
      if (!isNaN(num) && num > 0) {
        amountStr = `$${num.toLocaleString()}`;
      }
    }

    const docTemplate = {
      name: { en: name },
      amount: { en: amountStr },
      type: deadline && deadline !== 'Unknown deadline' ? `Deadline: ${deadline}` : 'Merit & Need Based'
    };

    if (location === 'No Geographic Restrictions') {
      // Skip these as they are too generic and pollute specific country/university pages
      continue;
    } else {
      const countryMatch = countries.find(c => c.name?.en && c.name.en.toLowerCase() === location.toLowerCase());
      if (countryMatch) {
        currentBatch.push({
          ...docTemplate,
          scope: 'country',
          entity_id: countryMatch._id
        });
      } else {
        const uniMatch = universities.find(u => u.name?.en && location.toLowerCase().includes(u.name.en.toLowerCase()));
        if (uniMatch) {
          currentBatch.push({
            ...docTemplate,
            scope: 'university',
            entity_id: uniMatch._id
          });
        }
      }
    }

    if (currentBatch.length >= batchSize) {
      await flushBatch();
    }
  }

  // Flush remaining
  await flushBatch();

  console.log(`✅ Successfully seeded ${savedCount} scholarship records!`);
  process.exit(0);
}

seedScholarships().catch(console.error);
