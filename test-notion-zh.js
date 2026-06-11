import fetch from 'node-fetch';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID_INSIGHTS || '2cd21137-7454-8005-9cf7-d85dbdb12489';

async function main() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: {
        property: 'Locale',
        select: {
          equals: 'zh',
        },
      }
    })
  });
  
  const data = await res.json();
  console.log(`Found ${data.results?.length} articles for zh.`);
  
  if (data.results) {
    data.results.forEach(page => {
      const locale = page.properties.Locale?.select?.name || 'NOT_SET';
      const title = page.properties.Name?.title?.[0]?.plain_text || 'No Title';
      const status = page.properties.Status?.select?.name || 'NOT_SET';
      const date = page.properties.Date?.date?.start || 'NOT_SET';
      console.log(`- [${locale}] [${status}] [${date}] ${title}`);
    });
  } else {
    console.log(data);
  }
}

main().catch(console.error);
