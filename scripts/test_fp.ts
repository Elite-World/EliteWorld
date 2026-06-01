import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());

async function run() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.forwardpathway.com/worldranking', { waitUntil: 'domcontentloaded' });
  const hist = await page.evaluate(async () => {
      const res = await fetch("https://www.forwardpathway.com/d3v7/dataphp/worldranking/world_ranks4_20251010.php?wID=1107");
      return res.json();
  });
  console.log('MIT ranks:', JSON.stringify(hist.ranks, null, 2));
  await browser.close();
}
run();
