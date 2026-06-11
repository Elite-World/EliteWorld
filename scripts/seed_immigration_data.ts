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
    slug: 'united-states', nameEn: 'United States', nameCn: '美国',
    tax: { corporate_tax: '21%', personal_tax: 'Up to 37%', capital_gains: 'Up to 20%', crypto_tax: 'Treated as Property' },
    passport: { visa_free_score: 188, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'EB-5 Immigrant Investor Program',
        nameCn: 'EB-5 投资移民计划',
        reqsEn: { investment_amount: 'From $800,000', timeframe: '24-36 Months', physical_presence: 'Significant presence required' },
        reqsCn: { investment_amount: '80万美元起', timeframe: '24-36个月', physical_presence: '需要实质性居住' },
        descEn: 'The US EB-5 program provides a direct route to a Green Card and permanent residency for investors creating US jobs.',
        descCn: '美国 EB-5 项目为创造美国就业机会的投资者提供了获得绿卡和永久居留权的直接途径。'
      }
    ]
  },
  {
    slug: 'united-kingdom', nameEn: 'United Kingdom', nameCn: '英国',
    tax: { corporate_tax: '25%', personal_tax: 'Up to 45%', capital_gains: 'Up to 20%', crypto_tax: 'Treated as Capital Gains' },
    passport: { visa_free_score: 191, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Innovator Founder Visa',
        nameCn: '创新者创始人签证',
        reqsEn: { investment_amount: 'No minimum', timeframe: '3-6 Months', physical_presence: '180 Days/Year' },
        reqsCn: { investment_amount: '无最低投资额要求', timeframe: '3-6个月', physical_presence: '每年居住180天' },
        descEn: 'Designed for entrepreneurs seeking to establish a business in the UK, offering a pathway to settlement in 3 years.',
        descCn: '专为寻求在英国建立企业的企业家设计，提供在 3 年内获得永居的途径。'
      }
    ]
  },
  {
    slug: 'canada', nameEn: 'Canada', nameCn: '加拿大',
    tax: { corporate_tax: '26.5%', personal_tax: 'Up to 53.53%', capital_gains: '50% of marginal rate', crypto_tax: 'Treated as Business Income or Capital Gains' },
    passport: { visa_free_score: 187, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Start-Up Visa Program',
        nameCn: '联邦创业移民项目 (SUV)',
        reqsEn: { investment_amount: 'Varies', timeframe: '12-16 Months', physical_presence: '730 Days over 5 Years' },
        reqsCn: { investment_amount: '视具体情况而定', timeframe: '12-16个月', physical_presence: '5年内住满730天' },
        descEn: 'Targeting immigrant entrepreneurs with the skills and potential to build businesses in Canada.',
        descCn: '旨在吸引具有在加拿大创业的技能和潜力的移民企业家。'
      }
    ]
  },
  {
    slug: 'australia', nameEn: 'Australia', nameCn: '澳大利亚',
    tax: { corporate_tax: '30%', personal_tax: 'Up to 45%', capital_gains: 'Up to 45%', crypto_tax: 'Subject to Capital Gains Tax' },
    passport: { visa_free_score: 189, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Business Innovation and Investment',
        nameCn: '商业创新与投资计划',
        reqsEn: { investment_amount: 'From AUD 1.25M', timeframe: '12-24 Months', physical_presence: 'Varies by stream' },
        reqsCn: { investment_amount: '125万澳元起', timeframe: '12-24个月', physical_presence: '因申请类别而异' },
        descEn: 'A multi-stream program for entrepreneurs, investors, and business owners looking to settle in Australia.',
        descCn: '一项为希望在澳大利亚定居的企业家、投资者和企业主设计的多通道计划。'
      }
    ]
  },
  {
    slug: 'new-zealand', nameEn: 'New Zealand', nameCn: '新西兰',
    tax: { corporate_tax: '28%', personal_tax: 'Up to 39%', capital_gains: 'Generally 0%', crypto_tax: 'Treated as Property' },
    passport: { visa_free_score: 189, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Active Investor Plus Visa',
        nameCn: '积极投资者Plus签证',
        reqsEn: { investment_amount: 'NZD 5M - 15M', timeframe: '6-12 Months', physical_presence: '117 Days over 4 Years' },
        reqsCn: { investment_amount: '500万 - 1500万新西兰元', timeframe: '6-12个月', physical_presence: '4年内住满117天' },
        descEn: 'Encouraging direct investment into New Zealand businesses.',
        descCn: '鼓励直接投资于新西兰本地企业。'
      }
    ]
  },
  {
    slug: 'singapore', nameEn: 'Singapore', nameCn: '新加坡',
    tax: { corporate_tax: '17%', personal_tax: 'Up to 22%', capital_gains: '0%', crypto_tax: '0% on long-term' },
    passport: { visa_free_score: 194, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: true },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Global Investor Programme (GIP)',
        nameCn: '全球商业投资者计划 (GIP)',
        reqsEn: { investment_amount: 'SGD 10M - 25M', timeframe: '9-12 Months', physical_presence: 'Substantial' },
        reqsCn: { investment_amount: '1000万 - 2500万新元', timeframe: '9-12个月', physical_presence: '有实质居住要求' },
        descEn: 'Premium residency program offering PR status to elite global investors and entrepreneurs.',
        descCn: '为全球精英投资者和企业家提供永久居民身份的顶级居留项目。'
      }
    ]
  },
  {
    slug: 'uae', nameEn: 'United Arab Emirates', nameCn: '阿联酋',
    tax: { corporate_tax: '9%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 180, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      {
        category: 'long_term_visa',
        nameEn: 'UAE Golden Visa',
        nameCn: '阿联酋黄金签证',
        reqsEn: { investment_amount: 'From AED 2M', timeframe: '1-3 Months', physical_presence: 'None' },
        reqsCn: { investment_amount: '200万迪拉姆起', timeframe: '1-3个月', physical_presence: '无居住要求' },
        descEn: 'A 10-year renewable residence visa designed for investors, entrepreneurs, and specialized talents.',
        descCn: '为投资者、企业家和专业人才设计的10年期可续签居留签证。'
      }
    ]
  },
  {
    slug: 'switzerland', nameEn: 'Switzerland', nameCn: '瑞士',
    tax: { corporate_tax: '11.9% - 21.0%', personal_tax: 'Varies by Canton', capital_gains: '0% for individuals', crypto_tax: 'Wealth Tax applies' },
    passport: { visa_free_score: 190, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Swiss Residency Program',
        nameCn: '瑞士居留项目',
        reqsEn: { investment_amount: 'From CHF 250,000 (Lump-sum tax)', timeframe: '3-6 Months', physical_presence: 'Varies by Canton' },
        reqsCn: { investment_amount: '25万瑞士法郎起 (包税制)', timeframe: '3-6个月', physical_presence: '因各联邦州而异' },
        descEn: 'Allows financially independent individuals to reside in Switzerland via the lump-sum taxation system.',
        descCn: '允许财务独立的个人通过一次性包税制在瑞士定居。'
      }
    ]
  },
  {
    slug: 'italy', nameEn: 'Italy', nameCn: '意大利',
    tax: { corporate_tax: '24%', personal_tax: 'Up to 43%', capital_gains: '26%', crypto_tax: '26% over €2000' },
    passport: { visa_free_score: 194, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Italy Investor Visa',
        nameCn: '意大利投资者签证',
        reqsEn: { investment_amount: 'From €250,000', timeframe: '3-4 Months', physical_presence: 'None initially' },
        reqsCn: { investment_amount: '25万欧元起', timeframe: '3-4个月', physical_presence: '初始无居住要求' },
        descEn: 'A strategic pathway into the EU for investors funding strategic assets in Italy.',
        descCn: '为资助意大利战略资产的投资者提供进入欧盟的战略途径。'
      }
    ]
  },
  {
    slug: 'portugal', nameEn: 'Portugal', nameCn: '葡萄牙',
    tax: { corporate_tax: '21%', personal_tax: 'Up to 48%', capital_gains: '28%', crypto_tax: '0% if held > 1 year' },
    passport: { visa_free_score: 191, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Portugal Golden Visa',
        nameCn: '葡萄牙黄金签证',
        reqsEn: { investment_amount: 'From €500,000 (Funds)', timeframe: '12-18 Months', physical_presence: '7 Days per Year' },
        reqsCn: { investment_amount: '50万欧元起 (基金)', timeframe: '12-18个月', physical_presence: '每年7天' },
        descEn: 'One of Europe’s most popular residency-by-investment programs, offering a pathway to EU citizenship.',
        descCn: '欧洲最受欢迎的投资居留计划之一，提供通往欧盟公民身份的途径。'
      }
    ]
  },
  {
    slug: 'spain', nameEn: 'Spain', nameCn: '西班牙',
    tax: { corporate_tax: '25%', personal_tax: 'Up to 47%', capital_gains: '19-28%', crypto_tax: 'Subject to Capital Gains' },
    passport: { visa_free_score: 194, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Spain Golden Visa',
        nameCn: '西班牙黄金签证',
        reqsEn: { investment_amount: 'From €500,000', timeframe: '2-3 Months', physical_presence: 'None (if not PR)' },
        reqsCn: { investment_amount: '50万欧元起', timeframe: '2-3个月', physical_presence: '无居住要求 (如不申请永久居民)' },
        descEn: 'Provides non-EU investors and their families a fast-track to Spanish residency.',
        descCn: '为非欧盟投资者及其家人提供获得西班牙居留权的快速通道。'
      }
    ]
  },
  {
    slug: 'greece', nameEn: 'Greece', nameCn: '希腊',
    tax: { corporate_tax: '22%', personal_tax: 'Up to 44%', capital_gains: '15%', crypto_tax: '15%' },
    passport: { visa_free_score: 190, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Greece Golden Visa',
        nameCn: '希腊黄金签证',
        reqsEn: { investment_amount: 'From €250,000', timeframe: '3-6 Months', physical_presence: 'None' },
        reqsCn: { investment_amount: '25万欧元起', timeframe: '3-6个月', physical_presence: '无居住要求' },
        descEn: 'The most competitive Golden Visa in the EU, granting immediate 5-year residency.',
        descCn: '欧盟极具竞争力的黄金签证，直接授予5年期居留权。'
      }
    ]
  },
  {
    slug: 'malta', nameEn: 'Malta', nameCn: '马耳他',
    tax: { corporate_tax: '35% (effective 5%)', personal_tax: 'Up to 35%', capital_gains: 'Varies', crypto_tax: 'Highly favorable' },
    passport: { visa_free_score: 190, access_to_schengen: true, access_to_us: true, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'citizenship',
        nameEn: 'Maltese Citizenship by Direct Investment',
        nameCn: '马耳他卓越投资入籍计划',
        reqsEn: { investment_amount: 'From €600,000', timeframe: '12-36 Months', physical_presence: 'Strict requirements' },
        reqsCn: { investment_amount: '60万欧元起', timeframe: '12-36个月', physical_presence: '有严格居住要求' },
        descEn: 'A premier EU citizenship program offering unprecedented global mobility.',
        descCn: '顶级的欧盟公民计划，提供无与伦比的全球流动便利。'
      }
    ]
  },
  {
    slug: 'cyprus', nameEn: 'Cyprus', nameCn: '塞浦路斯',
    tax: { corporate_tax: '12.5%', personal_tax: 'Up to 35%', capital_gains: '20% on real estate', crypto_tax: 'Favorable' },
    passport: { visa_free_score: 181, access_to_schengen: false, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'residency',
        nameEn: 'Cyprus Permanent Residency',
        nameCn: '塞浦路斯永久居留计划',
        reqsEn: { investment_amount: 'From €300,000', timeframe: '2-3 Months', physical_presence: 'Visit every 2 years' },
        reqsCn: { investment_amount: '30万欧元起', timeframe: '2-3个月', physical_presence: '每2年需入境一次' },
        descEn: 'Fast-track permanent residency in an emerging EU financial hub.',
        descCn: '在快速发展的欧盟金融中心获得快速通道永久居留权。'
      }
    ]
  },
  {
    slug: 'antigua-and-barbuda', nameEn: 'Antigua and Barbuda', nameCn: '安提瓜和巴布达',
    tax: { corporate_tax: '25%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 153, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      {
        category: 'citizenship',
        nameEn: 'Antigua CBI Program',
        nameCn: '安提瓜投资入籍计划',
        reqsEn: { investment_amount: 'From $100,000', timeframe: '3-5 Months', physical_presence: '5 Days in first 5 years' },
        reqsCn: { investment_amount: '10万美元起', timeframe: '3-5个月', physical_presence: '前5年内需住满5天' },
        descEn: 'A fast, family-friendly citizenship program in the Caribbean.',
        descCn: '加勒比地区快速且适合家庭申请的投资入籍项目。'
      }
    ]
  },
  {
    slug: 'dominica', nameEn: 'Dominica', nameCn: '多米尼克',
    tax: { corporate_tax: '25%', personal_tax: 'Up to 35%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 144, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      {
        category: 'citizenship',
        nameEn: 'Dominica CBI Program',
        nameCn: '多米尼克投资入籍计划',
        reqsEn: { investment_amount: 'From $100,000', timeframe: '3-5 Months', physical_presence: 'None' },
        reqsCn: { investment_amount: '10万美元起', timeframe: '3-5个月', physical_presence: '无居住要求' },
        descEn: 'One of the longest-running and most affordable CBI programs globally.',
        descCn: '全球运营历史最悠久且最经济实惠的投资入籍项目之一。'
      }
    ]
  },
  {
    slug: 'grenada', nameEn: 'Grenada', nameCn: '格林纳达',
    tax: { corporate_tax: '28%', personal_tax: 'Up to 28%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 147, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: true },
    solutions: [
      {
        category: 'citizenship',
        nameEn: 'Grenada CBI Program',
        nameCn: '格林纳达投资入籍计划',
        reqsEn: { investment_amount: 'From $150,000', timeframe: '4-6 Months', physical_presence: 'None' },
        reqsCn: { investment_amount: '15万美元起', timeframe: '4-6个月', physical_presence: '无居住要求' },
        descEn: 'The only Caribbean CBI program offering visa-free access to China and an E-2 treaty with the US.',
        descCn: '唯一提供免签中国以及可申请美国 E-2 签证协定的加勒比投资入籍项目。'
      }
    ]
  },
  {
    slug: 'st-kitts-and-nevis', nameEn: 'St. Kitts and Nevis', nameCn: '圣基茨和尼维斯',
    tax: { corporate_tax: '33%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 156, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'citizenship',
        nameEn: 'St. Kitts CBI Program',
        nameCn: '圣基茨投资入籍计划',
        reqsEn: { investment_amount: 'From $250,000', timeframe: '4-6 Months', physical_presence: 'None' },
        reqsCn: { investment_amount: '25万美元起', timeframe: '4-6个月', physical_presence: '无居住要求' },
        descEn: 'The platinum standard of CBI programs, established in 1984.',
        descCn: '创立于1984年的投资入籍项目的行业“白金标准”。'
      }
    ]
  },
  {
    slug: 'st-lucia', nameEn: 'St. Lucia', nameCn: '圣卢西亚',
    tax: { corporate_tax: '30%', personal_tax: 'Up to 30%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 148, access_to_schengen: true, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'citizenship',
        nameEn: 'St. Lucia CBI Program',
        nameCn: '圣卢西亚投资入籍计划',
        reqsEn: { investment_amount: 'From $100,000', timeframe: '3-5 Months', physical_presence: 'None' },
        reqsCn: { investment_amount: '10万美元起', timeframe: '3-5个月', physical_presence: '无居住要求' },
        descEn: 'A relatively new but highly efficient and affordable Caribbean citizenship program.',
        descCn: '一个相对较新但极具效率和高性价比的加勒比入籍项目。'
      }
    ]
  },
  {
    slug: 'vanuatu', nameEn: 'Vanuatu', nameCn: '瓦努阿图',
    tax: { corporate_tax: '0%', personal_tax: '0%', capital_gains: '0%', crypto_tax: '0%' },
    passport: { visa_free_score: 104, access_to_schengen: false, access_to_us: false, access_to_uk: true, access_to_china: false },
    solutions: [
      {
        category: 'citizenship',
        nameEn: 'Vanuatu DSP / VCP',
        nameCn: '瓦努阿图捐赠入籍计划',
        reqsEn: { investment_amount: 'From $130,000', timeframe: '1-2 Months', physical_presence: 'None' },
        reqsCn: { investment_amount: '13万美元起', timeframe: '1-2个月', physical_presence: '无居住要求' },
        descEn: 'The fastest citizenship program in the world, often completing in under 45 days.',
        descCn: '全球办理速度最快的入籍项目，通常在 45 天内完成。'
      }
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
        name: { en: data.nameEn, cn: data.nameCn },
        slug: data.slug,
        translations: {
          en: { name: data.nameEn },
          cn: { name: data.nameCn }
        }
      });
    } else {
      country.translations = {
        en: { name: data.nameEn },
        cn: { name: data.nameCn }
      };
      if (!country.name) {
        country.name = { en: data.nameEn, cn: data.nameCn };
      } else {
        country.name.en = data.nameEn;
        country.name.cn = data.nameCn;
      }
      await country.save();
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
    console.log(`✅ Seeded Profile: ${data.nameEn}`);

    // Mobility Solutions
    for (const sol of data.solutions) {
      await MobilitySolution.findOneAndUpdate(
        { country_id: country._id, 'name.en': sol.nameEn },
        {
          country_id: country._id,
          isActive: true,
          category: sol.category as any,
          name: { en: sol.nameEn, cn: sol.nameCn },
          requirements: sol.reqsEn,
          description: sol.descEn,
          translations: {
            en: {
              name: sol.nameEn,
              description: sol.descEn,
              requirements: sol.reqsEn
            },
            cn: {
              name: sol.nameCn,
              description: sol.descCn,
              requirements: sol.reqsCn
            }
          }
        },
        { upsert: true, new: true }
      );
      console.log(`   -> Solution: ${sol.nameEn}`);
    }
  }

  console.log('🎉 Immigration Database Seed Complete!');
  process.exit(0);
}

seed().catch(console.error);
