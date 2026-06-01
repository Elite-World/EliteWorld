import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

async function run() {
    console.log('🚀 Launching Puppeteer to inspect ForwardPathway detail page...');
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    // Log all XHR/Fetch requests to see where the data comes from
    const apiCalls: string[] = [];
    page.on('request', req => {
        if (req.resourceType() === 'xhr' || req.resourceType() === 'fetch') {
            apiCalls.push(req.url());
        }
    });

    await page.goto('https://www.forwardpathway.com/8484', { waitUntil: 'networkidle2', timeout: 60000 });
    
    // Take a screenshot for context
    await page.screenshot({ path: 'fp_detail.png', fullPage: true });
    
    // Get the HTML content
    const html = await page.content();
    fs.writeFileSync('fp_detail.html', html);
    fs.writeFileSync('fp_api_calls.json', JSON.stringify(apiCalls, null, 2));

    // Try to extract some data structures or JSON blobs embedded in the page
    const embeddedData = await page.evaluate(() => {
        // Many WordPress sites use localized scripts or inline JSON.
        // Let's look for script tags that contain "echarts" or data objects.
        const scripts = Array.from(document.querySelectorAll('script'));
        return scripts
            .map(s => s.innerHTML)
            .filter(text => text.includes('var') || text.includes('const') || text.includes('let'))
            .filter(text => text.includes('data') || text.includes('chart') || text.includes('series'))
            .join('\n\n=====\n\n');
    });
    fs.writeFileSync('fp_embedded_scripts.js', embeddedData);

    console.log('✅ Done! Check fp_detail.png, fp_detail.html, fp_api_calls.json, and fp_embedded_scripts.js');
    await browser.close();
    process.exit(0);
}

run().catch(err => {
    console.error(err);
    process.exit(1);
});
