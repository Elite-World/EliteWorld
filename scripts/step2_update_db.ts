import 'dotenv/config';
import fs from 'fs';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University, Country } from '../packages/domain/src/data/models';

const countryTranslationMap: Record<string, string> = {
    '美国': 'United States of America',
    '英国': 'United Kingdom',
    '中国': 'China',
    '新加坡': 'Singapore',
    '瑞士': 'Switzerland',
    '澳大利亚': 'Australia',
    '德国': 'Germany',
    '加拿大': 'Canada',
    '日本': 'Japan',
    '法国': 'France',
    '韩国': 'South Korea',
    '荷兰': 'Netherlands',
    '瑞典': 'Sweden',
    '爱尔兰': 'Ireland',
    '俄罗斯': 'Russia',
    '意大利': 'Italy',
    '新西兰': 'New Zealand',
    '比利时': 'Belgium',
    '丹麦': 'Denmark',
    '马来西亚': 'Malaysia',
    '挪威': 'Norway',
    '芬兰': 'Finland',
    '西班牙': 'Spain',
    '沙特阿拉伯': 'Saudi Arabia',
    '阿根廷': 'Argentina',
    '巴西': 'Brazil',
    '智利': 'Chile',
    '墨西哥': 'Mexico',
    '中国香港': 'Hong Kong',
    '中国台湾': 'Taiwan',
    '中国澳门': 'Macau',
    '南非': 'South Africa',
    '奥地利': 'Austria',
    '印度': 'India',
    '阿联酋': 'United Arab Emirates',
    '以色列': 'Israel',
    '葡萄牙': 'Portugal',
    '波兰': 'Poland',
    '捷克': 'Czech Republic',
    '希腊': 'Greece',
    '泰国': 'Thailand',
    '印尼': 'Indonesia',
    '埃及': 'Egypt',
    '巴基斯坦': 'Pakistan',
    '哥伦比亚': 'Colombia',
    '秘鲁': 'Peru',
    '土耳其': 'Turkey',
    '伊朗': 'Iran',
    '卡塔尔': 'Qatar',
    '黎巴嫩': 'Lebanon',
    '爱沙尼亚': 'Estonia',
    '拉脱维亚': 'Latvia',
    '立陶宛': 'Lithuania',
    '塞浦路斯': 'Cyprus',
    '冰岛': 'Iceland',
    '马耳他': 'Malta',
    '斯洛文尼亚': 'Slovenia',
    '克罗地亚': 'Croatia',
    '塞尔维亚': 'Serbia',
    '保加利亚': 'Bulgaria',
    '罗马尼亚': 'Romania',
    '匈牙利': 'Hungary',
    '斯洛伐克': 'Slovakia',
    '乌克兰': 'Ukraine',
    '全球': 'Global'
};

const normalizeToSlug = (name: string, index: number) => {
    if (!name) return 'unknown-' + index;
    const s = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return s || ('unknown-' + index);
};

async function run() {
    console.log('🔗 Connecting to DB...');
    await dbConnect();

    console.log('📖 Reading countries_data.json...');
    const data = JSON.parse(fs.readFileSync('countries_data.json', 'utf-8'));

    console.log('🔍 Identifying unique countries...');
    const countryNames = Array.from(new Set(data.map((r: any) => r.country_cn || 'Unknown')));
    
    console.log(`🌍 Found ${countryNames.length} unique countries. Ensuring they exist...`);
    
    const countryDocs = new Map();
    let idx = 0;
    for (const country_cn of countryNames) {
        idx++;
        let country_en = countryTranslationMap[country_cn as string] || country_cn;
        const slug = normalizeToSlug(country_en as string, idx);
        
        let countryDoc = await Country.findOne({ slug });
        if (!countryDoc) {
            console.log(`Creating country: ${country_en} (slug: ${slug})`);
            try {
                countryDoc = await Country.create({
                    name: { en: country_en, cn: country_cn },
                    slug
                });
            } catch (e: any) {
                console.error(`Error creating country ${country_en}: ${e.message}`);
                process.exit(1);
            }
        }
        countryDocs.set(country_cn, countryDoc._id);
    }
    
    console.log(`✅ Ensured ${countryDocs.size} distinct countries in DB.`);

    const bulkOps = [];
    for (const row of data) {
        const countryId = countryDocs.get(row.country_cn || 'Unknown');
        if (countryId) {
            bulkOps.push({
                updateOne: {
                    filter: { "name.en": row.name_en },
                    update: { $set: { "location.country_id": countryId } }
                }
            });
        }
    }

    console.log(`📦 Executing ${bulkOps.length} bulk update operations...`);
    const res = await University.bulkWrite(bulkOps);
    console.log(`🎉 Success! Updated ${res.modifiedCount} universities with their proper country coordinates!`);
    
    process.exit(0);
}

run().catch(err => {
    console.error('FATAL:', err);
    process.exit(1);
});
