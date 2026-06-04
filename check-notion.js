const { Client } = require('@notionhq/client');
const notion = new Client({ auth: 'ntn_V88787815245wDv1iRXUIDhzz3Noyxq8fZoLOJadxBX7bo' });
async function check() {
  const db = await notion.databases.retrieve({ database_id: '3752113774548068854cd17238c718b4' });
  console.log(JSON.stringify(db, null, 2));
}
check();
