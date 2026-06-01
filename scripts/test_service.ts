import 'dotenv/config';
import { getRankingList } from '../packages/domain/src/services/ranking-service';

async function run() {
   const ranks = await getRankingList(2025, 'qs', 'General');
   console.log('Top 3 for 2025 QS:');
   console.log(ranks.slice(0,3).map(r => `${r.rank}: ${r.nameEn} (ID: ${r.id})`));
   process.exit(0);
}
run();
