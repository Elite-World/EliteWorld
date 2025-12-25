import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'packages/web-shared/src/data/uni-rank.db');
const LOGO_MAP_PATH = path.join(process.cwd(), 'apps/education/src/data/logo-map.json');

// --- Fuzzy Match Logic (Copied from logo-utils) ---
function levenshteinDistance(a: string, b: string): number {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

function getBestMatch(name: string, logoFiles: string[]): string | null {
  if (!name) return null;
  const normalizedTarget = normalize(name);

  // Exact match
  const exactMatch = logoFiles.find(filename => {
    const cleanFilename = normalize(filename.replace(/\.png$/i, ''));
    return cleanFilename === normalizedTarget;
  });
  if (exactMatch) return exactMatch;

  // Fuzzy match
  let bestMatch = null;
  let minDistance = Infinity;
  const threshold = 5;

  for (const filename of logoFiles) {
    const cleanName = filename.replace(/\.png$/i, '');
    if (cleanName.includes(name) || name.includes(cleanName)) return filename; // Strong inclusion match

    const dist = levenshteinDistance(normalizedTarget, normalize(cleanName));
    if (dist < minDistance && dist <= threshold) {
      minDistance = dist;
      bestMatch = filename;
    }
  }
  return bestMatch;
}
// ------------------------------------------------

function migrate() {
  console.log(`Open DB: ${DB_PATH}`);
  const db = new Database(DB_PATH);

  // 1. Add Columns
  try {
    db.prepare("ALTER TABLE universities ADD COLUMN logo_file TEXT").run();
    console.log("Added column: logo_file");
  } catch (e: any) {
    if (!e.message.includes('duplicate column')) throw e;
    console.log("Column logo_file already exists.");
  }

  try {
    db.prepare("ALTER TABLE universities ADD COLUMN website_url TEXT").run();
    console.log("Added column: website_url");
  } catch (e: any) {
     if (!e.message.includes('duplicate column')) throw e;
    console.log("Column website_url already exists.");
  }

  // 2. Load Data
  const universities = db.prepare("SELECT univ_id, name_en, name_cn FROM universities").all() as any[];
  const logoFiles = JSON.parse(fs.readFileSync(LOGO_MAP_PATH, 'utf-8')) as string[];

  console.log(`Found ${universities.length} universities and ${logoFiles.length} logos.`);

  // 3. Match and Update
  const updateStmt = db.prepare("UPDATE universities SET logo_file = ? WHERE univ_id = ?");
  let matchCount = 0;

  db.transaction(() => {
    for (const uni of universities) {
      // Try matching using English name first, then Chinese (unlikely for files, but safe fallback logic if we had map)
      // Actually strictly rely on name_en for now as our logos are english
      if (!uni.name_en) continue;

      const matchedLogo = getBestMatch(uni.name_en, logoFiles);
      
      if (matchedLogo) {
        updateStmt.run(matchedLogo, uni.univ_id);
        matchCount++;
      }
    }
  })()

  console.log(`Migration Complete. Matched and updated ${matchCount} universities.`);
}

migrate();
