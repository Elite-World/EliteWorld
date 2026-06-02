import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { getRankingList } from '../packages/domain/src/services/ranking-service';

async function run() {
  await dbConnect();
  const res = await getRankingList(2025, 'qs', 'General');
  const stanford = res.find(u => u.id === 'stanford-university');
  console.log('Stanford description:', stanford?.description);
  console.log('Stanford type:', typeof stanford?.description);
  process.exit(0);
}
run();
