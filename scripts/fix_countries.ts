import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University, Country } from '../packages/domain/src/data/models';

puppeteer.use(StealthPlugin());

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
    '乌克兰': 'Ukraine'
};

const normalizeToSlug = (name: string) => {
    if (!name) return 'unknown-' + Date.now();
    const s = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return s || ('unknown-' + Date.now());
};

async function fixCountries() {
    console.log('🚀 Launching Puppeteer to fetch Countries...');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    let ajaxBody = '';
    page.on('request', req => {
        if (req.url().includes('admin-ajax.php')) {
            ajaxBody = req.postData() || '';
        }
    });
  
    await page.goto('https://www.forwardpathway.com/worldranking', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('table tbody tr', { timeout: 60000 });
    
    if (!ajaxBody) {
        console.error('❌ Failed to capture AJAX body!');
        await browser.close();
        process.exit(1);
    }
  
    const allData = await page.evaluate(async (body) => {
        const newBody = body.replace(/length=\d+/, 'length=-1');
        const res = await fetch("https://www.forwardpathway.com/wp-admin/admin-ajax.php?action=get_wdtable&table_id=50", {
           method: "POST",
           headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
           body: newBody
        });
        return res.json();
    }, ajaxBody);
    
    await browser.close();

    console.log(`📋 Fetched ${allData.data.length} universities from API. Connecting to MongoDB...`);
    await dbConnect();

    // Ensure all countries exist
    const countryDocs = new Map();
    for (const row of allData.data) {
        let country_cn = row[2];
        if (!country_cn) country_cn = 'Unknown';
        
        if (!countryDocs.has(country_cn)) {
            let country_en = countryTranslationMap[country_cn] || country_cn;
            const slug = normalizeToSlug(country_en);
            
            let countryDoc = await Country.findOne({ slug });
            if (!countryDoc) {
                countryDoc = await Country.create({
                    name: { en: country_en, cn: country_cn },
                    slug
                });
            }
            countryDocs.set(country_cn, countryDoc._id);
        }
    }

    console.log(`✅ Ensure ${countryDocs.size} countries exist in DB.`);

    let success = 0;
    for (const row of allData.data) {
        const enMatch = row[1].match(/>(.*?)<\/a>/);
        const name_en = enMatch ? enMatch[1] : row[1];
        const clean_name_en = name_en.replace(/&amp;/g, '&').replace(/^\u200b/, '').trim();
        let country_cn = row[2] || 'Unknown';
        const countryId = countryDocs.get(country_cn);

        if (countryId) {
            const res = await University.updateOne(
                { "name.en": clean_name_en },
                { $set: { "location.country_id": countryId } }
            );
            if (res.modifiedCount > 0) success++;
        }
    }

    console.log(`🎉 Successfully updated country for ${success} universities in MongoDB!`);
    process.exit(0);
}

fixCountries().catch(err => {
    console.error(err);
    process.exit(1);
});
