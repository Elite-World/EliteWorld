import * as cheerio from 'cheerio';
import fs from 'fs';

const content = fs.readFileSync('imperial_qs.html', 'utf-8');
const $ = cheerio.load(content);

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

console.log('Accommodation:', extractCost('Accommodation'));
console.log('Food:', extractCost('Food'));
console.log('Transport:', extractCost('Transport'));
console.log('Utilities:', extractCost('Utilities'));
console.log('Total students:', extractStat('Total students'));
console.log('International students:', extractStat('International students'));
console.log('Total faculty:', extractStat('Total faculty'));

