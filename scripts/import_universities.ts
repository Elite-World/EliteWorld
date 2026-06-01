import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University, Country } from '../packages/domain/src/data/models';

const DATA_FILE = path.join(__dirname, '../scraped_universities.json');

async function importUniversities() {
  console.log('🚀 Starting University Import to MongoDB...');

  if (!fs.existsSync(DATA_FILE)) {
    console.error(`❌ Data file not found at: ${DATA_FILE}`);
    process.exit(1);
  }

  const scrapedData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  console.log(`📋 Loaded ${scrapedData.length} universities from JSON.`);

  await dbConnect();

  for (const uni of scrapedData) {
    if (!uni.name) continue;

    try {
      // Upsert Country (simple approach, usually you might want a proper country list)
      let countryId = null;
      if (uni.country) {
        const countrySlug = uni.country.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        const countryDoc = await Country.findOneAndUpdate(
          { slug: countrySlug },
          { 
            name: { en: uni.country, cn: uni.country },
            slug: countrySlug
          },
          { upsert: true, new: true }
        );
        countryId = countryDoc._id;
      }

      const uniSlug = uni.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const uniDoc = {
        slug: uniSlug,
        name: {
          en: uni.name,
          cn: uni.name // Fallback, would need translation ideally
        },
        description: uni.description,
        location: {
          country_id: countryId,
          coordinates: uni.location?.coordinates || []
        },
        assets: {
          logo: uni.logoUrl,
          website: uni.websiteUrl
        },
        details: {
          overall: uni.details || [],
          stat: uni.stats || []
        }
      };

      await University.findOneAndUpdate(
        { slug: uniSlug },
        { $set: uniDoc },
        { upsert: true }
      );

      console.log(`✅ Imported: ${uni.name}`);
    } catch (err: any) {
      console.error(`❌ Failed to import ${uni.name}: ${err.message}`);
    }
  }

  console.log('🎉 Import Complete!');
  process.exit(0);
}

importUniversities().catch(err => {
  console.error('Fatal Import Error:', err);
  process.exit(1);
});
