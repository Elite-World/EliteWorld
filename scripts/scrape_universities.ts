
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

import { parse } from 'csv-parse/sync';

puppeteer.use(StealthPlugin());

// --- CONFIGURATION ---
const OUTPUT_FILE = path.resolve(__dirname, '../scraped_universities.json');
const LOGO_DIR = path.resolve(__dirname, '../apps/education/public/logos');
const LINKS_FILE = path.resolve(__dirname, '../links.csv');

// Ensure logo directory exists
if (!fs.existsSync(LOGO_DIR)) {
  fs.mkdirSync(LOGO_DIR, { recursive: true });
}

// --- SELECTORS ---
const SEL = {
  NAME: 'h1',
  DESCRIPTION: '#ShortDescription',
  COUNTRY: 'nav#LinkTrail > ul > li:nth-of-type(3) > a',
  LOGO: '.Logo img',
  WEBSITE: 'a.UniversityPageReferralButton',
  
  // Sections
  TOP_REASONS: '#TopReasonsSection',
  ABOUT_ARTICLES: '#About article.ArticleContainer',
  ACCREDITATION: '#Accreditation article.ArticleContainer',
  
  KEY_STATS: '.KeyStatisticItem',
  HIGHLIGHTS_LIFE: '#StudentLife article.ArticleContainer',
  HIGHLIGHTS_SERVICES: '#Services article.ArticleContainer'
};

interface CsvRecord {
  name: string;
  url: string;
  image: string;
}

interface UniversityData {
  name: string;
  sourceUrl: string;
  description: string;
  country: string;
  logoUrl: string;
  websiteUrl: string;
  location: {
    lat: number;
    lng: number;
    coordinates: { label: string; lat: number; lng: number }[];
  };
  details: { label: string; content: string }[];
  stats: { label: string; content: string; type: string }[];
}

async function downloadLogo(url: string, slug: string): Promise<string> {
  if (!url) return '';
  try {
    // Handle query params in URL for filename
    const cleanPath = new URL(url).pathname; 
    let ext = path.extname(cleanPath) || '.jpg';
    if (ext.length > 5) ext = '.jpg'; // Safety check for weird extensions

    const filename = `${slug}${ext}`;
    const filepath = path.join(LOGO_DIR, filename);
    
    // Check if exists to skip
    if (fs.existsSync(filepath)) return filename;

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filename));
      writer.on('error', (err) => {
          // If 404/403, just ignore
          console.error(`   ⚠️ Logo download error: ${err.message}`);
          resolve(''); 
      });
    });
  } catch (e: any) {
    console.error(`   ⚠️ Failed to download logo for ${slug}:`, e.message);
    return '';
  }
}

function slugify(text: string) {
  if (!text) return 'uni-' + Math.random().toString(36).substring(7);
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}

