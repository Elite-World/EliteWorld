import Database from 'better-sqlite3';
import path from 'path';

const SQLITE_DB_PATH = path.resolve(process.cwd(), 'packages/web-shared/src/data/uni-rank.db');

function inspectSchema() {
  const sqlite = new Database(SQLITE_DB_PATH, { readonly: true });
  const row = sqlite.prepare("SELECT * FROM ranking_lists LIMIT 1").get();
  console.log('--- Ranking List Columns ---');
  console.log(Object.keys(row as object));
  
  // Check values
  const lists = sqlite.prepare("SELECT lib_id, rank_type, original_category, field_broad FROM ranking_lists WHERE source_code = 'times' AND year = 2021 LIMIT 20").all();
  console.log('--- Times 2021 Lists ---');
  console.log(lists);
  
  sqlite.close();
}

inspectSchema();
