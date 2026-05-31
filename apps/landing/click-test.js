const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  
  // Try to click the search button
  console.log("Trying to click search button...");
  const searchBtn = await page.$('button[aria-label="Registry Search"], button:has(svg.lucide-search)');
  if (searchBtn) {
    const box = await searchBtn.boundingBox();
    console.log("Search button bounding box:", box);
    try {
      await searchBtn.click();
      console.log("Clicked successfully!");
      await page.waitForTimeout(500); // Wait for modal
      const modal = await page.$('input[placeholder*="Search"]');
      if (modal) {
        console.log("Modal opened successfully!");
      } else {
        console.log("Modal did not open.");
      }
    } catch(e) {
      console.log("Click failed:", e.message);
    }
  } else {
    console.log("Search button not found.");
  }

  // Check scroll
  console.log("Scrolling down...");
  await page.evaluate(() => window.scrollBy(0, 500));
  await page.waitForTimeout(500);
  const navbarClasses = await page.evaluate(() => {
    const nav = document.querySelector('nav');
    return nav ? nav.className : 'no nav found';
  });
  console.log("Navbar classes after scroll:", navbarClasses);

  await browser.close();
})();
