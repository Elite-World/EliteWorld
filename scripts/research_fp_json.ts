import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

async function run() {
    console.log('🚀 Fetching overview API from ForwardPathway...');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    // Go to the main page first to pass CF challenge
    await page.goto('https://www.forwardpathway.com/8484', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Then fetch the JSON using evaluate
    const data = await page.evaluate(async () => {
        const res = await fetch('https://www.forwardpathway.com/d3v7/dataphp/school_database/overview_all_20230920.php?name=8484');
        return res.json();
    });
    
    fs.writeFileSync('fp_overview_8484.json', JSON.stringify(data, null, 2));
    console.log('✅ Done! Check fp_overview_8484.json');
    await browser.close();
    process.exit(0);
}
run();
