import * as dotenv from 'dotenv';
dotenv.config({ path: 'apps/immigration/.env.local' });

async function run() {
  const dbId = process.env.NOTION_DATABASE_ID_INSIGHTS!;
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    }
  });
  const data = await res.json() as any;
  data.results.forEach((page: any) => {
    const title = page.properties['Name']?.title?.[0]?.plain_text || page.properties['Slug']?.rich_text?.[0]?.plain_text || 'Unknown';
    const ids = page.properties['MongoDB ID']?.multi_select?.map((t: any) => t.name) || [];
    console.log(`Title: ${title} - IDs:`, ids);
  });
}
run();
