const { NotionAPI } = require('notion-client');

async function run() {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage('2cc21137-7454-808f-a342-c66385a4a97d');
  console.log(JSON.stringify(recordMap, null, 2));
}
run();
