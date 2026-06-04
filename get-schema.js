const { Client } = require('@notionhq/client');
const notion = new Client({ 
  auth: 'ntn_V88787815245wDv1iRXUIDhzz3Noyxq8fZoLOJadxBX7bo',
  notionVersion: '2022-06-28' 
});
async function run() {
  const db = await notion.databases.retrieve({ database_id: '3752113774548068854cd17238c718b4' });
  console.log(JSON.stringify(db.properties, null, 2));
}
run();
