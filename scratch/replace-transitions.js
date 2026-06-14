const fs = require('fs');
const path = require('path');

const targetStr = 'transition-all';
const replacementStr = 'transition-transform transition-opacity transition-colors';

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (['node_modules', '.next', '.git', 'dist', 'build', '.turbo'].includes(file)) continue;
      walk(fullPath);
    } else {
      if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes(targetStr)) {
          // Replace all occurrences
          const newContent = content.split(targetStr).join(replacementStr);
          fs.writeFileSync(fullPath, newContent, 'utf8');
          console.log(`Updated ${fullPath}`);
        }
      }
    }
  }
}

walk('/Users/bjtiew/Documents/GitHub/EliteWorld/apps');
walk('/Users/bjtiew/Documents/GitHub/EliteWorld/packages');
console.log('Mass replacement complete!');
