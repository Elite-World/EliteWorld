import Database from 'better-sqlite3';
import path from 'path';

const SQLITE_DB_PATH = path.resolve(process.cwd(), 'packages/web-shared/src/data/uni-rank.db');

function debugSqlite() {
  console.log('📂 Inspecting SQLite:', SQLITE_DB_PATH);
  const sqlite = new Database(SQLITE_DB_PATH, { readonly: true });
  
  // Get List ID for Times 2021
  const list = sqlite.prepare("SELECT lib_id FROM ranking_lists WHERE source_code = 'times' AND year = 2021").get() as any;
  if (!list) {
      console.log('No Times 2021 list found');
      return;
  }
  
  console.log('List ID:', list.lib_id);
  
  // Get items
  // Check Bangor
  const bangor = sqlite.prepare(`
      SELECT ri.rank_display, ri.score, u.name_en 
      FROM ranking_items ri
      JOIN universities u ON ri.univ_id = u.univ_id
      WHERE ri.list_id = ? AND u.name_en LIKE 'Bangor%'
  `).all(list.lib_id);

  console.log('--- Bangor University (Times 2021) ---');
  console.log(bangor);
  
  sqlite.close();
}

debugSqlite();
