const fs = require('fs');
const recordMap = JSON.parse(fs.readFileSync('recordMap.json', 'utf8'));

for (const key in recordMap.block) {
  const block = recordMap.block[key];
  if (block.value && block.value.id) {
    console.log(key, 'has id on block.value');
  } else if (block.value && block.value.value && block.value.value.id) {
    console.log(key, 'has id on block.value.value');
  } else {
    console.log(key, 'no id anywhere');
  }
}
