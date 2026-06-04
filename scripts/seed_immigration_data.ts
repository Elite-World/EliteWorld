import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), 'apps/immigration/.env.local') });

import dbConnect from '../packages/domain/src/lib/mongoose';
import { Country, JurisdictionProfile, MobilitySolution } from '../packages/domain/src/data/models';

const seedData = [
  {
    slug: 'united-states', name: 'United States',
    tax: { corporate_tax: '21%', personal_tax: 'Up to 37%', capital_gains: 'Up to 20%', crypto_tax: 'Treated as Property' },
    passport: { visa_free_score: 188, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'EB-5 Immigrant Investor Program', reqs: { investment_amount: 'From $800,000', timeframe: '24-36 Months', physical_presence: 'Significant presence required' }, desc: 'The US EB-5 program provides a direct route to a Green Card and permanent residency for investors creating US jobs.' }
    ]
  },
  {
    slug: 'united-kingdom', name: 'United Kingdom',
    tax: { corporate_tax: '25%', personal_tax: 'Up to 45%', capital_gains: 'Up to 20%', crypto_tax: 'Treated as Capital Gains' },
    passport: { visa_free_score: 191, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Innovator Founder Visa', reqs: { investment_amount: 'No minimum', timeframe: '3-6 Months', physical_presence: '180 Days/Year' }, desc: 'Designed for entrepreneurs seeking to establish a business in the UK, offering a pathway to settlement in 3 years.' }
    ]
  },
  {
    slug: 'canada', name: 'Canada',
    tax: { corporate_tax: '26.5%', personal_tax: 'Up to 53.53%', capital_gains: '50% of marginal rate', crypto_tax: 'Treated as Business Income or Capital Gains' },
    passport: { visa_free_score: 187, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Start-Up Visa Program', reqs: { investment_amount: 'Varies', timeframe: '12-16 Months', physical_presence: '730 Days over 5 Years' }, desc: 'Targeting immigrant entrepreneurs with the skills and potential to build businesses in Canada.' }
    ]
  },
  {
    slug: 'australia', name: 'Australia',
    tax: { corporate_tax: '30%', personal_tax: 'Up to 45%', capital_gains: 'Up to 45%', crypto_tax: 'Subject to Capital Gains Tax' },
    passport: { visa_free_score: 189, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Business Innovation and Investment', reqs: { investment_amount: 'From AUD 1.25M', timeframe: '12-24 Months', physical_presence: 'Varies by stream' }, desc: 'A multi-stream program for entrepreneurs, investors, and business owners looking to settle in Australia.' }
    ]
  },
  {
    slug: 'new-zealand', name: 'New Zealand',
    tax: { corporate_tax: '28%', personal_tax: 'Up to 39%', capital_gains: 'Generally 0%', crypto_tax: 'Treated as Property' },
    passport: { visa_free_score: 189, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Active Investor Plus Visa', reqs: { investment_amount: 'NZD 5M - 15M', timeframe: '6-12 Months', physical_presence: '117 Days over 4 Years' }, desc: 'Encouraging direct investment into New Zealand businesses.' }
    ]
  },
  {
    slug: 'singapore', name: 'Singapore',
    tax: { corporate_tax: '17%', personal_tax: 'Up to 22%', capital_gains: '0%', crypto_tax: '0% on long-term' },
    passport: { visa_free_score: 194, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: true },
    solutions: [
      { category: 'residency', name: 'Global Investor Programme (GIP)', reqs: { investment_amount: 'SGD 10M - 25M', timeframe: '9-12 Months', physical_presence: 'Substantial' }, desc: 'Premium residency program offering PR status to elite global investors and entrepreneurs.' }
    ]
  },
  {
    slug: 'uae', name: 'United Arab Emirates',
    tax: { corporate_tax: '9%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 180, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      { category: 'long_term_visa', name: 'UAE Golden Visa', reqs: { investment_amount: 'From AED 2M', timeframe: '1-3 Months', physical_presence: 'None' }, desc: 'A 10-year renewable residence visa designed for investors, entrepreneurs, and specialized talents.' }
    ]
  },
  {
    slug: 'switzerland', name: 'Switzerland',
    tax: { corporate_tax: '11.9% - 21.0%', personal_tax: 'Varies by Canton', capital_gains: '0% for individuals', crypto_tax: 'Wealth Tax applies' },
    passport: { visa_free_score: 190, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Swiss Residency Program', reqs: { investment_amount: 'From CHF 250,000 (Lump-sum tax)', timeframe: '3-6 Months', physical_presence: 'Varies by Canton' }, desc: 'Allows financially independent individuals to reside in Switzerland via the lump-sum taxation system.' }
    ]
  },
  {
    slug: 'italy', name: 'Italy',
    tax: { corporate_tax: '24%', personal_tax: 'Up to 43%', capital_gains: '26%', crypto_tax: '26% over €2000' },
    passport: { visa_free_score: 194, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Italy Investor Visa', reqs: { investment_amount: 'From €250,000', timeframe: '3-4 Months', physical_presence: 'None initially' }, desc: 'A strategic pathway into the EU for investors funding strategic assets in Italy.' }
    ]
  },
  {
    slug: 'portugal', name: 'Portugal',
    tax: { corporate_tax: '21%', personal_tax: 'Up to 48%', capital_gains: '28%', crypto_tax: '0% if held > 1 year' },
    passport: { visa_free_score: 191, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Portugal Golden Visa', reqs: { investment_amount: 'From €500,000 (Funds)', timeframe: '12-18 Months', physical_presence: '7 Days per Year' }, desc: 'One of Europe’s most popular residency-by-investment programs, offering a pathway to EU citizenship.' }
    ]
  },
  {
    slug: 'spain', name: 'Spain',
    tax: { corporate_tax: '25%', personal_tax: 'Up to 47%', capital_gains: '19-28%', crypto_tax: 'Subject to Capital Gains' },
    passport: { visa_free_score: 194, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Spain Golden Visa', reqs: { investment_amount: 'From €500,000', timeframe: '2-3 Months', physical_presence: 'None (if not PR)' }, desc: 'Provides non-EU investors and their families a fast-track to Spanish residency.' }
    ]
  },
  {
    slug: 'greece', name: 'Greece',
    tax: { corporate_tax: '22%', personal_tax: 'Up to 44%', capital_gains: '15%', crypto_tax: '15%' },
    passport: { visa_free_score: 190, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Greece Golden Visa', reqs: { investment_amount: 'From €250,000', timeframe: '3-6 Months', physical_presence: 'None' }, desc: 'The most competitive Golden Visa in the EU, granting immediate 5-year residency.' }
    ]
  },
  {
    slug: 'malta', name: 'Malta',
    tax: { corporate_tax: '35% (effective 5%)', personal_tax: 'Up to 35%', capital_gains: 'Varies', crypto_tax: 'Highly favorable' },
    passport: { visa_free_score: 190, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'citizenship', name: 'Maltese Citizenship by Direct Investment', reqs: { investment_amount: 'From €600,000', timeframe: '12-36 Months', physical_presence: 'Strict requirements' }, desc: 'A premier EU citizenship program offering unprecedented global mobility.' }
    ]
  },
  {
    slug: 'cyprus', name: 'Cyprus',
    tax: { corporate_tax: '12.5%', personal_tax: 'Up to 35%', capital_gains: '20% on real estate', crypto_tax: 'Favorable' },
    passport: { visa_free_score: 181, access_to_schengen: false, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'residency', name: 'Cyprus Permanent Residency', reqs: { investment_amount: 'From €300,000', timeframe: '2-3 Months', physical_presence: 'Visit every 2 years' }, desc: 'Fast-track permanent residency in an emerging EU financial hub.' }
    ]
  },
  {
    slug: 'antigua-and-barbuda', name: 'Antigua and Barbuda',
    tax: { corporate_tax: '25%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 153, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      { category: 'citizenship', name: 'Antigua CBI Program', reqs: { investment_amount: 'From $100,000', timeframe: '3-5 Months', physical_presence: '5 Days in first 5 years' }, desc: 'A fast, family-friendly citizenship program in the Caribbean.' }
    ]
  },
  {
    slug: 'dominica', name: 'Dominica',
    tax: { corporate_tax: '25%', personal_tax: 'Up to 35%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 144, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      { category: 'citizenship', name: 'Dominica CBI Program', reqs: { investment_amount: 'From $100,000', timeframe: '3-5 Months', physical_presence: 'None' }, desc: 'One of the longest-running and most affordable CBI programs globally.' }
    ]
  },
  {
    slug: 'grenada', name: 'Grenada',
    tax: { corporate_tax: '28%', personal_tax: 'Up to 28%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 147, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      { category: 'citizenship', name: 'Grenada CBI Program', reqs: { investment_amount: 'From $150,000', timeframe: '4-6 Months', physical_presence: 'None' }, desc: 'The only Caribbean CBI program offering visa-free access to China and an E-2 treaty with the US.' }
    ]
  },
  {
    slug: 'st-kitts-and-nevis', name: 'St. Kitts and Nevis',
    tax: { corporate_tax: '33%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 156, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'citizenship', name: 'St. Kitts CBI Program', reqs: { investment_amount: 'From $250,000', timeframe: '4-6 Months', physical_presence: 'None' }, desc: 'The platinum standard of CBI programs, established in 1984.' }
    ]
  },
  {
    slug: 'st-lucia', name: 'St. Lucia',
    tax: { corporate_tax: '30%', personal_tax: 'Up to 30%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 148, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'citizenship', name: 'St. Lucia CBI Program', reqs: { investment_amount: 'From $100,000', timeframe: '3-5 Months', physical_presence: 'None' }, desc: 'A relatively new but highly efficient and affordable Caribbean citizenship program.' }
    ]
  },
  {
    slug: 'vanuatu', name: 'Vanuatu',
    tax: { corporate_tax: '0%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 104, access_to_schengen: false, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      { category: 'citizenship', name: 'Vanuatu DSP / VCP', reqs: { investment_amount: 'From $130,000', timeframe: '1-2 Months', physical_presence: 'None' }, desc: 'The fastest citizenship program in the world, often completing in under 45 days.' }
    ]
  }
];

