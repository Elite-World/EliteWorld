import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
// fallback to apps/education/.env.local if needed
dotenv.config({ path: path.resolve(process.cwd(), 'apps/education/.env.local') });

import dbConnect from '../packages/domain/src/lib/mongoose';
import { Country, JurisdictionProfile, MobilitySolution } from '../packages/domain/src/data/models';

const seedData = [
  {
    countrySlug: 'united-states',
    tax_profile: {
      corporate_tax: '21%',
      personal_tax: 'Up to 37%',
      capital_gains: 'Up to 20%',
      crypto_tax: 'Treated as Property',
    },
    passport_power: {
      visa_free_score: 188,
      access_to_schengen: true,
      access_to_us: true,
      access_to_uk: true,
      access_to_china: false,
    },
    solutions: [
      {
        category: 'residency',
        name: { en: 'EB-5 Immigrant Investor Program' },
        requirements: {
          investment_amount: 'From $800,000',
          timeframe: '24-36 Months',
          physical_presence: 'Significant presence required',
        },
        description: 'The US EB-5 program provides a direct route to a Green Card and permanent residency for investors creating US jobs.',
      }
    ]
  },
  {
    countrySlug: 'portugal',
    tax_profile: {
      corporate_tax: '21%',
      personal_tax: 'NHR Regime Available (20%)',
      capital_gains: '28%',
      crypto_tax: 'Favorable (often 0%)',
    },
    passport_power: {
      visa_free_score: 189,
      access_to_schengen: true,
      access_to_us: true,
      access_to_uk: true,
      access_to_china: false,
    },
    solutions: [
      {
        category: 'residency',
        name: { en: 'Portugal Golden Visa' },
        requirements: {
          investment_amount: 'From €500,000 (Funds)',
          timeframe: '12-18 Months',
          physical_presence: '7 Days per Year',
        },
        description: 'The Portugal Golden Visa is one of the most popular residency-by-investment programs, offering a pathway to EU citizenship with minimal physical presence.',
      }
    ]
  },
  {
    countrySlug: 'uae',
    tax_profile: {
      corporate_tax: '9% (0% in Free Zones)',
      personal_tax: '0%',
      capital_gains: '0%',
      crypto_tax: '0%',
    },
    passport_power: {
      visa_free_score: 180,
      access_to_schengen: true,
      access_to_us: false,
      access_to_uk: true,
      access_to_china: true,
    },
    solutions: [
      {
        category: 'long_term_visa',
        name: { en: 'UAE Golden Visa' },
        requirements: {
          investment_amount: 'From AED 2,000,000',
          timeframe: '1-3 Months',
          physical_presence: 'None',
        },
        description: 'A 10-year renewable residence visa designed for investors, entrepreneurs, and specialized talents.',
      }
    ]
  }
];

async function seed() {
  console.log('🌱 Starting Global Mobility Seed...');
  await dbConnect();

  for (const data of seedData) {
    // 1. Find the Country
    // Depending on what is in DB, the slug might be 'us' instead of 'united-states'. Let's search by 'name.en' or slug.
    let country = await Country.findOne({ slug: data.countrySlug });
    if (!country) {
       // if not found by slug, create a dummy one for now just so the dashboard works
       console.log(`⚠️ Country ${data.countrySlug} not found in DB. Creating dummy country...`);
       country = await Country.create({
         name: { en: data.countrySlug.replace('-', ' ').toUpperCase() },
         slug: data.countrySlug
       });
    }

    // 2. Create or Update JurisdictionProfile
    await JurisdictionProfile.findOneAndUpdate(
      { country_id: country._id },
      {
        country_id: country._id,
        isActive: true,
        tax_profile: data.tax_profile,
        passport_power: data.passport_power
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Seeded JurisdictionProfile for ${country.slug}`);

    // 3. Create or Update MobilitySolutions
    for (const sol of data.solutions) {
      await MobilitySolution.findOneAndUpdate(
        { country_id: country._id, 'name.en': sol.name.en },
        {
          country_id: country._id,
          isActive: true,
          category: sol.category,
          name: sol.name,
          requirements: sol.requirements,
          description: sol.description
        },
        { upsert: true, new: true }
      );
      console.log(`✅ Seeded MobilitySolution '${sol.name.en}' for ${country.slug}`);
    }
  }

  console.log('🎉 Global Mobility Seed Complete!');
  process.exit(0);
}

seed().catch(console.error);
