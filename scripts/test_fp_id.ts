import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let ajaxBody = '';
    page.on('request', req => {
        if (req.url().includes('admin-ajax.php')) ajaxBody = req.postData() || '';
    });
    await page.goto('https://www.forwardpathway.com/worldranking', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('table tbody tr', { timeout: 60000 });
    
    const allData = await page.evaluate(async (body) => {
        const res = await fetch("https://www.forwardpathway.com/wp-admin/admin-ajax.php?action=get_wdtable&table_id=50", {
           method: "POST",
           headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
           body: body.replace(/length=\d+/, 'length=20') // Just get top 20
        });
        return res.json();
    }, ajaxBody);
    
    for (const row of allData.data) {
        console.log(row[1]); // This should print the a tag
    }
    
    await browser.close();
    process.exit(0);
}
run();
