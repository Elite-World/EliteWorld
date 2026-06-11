import fetch from 'node-fetch';

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = process.env.NOTION_DATABASE_ID_INSIGHTS || '2cd21137-7454-8005-9cf7-d85dbdb12489';

async function main() {
  const filter = {
    and: [
      {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      {
        property: 'Date',
        date: {
          on_or_before: new Date().toISOString().split('T')[0],
        },
      },
      {
        property: 'Locale',
        select: {
          equals: 'zh',
        },
      },
    ],
  };

  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ filter })
  });
  
  const data = await res.json();
  console.log(`Found ${data.results?.length} articles for zh with exact filter.`);
  
  if (data.results) {
    data.results.forEach(page => {
      const locale = page.properties.Locale?.select?.name || 'NOT_SET';
      const title = page.properties.Name?.title?.[0]?.plain_text || 'No Title';
      console.log(`- [${locale}] ${title}`);
    });
  } else {
    console.log(data);
  }
}

main().catch(console.error);
