import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'packages/web-shared/src/data/uni-rank.db');

const SOURCE_LABEL_MAP: Record<string, string> = {
  qs: 'QS',
  the: 'THE',
  usnews: 'US News',
  arwu: 'ARWU',
  cwur: 'CWUR',
  guardian: 'Guardian',
  cug: 'CUG',
  niche: 'Niche',
  wrwu: 'WRWU',
  rk: 'SoftScience',
  edur: 'EduRank',
  urap: 'URAP',
  wm: 'Washington Monthly',
  fb: 'Forbes',
  mcl: "Maclean's",
  payscale: 'Payscale',
  tfe: 'TFE Times',
  qantnet: 'QuantNet'
};

function migrate() {
  console.log(`Open DB: ${DB_PATH}`);
  const db = new Database(DB_PATH);

  const updateStmt = db.prepare("UPDATE ranking_lists SET field_rank = ? WHERE source_code = ?");
  
  let count = 0;
  db.transaction(() => {
    for (const [code, label] of Object.entries(SOURCE_LABEL_MAP)) {
      const result = updateStmt.run(label, code);
      count += result.changes;
    }
  })();

  console.log(`Updated ${count} rows with standardized labels.`);
}

migrate();
