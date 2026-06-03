import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';
import * as cheerio from 'cheerio';

puppeteer.use(StealthPlugin());

async function run() {
  await dbConnect();
  
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  const unisToFix = [
    { name: /Imperial College London/i, url: 'https://www.topuniversities.com/universities/imperial-college-london' },
    { name: /University of Oxford/i, url: 'https://www.topuniversities.com/universities/university-oxford' }
  ];

  for (const t of unisToFix) {
    const uni = await University.findOne({ 'name.en': t.name });
    if (!uni) continue;
    
    await page.goto(t.url, { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 5000));
    const content = await page.content();
    const $ = cheerio.load(content);
    
    const stats: any[] = [];
    
    const extractCost = (keyword: string) => {
      let val = '';
      $(`h1, h2, h3, h4, h5, h6, label, span, div`).each((_, el) => {
        if ($(el).children('div, section, article').length > 0) return;
        const text = $(el).text().trim();
        if (text.toLowerCase() === keyword.toLowerCase()) {
          const match = $(el).parent().text().match(/[\$£€¥]\d+(?:,\d+)*(?:\.\d+)?/);
          if (match && !val) val = match[0];
        }
      });
      return val;
    };

    ['Accommodation', 'Food', 'Transport', 'Utilities'].forEach(k => {
      const v = extractCost(k);
      if (v) stats.push({ label: k, content: v, type: 'statistic' });
    });

    const extractStat = (keyword: string) => {
      let val = '';
      $(`label, h1, h2, h3, h4, h5, h6, span, div`).each((_, el) => {
        if ($(el).children('div, section, article').length > 0) return;
        const text = $(el).text().trim();
        if (text.toLowerCase() === keyword.toLowerCase() || text.toLowerCase() === keyword.toLowerCase() + ' staff') {
          const nextEl = $(el).next();
          if (nextEl.length > 0) {
            const numStr = nextEl.text().replace(/[^0-9,]/g, '');
            if (numStr) val = numStr;
          }
          if (!val) {
            const numStr = $(el).parent().text().replace(/[^0-9,]/g, '');
            if (numStr && numStr.length < 15) val = numStr;
          }
        }
      });
      return val;
    };

    ['Total students', 'International students', 'Total faculty'].forEach(k => {
      const v = extractStat(k);
      const lbl = k === 'Total faculty' ? 'Total Faculty Staff' : (k.charAt(0).toUpperCase() + k.slice(1));
      if (v) stats.push({ label: lbl, content: v, type: 'statistic' });
    });

    if (!uni.details) uni.details = { overall: [], stat: [] };
    if (!uni.details.stat) uni.details.stat = [];
    uni.details.stat = stats;
    await uni.save();
    console.log(`Saved ${stats.length} stats for ${uni.name.en}`);
  }
  
  await browser.close();
  process.exit(0);
}
run();
