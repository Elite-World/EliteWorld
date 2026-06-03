import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.topuniversities.com/universities/massachusetts-institute-technology-mit', { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  console.log("Title:", title);
  
  const stats = await page.$$eval('.key-stats-item, .KeyStatisticItem, .stat-item, .info-stat', els => els.map(e => e.textContent?.trim()));
  console.log("Stats found:", stats);
  
  // also check NEXT_DATA
  const nextData = await page.$eval('#__NEXT_DATA__', el => el.textContent).catch(() => 'No NEXT_DATA');
  console.log("Next Data length:", nextData.length);
  
  await browser.close();
}
run();
