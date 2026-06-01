import 'dotenv/config';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

puppeteer.use(StealthPlugin());

const ENDPOINTS = [
    { key: 'overview', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/overview_all_20230920.php?name=${id}` },
    { key: 'crime_yearly', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/crime_yearly_20240324.php?name=${id}` },
    { key: 'degree', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/degree_all_20240821.php?name=${id}` },
    { key: 'ranking_admin', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/ranking_admin_20250923.php?name=${id}` },
    { key: 'score10', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/score10_20231213.php?name=${id}` },
    { key: 'student_comp', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/student_comp_20240118.php?name=${id}` },
    { key: 'age_mf', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/age_mf_20240118.php?name=${id}` },
    { key: 'international_students', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/international_students_20240118.php?name=${id}` },
    { key: 'school_nearby', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/school_nearby_20230920.php?name=${id}` },
    { key: 'student_all', url: (id: string) => `https://www.forwardpathway.com/d3v7/dataphp/school_database/student_all_20230920.php?name=${id}` },
];

async function run() {
    console.log('🚀 Connecting to MongoDB...');
    await dbConnect();

    // Fetch all universities that have an fp_id
    const universities = await University.find({ 
        fp_id: { $exists: true, $ne: '' }
    });
    
    console.log(`📋 Found ${universities.length} universities to scrape.`);

    if (universities.length === 0) {
        process.exit(0);
    }

    console.log('🌐 Launching Puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Setup session by navigating to a safe page first
    console.log('🔐 Navigating to establish Cloudflare session...');
    await page.goto('https://www.forwardpathway.com/worldranking', { waitUntil: 'domcontentloaded' });
    // Wait a bit just in case CF challenge appears
    await new Promise(r => setTimeout(r, 5000));

    let successCount = 0;
    
    for (const uni of universities) {
        const fp_id = uni.fp_id as string;
        console.log(`\n⏳ Scraping ${uni.name.en} (fp_id: ${fp_id})...`);
        
        try {
            // We evaluate all fetches in parallel inside the browser page context
            const scrapedData = await page.evaluate(async (id, endpoints) => {
                const results: any = {};
                
                const fetchPromises = endpoints.map(async (ep: any) => {
                    try {
                        const res = await fetch(ep.url);
                        const data = await res.json();
                        results[ep.key] = data;
                    } catch (e) {
                        results[ep.key] = null;
                        console.error(`Error fetching ${ep.key} for ${id}:`, e);
                    }
                });

                await Promise.all(fetchPromises);
                return results;
            }, fp_id, ENDPOINTS.map(ep => ({ key: ep.key, url: ep.url(fp_id) })));

            // Extract the crime overview from overview_all to maintain compatibility if UI expects it
            const crimeOverview = scrapedData.overview?.crime;

            // Merge into rich_data
            uni.rich_data = {
                ...(uni.rich_data || {}),
                crime: crimeOverview || (uni.rich_data?.crime), // Keep existing if null
                historical_crime: scrapedData.crime_yearly,
                degree: scrapedData.degree,
                ranking_admin: scrapedData.ranking_admin,
                score10: scrapedData.score10,
                student_comp: scrapedData.student_comp,
                age_mf: scrapedData.age_mf,
                international_students: scrapedData.international_students,
                school_nearby: scrapedData.school_nearby,
                student_all: scrapedData.student_all,
            };

            uni.markModified('rich_data');
            await uni.save();
            
            console.log(`✅ Successfully updated MongoDB for ${uni.name.en}`);
            successCount++;

            // Wait 1-2 seconds between universities to avoid rate limiting
            await new Promise(r => setTimeout(r, 1500));
            
        } catch (error) {
            console.error(`❌ Failed to scrape ${uni.name.en}:`, error);
        }
    }

    console.log(`\n🎉 Finished scraping! Successfully updated ${successCount}/${universities.length} universities.`);
    await browser.close();
    process.exit(0);
}

run().catch(err => {
    console.error('Fatal Error:', err);
    process.exit(1);
});
