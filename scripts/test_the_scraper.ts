import puppeteer from 'puppeteer';

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.goto('https://www.timeshighereducation.com/world-university-rankings/massachusetts-institute-technology', { waitUntil: 'domcontentloaded' });
  const title = await page.title();
  console.log("Title:", title);
  
  const content = await page.content();
  const studentsMatch = content.match(/number of students/i);
  console.log("Found students?", !!studentsMatch);
  
  await browser.close();
}
run();
