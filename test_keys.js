const fs = require('fs');
const recordMap = JSON.parse(fs.readFileSync('recordMap.json', 'utf8'));

for (const key in recordMap.block) {
  const block = recordMap.block[key];
  console.log(key, Object.keys(block.value || {}));
}
