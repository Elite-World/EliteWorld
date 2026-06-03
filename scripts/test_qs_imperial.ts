import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  console.log('Navigating to Imperial College London QS...');
  await page.goto('https://www.topuniversities.com/universities/imperial-college-london', { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  await new Promise(r => setTimeout(r, 5000));
  
  const content = await page.content();
  fs.writeFileSync('imperial_qs.html', content);
  console.log('Saved imperial_qs.html');
  await browser.close();
}
run();
