import 'dotenv/config';
import { getRankingList } from '../packages/domain/src/services/ranking-service';

async function run() {
  const list = await getRankingList(2025, 'qs', 'General');
  const mit = list.find(u => u.id === 'massachusetts-institute-of-technology');
  console.log('MIT from API:', JSON.stringify(mit, null, 2));
  process.exit(0);
}
run();
