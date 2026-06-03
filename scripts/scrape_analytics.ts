import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import axios from 'axios';
import mongoose from 'mongoose';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';
import * as cheerio from 'cheerio';

puppeteer.use(StealthPlugin());

const QS_RANKING_URL = 'https://www.topuniversities.com/sites/default/files/qs-rankings-data/en/397863.txt';
const MAX_UNIVERSITIES = 500;

function slugify(text: string) {
  if (!text) return '';
  return text.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function extractQSStats(page: any, url: string) {
  const stats: any[] = [];
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    // Cloudflare check
    try {
      await page.waitForFunction(() => {
        return !document.title.includes('Just a moment') && 
               !document.title.includes('Attention Required');
      }, { timeout: 30000 });
    } catch (e) {
      console.log(`⏳ Waiting longer for Cloudflare on ${url}...`);
      await page.waitForFunction(() => {
        return !document.title.includes('Just a moment');
      }, { timeout: 60000 }).catch(() => console.log('Timeout waiting for Cloudflare.'));
    }

    const content = await page.content();
    const $ = cheerio.load(content);

    // Extract Cost of Living
    // QS usually has elements with text like 'Accommodation', 'Food', 'Transport'
    const extractCost = (keyword: string) => {
      let val = '';
      $(`h1, h2, h3, h4, h5, h6, label, span, div`).each((_, el) => {
        // Only process elements with no block children to avoid grabbing the whole page
        if ($(el).children('div, section, article').length > 0) return;
        
        const text = $(el).text().trim();
        if (text.toLowerCase() === keyword.toLowerCase()) {
          const parentText = $(el).parent().text();
          const match = parentText.match(/[\$£€¥]\d+(?:,\d+)*(?:\.\d+)?/);
          if (match && !val) val = match[0];
        }
      });
      return val;
    };

    const accommodation = extractCost('Accommodation');
    const food = extractCost('Food');
    const transport = extractCost('Transport');
    const utilities = extractCost('Utilities');

    if (accommodation) stats.push({ label: 'Accommodation', content: accommodation, type: 'statistic' });
    if (food) stats.push({ label: 'Food', content: food, type: 'statistic' });
    if (transport) stats.push({ label: 'Transport', content: transport, type: 'statistic' });
    if (utilities) stats.push({ label: 'Utilities', content: utilities, type: 'statistic' });

    // Extract Total Students / Faculty
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
            const parent = $(el).parent();
            const numStr = parent.text().replace(/[^0-9,]/g, '');
            if (numStr && numStr.length < 15) val = numStr;
          }
        }
      });
      return val;
    };

    const totalStudents = extractStat('Total students');
    const intlStudents = extractStat('International students');
    const totalFaculty = extractStat('Total faculty');

    if (totalStudents) stats.push({ label: 'Total Students', content: totalStudents, type: 'statistic' });
    if (intlStudents) stats.push({ label: 'International Students', content: intlStudents, type: 'statistic' });
    if (totalFaculty) stats.push({ label: 'Total Faculty Staff', content: totalFaculty, type: 'statistic' });

  } catch (error: any) {
    console.error(`❌ Error scraping ${url}:`, error.message);
  }
  
  return stats;
}

async function run() {
  await dbConnect();
  console.log('✅ Connected to MongoDB');

  console.log(`🌐 Fetching QS Universities...`);
  const response = await axios.get(QS_RANKING_URL);
  
  const TARGET_COUNTRIES = [
    'United Kingdom', 'Singapore', 
    'Hong Kong SAR', 'Hong Kong', 'New Zealand', 
    'Australia', 'Canada', 'Malaysia'
  ];

  const filteredData = response.data.data.filter((item: any, index: number) => {
    if (item.country === 'United States') return false; // Skip US entirely
    
    const isTop100 = index < 100; // Array is already sorted by rank
    const isTargetCountry = TARGET_COUNTRIES.includes(item.country);
    return isTop100 || isTargetCountry;
  });
  
  console.log(`✅ Loaded ${filteredData.length} universities to scrape (Filtered by Top 100 + Target Countries).`);

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  for (let i = 0; i < filteredData.length; i++) {
    const item = filteredData[i];
    const rawName = item.title.match(/>([^<]+)</)?.[1]?.trim() || item.title;
    const cleanName = rawName.replace(/\s*\(.*?\)\s*/g, ''); // Remove (MIT) etc
    const urlSlug = item.title.match(/href="([^"]+)"/)?.[1] || '';
    const qsId = item.core_id || item.nid;
    
    if (!urlSlug) continue;
    const fullUrl = `https://www.topuniversities.com${urlSlug}`;
    
    console.log(`\n[${i+1}/${MAX_UNIVERSITIES}] 🔍 Scraping: ${cleanName}`);
    
    // Fuzzy match DB
    const dbQuery = { $or: [
      { 'name.en': { $regex: new RegExp(`^${cleanName}$`, 'i') } },
      { slug: slugify(cleanName) }
    ]};
    
    let uni = await University.findOne(dbQuery);
    if (!uni) {
       console.log(`   ⚠️ Could not match ${cleanName} in our database. Skipping.`);
       continue;
    }

    console.log(`   🔗 Found DB match: ${uni.name.en} (ID: ${uni._id})`);

    // Scrape stats
    const stats = await extractQSStats(page, fullUrl);
    
    if (stats.length > 0) {
      console.log(`   📈 Found ${stats.length} stats.`);
      
      // Update MongoDB
      if (!uni.details) uni.details = { overall: [], stat: [] };
      if (!uni.details.stat) uni.details.stat = [];
      
      const mergedStats = [...uni.details.stat];
      for (const newStat of stats) {
        // avoid duplicates
        const exists = mergedStats.find((s: any) => s.label === newStat.label);
        if (!exists) mergedStats.push(newStat);
      }
      
      uni.details.stat = mergedStats;
      // Store QS ID in rich_data to prevent future fuzzy matching needs
      if (!uni.rich_data) uni.rich_data = {};
      uni.rich_data.qs_id = qsId;
      
      await uni.save();
      console.log(`   ✅ Saved to MongoDB.`);
    } else {
      console.log(`   ⚠️ No stats extracted.`);
    }

    // Delay 3-5 seconds
    const delay = Math.floor(Math.random() * 2000) + 3000;
    await new Promise(r => setTimeout(r, delay));
  }

  await browser.close();
  console.log('\n🎉 Finished scraping QS analytics for Top 500.');
  process.exit(0);
}

run();