async function scrape() {
  console.log('🚀 Starting University Scraper...');
  
  // 1. Read CSV
  if (!fs.existsSync(LINKS_FILE)) {
      console.error(`❌ Links file not found at: ${LINKS_FILE}`);
      return;
  }
  const fileContent = fs.readFileSync(LINKS_FILE, 'utf-8');
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    bom: true
  });
  
  console.log(`📋 Found ${records.length} universities to scrape.`);

  const browser = await puppeteer.launch({
    headless: true, 
    defaultViewport: { width: 1280, height: 800 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    const results: UniversityData[] = [];
    
    // Load existing results to allow resuming (optional, but good practice)
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf-8'));
            if (Array.isArray(existing)) results.push(...existing);
        } catch (e) {}
    }
    const processedUrls = new Set(results.map(r => r.sourceUrl));

    // 2. Iterate and Scrape
    let index = 0;
    const typedRecords = records as CsvRecord[];

    for (const record of typedRecords) {
      index++;
      const url = record.url;
      const csvName = record.name;
      const csvLogo = record.image;

      if (!url) continue;
      if (processedUrls.has(url)) {
          console.log(`[${index}/${records.length}] ⏭️ Skipping ${csvName} (already scraped)`);
          continue;
      }

      console.log(`\n[${index}/${records.length}] 📄 Scraping: ${csvName}`);
      
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });

        // A. Basic Info
        let name = await page.$eval(SEL.NAME, el => el.textContent?.trim()).catch(() => '');
        if (!name) name = csvName; // Fallback to CSV name

        const slug = slugify(name);
        const description = await page.$eval(SEL.DESCRIPTION, el => el.textContent?.trim()).catch(() => '');
        const country = await page.$eval(SEL.COUNTRY, el => el.textContent?.trim()).catch(() => '');
        const websiteUrl = await page.$eval(SEL.WEBSITE, el => (el as HTMLAnchorElement).href).catch(() => '');
        
        // Logo Download (Prioritize CSV, fallback to Page)
        let logoFilename = '';
        let logoSrc = csvLogo;
        if (!logoSrc) {
             logoSrc = await page.$eval(SEL.LOGO, el => (el as HTMLImageElement).src).catch(() => '');
        }
        
        if (logoSrc) {
           console.log(`   ⬇️ Downloading logo...`);
           logoFilename = await downloadLogo(logoSrc, slug);
        }

        // --- OVERALL DETAILS ---
        const overallDetails: { label: string; content: string }[] = [];

        try {
           const topReasons = await page.$eval(SEL.TOP_REASONS, el => ({
             label: el.querySelector('h3')?.textContent?.trim() || 'Top reasons to study here',
             content: el.querySelector('.TopReasonsList')?.textContent?.trim() || ''
           }));
           if (topReasons.content) overallDetails.push(topReasons);
        } catch (e) {}

        const articleSelectors = [SEL.ABOUT_ARTICLES, SEL.ACCREDITATION];
        for (const sel of articleSelectors) {
             const articles = await page.$$eval(sel, els => els.map(el => ({
                label: el.querySelector('h3')?.textContent?.trim() || '',
                content: el.querySelector('.ArticleSection')?.textContent?.trim() || ''
             })).filter(a => a.label && a.content));
             overallDetails.push(...articles);
        }

        // --- STATS & HIGHLIGHTS ---
        const allStats: { label: string; content: string; type: string }[] = [];

        const keyStats = await page.$$eval(SEL.KEY_STATS, els => els.map(el => ({
           label: el.querySelector('.Label')?.textContent?.trim() || '',
           content: el.querySelector('.Value')?.textContent?.trim() || '',
           type: 'statistic'
        })).filter(s => s.label && s.content));
        allStats.push(...keyStats);

        const highlightSelectors = [SEL.HIGHLIGHTS_LIFE, SEL.HIGHLIGHTS_SERVICES];
        for (const sel of highlightSelectors) {
             const highlights = await page.$$eval(sel, els => els.map(el => ({
                label: el.querySelector('h3')?.textContent?.trim() || '',
                content: el.querySelector('.ArticleSection')?.textContent?.trim() || '',
                type: 'highlight'
             })).filter(h => h.label && h.content));
             allStats.push(...highlights);
        }

        // --- LOCATION ---
        let mainCoords = { lat: 0, lng: 0 };
        const coordsFromSection = await page.$eval('#Location', el => ({
          lat: parseFloat(el.getAttribute('data-lat') || '0'),
          lng: parseFloat(el.getAttribute('data-long') || '0')
        })).catch(() => null);

        if (coordsFromSection) {
            mainCoords = coordsFromSection;
        } else {
             const content = await page.content();
             const latMatch = content.match(/"latitude":\s*([-+]?\d*\.?\d+)/);
             const lngMatch = content.match(/"longitude":\s*([-+]?\d*\.?\d+)/);
             if (latMatch && lngMatch) {
               mainCoords = { lat: parseFloat(latMatch[1]), lng: parseFloat(lngMatch[1]) };
             }
        }

        const coordinates = [];
        if (mainCoords.lat !== 0) {
          coordinates.push({ label: 'Main Campus', lat: mainCoords.lat, lng: mainCoords.lng });
        }
        
        // MIT specific branch fallback (legacy)
        if (name.includes('Massachusetts Institute of Technology')) {
             coordinates.push({ label: 'Kendall Square (Branch)', lat: 42.3625, lng: -71.087 });
        }

        const uniData: UniversityData = {
          name: name || '',
          sourceUrl: url,
          description: description || '',
          country: country || '',
          logoUrl: logoFilename,
          websiteUrl,
          location: {
            lat: mainCoords.lat,
            lng: mainCoords.lng,
            coordinates
          },
          details: overallDetails,
          stats: allStats
        };

        if (uniData.name && !uniData.name.toLowerCase().includes('blocked') && !uniData.name.includes('Attention Required')) {
          results.push(uniData);
          console.log(`   ✅ Scraped: ${uniData.name} (${uniData.country})`);
          
          // Save periodically (every 5) or on every success to avoid data loss
          fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
        } else {
             console.log(`⚠️ Failed to scrape (blocked/error) for ${url}`);
             // Wait longer if blocked
             await new Promise(r => setTimeout(r, 20000 + Math.random() * 10000));
        }

        // Random delay to be polite
        await new Promise(r => setTimeout(r, 3000 + Math.random() * 3000));

      } catch (err: any) {
        console.error(`   ❌ Error scraping ${url}: ${err.message}`);
        // Wait significantly longer on error
        await new Promise(r => setTimeout(r, 30000));
      }
    }

    console.log(`\n🎉 Scraping Complete! Data saved to: ${OUTPUT_FILE}`);
    console.log(`Total Universities Scraped: ${results.length}`);

  } catch (error) {
    console.error('Fatal Scraper Error:', error);
  } finally {
    await browser.close();
  }
}

scrape();

