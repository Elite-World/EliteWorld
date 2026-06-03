import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';
puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.topuniversities.com/universities/massachusetts-institute-technology-mit', { waitUntil: 'networkidle2' });
  const content = await page.content();
  fs.writeFileSync('qs_mit.html', content);
  await browser.close();
}
run();
