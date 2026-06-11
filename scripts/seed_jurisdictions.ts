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
    countryNameEn: 'United States',
    countryNameCn: '美国',
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
        name: { en: 'EB-5 Immigrant Investor Program', cn: 'EB-5 投资移民计划' },
        requirements: {
          investment_amount: 'From $800,000',
          timeframe: '24-36 Months',
          physical_presence: 'Significant presence required',
        },
        description: 'The US EB-5 program provides a direct route to a Green Card and permanent residency for investors creating US jobs.',
        translations: {
          en: {
            name: 'EB-5 Immigrant Investor Program',
            description: 'The US EB-5 program provides a direct route to a Green Card and permanent residency for investors creating US jobs.',
            requirements: {
              investment_amount: 'From $800,000',
              timeframe: '24-36 Months',
              physical_presence: 'Significant presence required',
            }
          },
          cn: {
            name: 'EB-5 投资移民计划',
            description: '美国 EB-5 项目为创造美国就业机会的投资者提供了获得绿卡和永久居留权的直接途径。',
            requirements: {
              investment_amount: '80万美元起',
              timeframe: '24-36个月',
              physical_presence: '需要实质性居住',
            }
          }
        }
      }
    ]
  },
  {
    countrySlug: 'portugal',
    countryNameEn: 'Portugal',
    countryNameCn: '葡萄牙',
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
        name: { en: 'Portugal Golden Visa', cn: '葡萄牙黄金签证' },
        requirements: {
          investment_amount: 'From €500,000 (Funds)',
          timeframe: '12-18 Months',
          physical_presence: '7 Days per Year',
        },
        description: 'The Portugal Golden Visa is one of the most popular residency-by-investment programs, offering a pathway to EU citizenship with minimal physical presence.',
        translations: {
          en: {
            name: 'Portugal Golden Visa',
            description: 'The Portugal Golden Visa is one of the most popular residency-by-investment programs, offering a pathway to EU citizenship with minimal physical presence.',
            requirements: {
              investment_amount: 'From €500,000 (Funds)',
              timeframe: '12-18 Months',
              physical_presence: '7 Days per Year',
            }
          },
          cn: {
            name: '葡萄牙黄金签证',
            description: '葡萄牙黄金签证是最受欢迎的投资居留项目之一，以极低的居住要求提供获得欧盟公民身份的途径。',
            requirements: {
              investment_amount: '50万欧元起（基金方式）',
              timeframe: '12-18个月',
              physical_presence: '每年仅需居住7天',
            }
          }
        }
      }
    ]
  },
  {
    countrySlug: 'uae',
    countryNameEn: 'United Arab Emirates',
    countryNameCn: '阿联酋',
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
        name: { en: 'UAE Golden Visa', cn: '阿联酋黄金签证' },
        requirements: {
          investment_amount: 'From AED 2,000,000',
          timeframe: '1-3 Months',
          physical_presence: 'None',
        },
        description: 'A 10-year renewable residence visa designed for investors, entrepreneurs, and specialized talents.',
        translations: {
          en: {
            name: 'UAE Golden Visa',
            description: 'A 10-year renewable residence visa designed for investors, entrepreneurs, and specialized talents.',
            requirements: {
              investment_amount: 'From AED 2,000,000',
              timeframe: '1-3 Months',
              physical_presence: 'None',
            }
          },
          cn: {
            name: '阿联酋黄金签证',
            description: '为投资者、企业家和专业人才设计的10年期可续签居留签证。',
            requirements: {
              investment_amount: '200万迪拉姆起',
              timeframe: '1-3个月',
              physical_presence: '无居住要求',
            }
          }
        }
      }
    ]
  }
];

async function seed() {
  console.log('🌱 Starting Global Mobility Seed...');
  await dbConnect();

  for (const data of seedData) {
    // 1. Find the Country
    let country = await Country.findOne({ slug: data.countrySlug });
    if (!country) {
       console.log(`⚠️ Country ${data.countrySlug} not found in DB. Creating dummy country...`);
       country = await Country.create({
         name: { en: data.countryNameEn, cn: data.countryNameCn },
         slug: data.countrySlug,
         translations: {
           en: { name: data.countryNameEn },
           cn: { name: data.countryNameCn }
         }
       });
    } else {
       country.translations = {
         en: { name: data.countryNameEn },
         cn: { name: data.countryNameCn }
       };
       if (!country.name) {
         country.name = { en: data.countryNameEn, cn: data.countryNameCn };
       } else {
         country.name.en = data.countryNameEn;
         country.name.cn = data.countryNameCn;
       }
       await country.save();
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
          description: sol.description,
          translations: sol.translations
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
