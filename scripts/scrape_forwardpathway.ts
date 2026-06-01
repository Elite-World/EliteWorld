import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import * as fs from 'fs';
import * as path from 'path';

puppeteer.use(StealthPlugin());

const DATA_FILE = path.join(__dirname, '../forwardpathway_data.json');

async function scrape() {
  console.log('🚀 Starting Forward Pathway API Scraper (Fast Fetch Mode)...');
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  let ajaxBody = '';
  page.on('request', req => {
      if (req.url().includes('admin-ajax.php')) {
          ajaxBody = req.postData() || '';
      }
  });

  console.log('Navigating to worldranking page to bypass Cloudflare and capture API tokens...');
  await page.goto('https://www.forwardpathway.com/worldranking', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('table tbody tr', { timeout: 60000 });
  
  if (!ajaxBody) {
      console.error('❌ Failed to capture AJAX body!');
      await browser.close();
      process.exit(1);
  }

  console.log('✅ Intercepted WPDataTables nonce. Fetching ALL 3600+ universities directly from API...');
  
  // Fetch ALL university rows
  const allData = await page.evaluate(async (body) => {
      const newBody = body.replace(/length=\d+/, 'length=-1');
      const res = await fetch("https://www.forwardpathway.com/wp-admin/admin-ajax.php?action=get_wdtable&table_id=50", {
         method: "POST",
         headers: { "content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
         body: newBody
      });
      return res.json();
  }, ajaxBody);
  
  const total = allData.data.length;
  console.log(`📋 Fetched ${total} universities from the main table.`);
  
  const scrapedData = [];
  
  // Prepare a list of targets
  const targets = [];
  for (const row of allData.data) {
      // row[0] is cn_name, row[1] is en_name, row[7] is button html
      const cnMatch = row[0].match(/>(.*?)<\/a>/);
      const name_cn = cnMatch ? cnMatch[1] : row[0];
      
      const enMatch = row[1].match(/>(.*?)<\/a>/);
      const name_en = enMatch ? enMatch[1] : row[1];
      
      const widMatch = row[7].match(/worldranks4\((\d+)\)/);
      if (widMatch && widMatch[1]) {
          targets.push({
              name_cn: name_cn.replace(/&amp;/g, '&').replace(/^\u200b/, '').trim(),
              name_en: name_en.replace(/&amp;/g, '&').replace(/^\u200b/, '').trim(),
              wID: widMatch[1]
          });
      }
  }

  console.log(`🔍 Extracted ${targets.length} valid wIDs. Beginning parallel historical data fetching...`);
  
  // Process in chunks to avoid overwhelming the server
  const chunkSize = 20;
  for (let i = 0; i < targets.length; i += chunkSize) {
      const chunk = targets.slice(i, i + chunkSize);
      process.stdout.write(`Fetching chunk ${i / chunkSize + 1}/${Math.ceil(targets.length / chunkSize)}... `);
      
      // Fetch historical data for this chunk in parallel inside the browser
      const chunkResults = await page.evaluate(async (wIDs) => {
          const results = [];
          for (const id of wIDs) {
              try {
                  const res = await fetch(`https://www.forwardpathway.com/d3v7/dataphp/worldranking/world_ranks4_20251010.php?wID=${id}`);
                  const json = await res.json();
                  results.push({ wID: id, ranks: json.ranks || {} });
              } catch(e) {
                  results.push({ wID: id, error: true });
              }
          }
          return results;
      }, chunk.map(t => t.wID));
      
      let successCount = 0;
      for (const result of chunkResults) {
          if (!result.error) {
              const target = chunk.find(t => t.wID === result.wID);
              if (target) {
                  // Format the ranks array from the API into the object our DB script expects
                  const formattedRanks: Record<string, Record<string, number>> = {};
                  if (Array.isArray(result.ranks)) {
                      for (const sys of result.ranks) {
                          const sysSlug = sys.type.toLowerCase();
                          formattedRanks[sysSlug] = {};
                          for (const item of sys.data) {
                              formattedRanks[sysSlug][item.year.toString()] = item.rank;
                          }
                      }
                  }

                  scrapedData.push({
                      wID: target.wID,
                      name_cn: target.name_cn,
                      name_en: target.name_en,
                      rankings: {
                          qs: formattedRanks.qs || {},
                          usnews: formattedRanks.usnews || {},
                          the: formattedRanks.the || {},
                          arwu: formattedRanks.arwu || {}
                      }
                  });
                  successCount++;
              }
          }
      }
      console.log(`✅ Success: ${successCount}/${chunk.length}`);
  }

  console.log(`🎉 Scraping finished! Successfully captured ${scrapedData.length} universities with full historical data.`);
  fs.writeFileSync(DATA_FILE, JSON.stringify(scrapedData, null, 2));
  console.log(`💾 Saved to ${DATA_FILE}`);

  await browser.close();
}

scrape().catch(console.error);
