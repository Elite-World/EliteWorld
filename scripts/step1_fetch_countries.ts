import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

async function run() {
    console.log('🚀 Launching Puppeteer...');
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
    console.log(`📋 Fetched ${allData.data.length} rows.`);

    const mappings = [];
    for (const row of allData.data) {
        const enMatch = row[1].match(/>(.*?)<\/a>/);
        const name_en = enMatch ? enMatch[1] : row[1];
        const clean_name_en = name_en.replace(/&amp;/g, '&').replace(/^\u200b/, '').trim();
        const country_cn = row[2] || 'Unknown';
        
        mappings.push({ name_en: clean_name_en, country_cn });
    }

    fs.writeFileSync('countries_data.json', JSON.stringify(mappings, null, 2));
    console.log('💾 Saved countries_data.json');
    process.exit(0);
}
run();