async function seed() {
  console.log('🌱 Starting Comprehensive Immigration Data Seed...');
  await dbConnect();

  for (const data of seedData) {
    let country = await Country.findOne({ slug: data.slug });
    if (!country) {
      console.log(`⚠️ Country ${data.slug} not found in DB. Creating...`);
      country = await Country.create({
        name: { en: data.name },
        slug: data.slug
      });
    }

    // Jurisdiction Profile
    await JurisdictionProfile.findOneAndUpdate(
      { country_id: country._id },
      {
        country_id: country._id,
        isActive: true,
        tax_profile: data.tax,
        passport_power: data.passport
      },
      { upsert: true, new: true }
    );
    console.log(`✅ Seeded Profile: ${data.name}`);

    // Mobility Solutions
    for (const sol of data.solutions) {
      await MobilitySolution.findOneAndUpdate(
        { country_id: country._id, 'name.en': sol.name },
        {
          country_id: country._id,
          isActive: true,
          category: sol.category as any,
          name: { en: sol.name },
          requirements: sol.reqs,
          description: sol.desc
        },
        { upsert: true, new: true }
      );
      console.log(`   -> Solution: ${sol.name}`);
    }
  }

  console.log('🎉 Immigration Database Seed Complete!');
  process.exit(0);
}

seed().catch(console.error);
