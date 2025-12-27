import Database from 'better-sqlite3';
import path from 'path';

const SQLITE_DB_PATH = path.resolve(process.cwd(), 'packages/web-shared/src/data/uni-rank.db');

async function repro() {
  console.log('🔍 Repro Migration Logic for Bangor...');
  const sqlite = new Database(SQLITE_DB_PATH, { readonly: true });
  
  // 1. Fetch ALL raw rankings (Same query as migration)
  const rawRankings = sqlite.prepare(`
    SELECT 
        ri.univ_id,
        ri.rank_display,
        ri.score,
        l.source_code,
        l.year,
        u.name_en
    FROM ranking_items ri
    JOIN ranking_lists l ON ri.list_id = l.lib_id
    JOIN universities u ON ri.univ_id = u.univ_id
    WHERE l.source_code = 'times' AND l.year = 2021 AND u.name_en LIKE 'Bangor%'
  `).all() as any[];

  console.log(`Found ${rawRankings.length} raw rows for Bangor Times 2021.`);

  for (const r of rawRankings) {
      console.log('--- Row ---');
      console.log('Raw Rank Display:', r.rank_display, typeof r.rank_display);

      let rankNum = 999;
      if (typeof r.rank_display === 'number') {
          console.log('Is Number');
          rankNum = r.rank_display;
      }
      else if (r.rank_display) {
          const m = r.rank_display.match(/\d+/);
          console.log('Regex Match:', m);
          if (m) rankNum = parseInt(m[0]);
      }
      
      console.log('Computed RankNum:', rankNum);
  }

  sqlite.close();
}

repro();
