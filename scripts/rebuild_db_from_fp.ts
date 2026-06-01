import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University, RankingSystem, Country } from '../packages/domain/src/data/models';

const DATA_FILE = path.join(__dirname, '../forwardpathway_data.json');

const normalizeToSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

async function rebuild() {
    console.log('🚀 Connecting to MongoDB...');
    await dbConnect();
    
    console.log('🧹 Erasing existing University and RankingSystem collections...');
    await University.deleteMany({});
    await RankingSystem.deleteMany({});
    
    // Ensure a default country exists
    let defaultCountry = await Country.findOne({ slug: 'global' });
    if (!defaultCountry) {
        defaultCountry = await Country.create({
            name: { en: 'Global', cn: '全球' },
            slug: 'global',
        });
    }

    console.log(`📋 Loading data from ${DATA_FILE}...`);
    const scrapedData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    
    console.log(`🏫 Inserting ${scrapedData.length} Universities...`);
    const uniDocs = [];
    const usedSlugs = new Set();
    const uniMapping = new Map(); // wID -> ObjectId

    for (const item of scrapedData) {
        let baseSlug = normalizeToSlug(item.name_en || item.name_cn || `uni-${item.wID}`);
        let slug = baseSlug;
        let counter = 1;
        while (usedSlugs.has(slug)) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        usedSlugs.add(slug);

        uniDocs.push({
            slug,
            name: {
                en: item.name_en || item.name_cn,
                cn: item.name_cn
            },
            location: {
                country_id: defaultCountry._id
            },
            // Temporarily store wID in description or just memory to map later
            // We will just map it in memory!
        });
    }

    const insertedUnis = await University.insertMany(uniDocs);
    console.log(`✅ Inserted ${insertedUnis.length} universities.`);

    // Build memory map of wID -> ObjectId using the ordered arrays
    for (let i = 0; i < scrapedData.length; i++) {
        uniMapping.set(scrapedData[i].wID, insertedUnis[i]._id);
    }

    console.log(`📊 Building RankingSystems...`);
    const systemBuckets: Record<string, Record<string, any[]>> = {
        qs: {},
        usnews: {},
        the: {},
        arwu: {}
    };

    const systemNames: Record<string, string> = {
        qs: 'QS World University Rankings',
        usnews: 'U.S. News Best Global Universities',
        the: 'Times Higher Education World University Rankings',
        arwu: 'Academic Ranking of World Universities'
    };

    for (const item of scrapedData) {
        const uniId = uniMapping.get(item.wID);
        if (!uniId) continue;

        for (const [sysSlug, years] of Object.entries(item.rankings)) {
            if (!systemBuckets[sysSlug]) systemBuckets[sysSlug] = {};
            
            for (const [year, rank] of Object.entries(years as Record<string, any>)) {
                if (!systemBuckets[sysSlug][year]) systemBuckets[sysSlug][year] = [];
                if (rank && !isNaN(Number(rank))) {
                    systemBuckets[sysSlug][year].push({
                        rank: Number(rank),
                        uni_id: uniId
                    });
                }
            }
        }
    }

    for (const [sysSlug, generalBuckets] of Object.entries(systemBuckets)) {
        if (Object.keys(generalBuckets).length === 0) continue;
        
        const generalMap = new Map();
        for (const [year, entries] of Object.entries(generalBuckets)) {
            entries.sort((a, b) => a.rank - b.rank);
            generalMap.set(year, entries);
        }

        await RankingSystem.create({
            name: systemNames[sysSlug],
            slug: sysSlug,
            general: generalMap
        });
        console.log(`✅ Created RankingSystem: ${systemNames[sysSlug]}`);
    }

    console.log('🎉 Rebuild complete! Your ranking page is now fully populated.');
    process.exit(0);
}

rebuild().catch(err => {
    console.error('❌ Rebuild failed:', err);
    process.exit(1);
});
