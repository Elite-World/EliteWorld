import dbConnect from '../packages/web-shared/src/lib/mongoose';
import { RankingSystem } from '../packages/web-shared/src/data/models';

async function debugTimes() {
  await dbConnect();
  
  const sys = await RankingSystem.findOne({ slug: 'times' }).lean();
  if (!sys || !sys.data) {
      console.log('No Times data found');
      return;
  }

  // @ts-ignore
  const entries = sys.data['2021'];
  if (!entries) {
      console.log('No 2021 entries for Times');
      return;
  }

  console.log(`Times 2021: ${entries.length} entries`);
  
  // Show first 10 entries sorted by rank
  const sorted = entries.sort((a: any, b: any) => a.rank - b.rank).slice(0, 20);
  console.log('Top 20 Entries:', JSON.stringify(sorted, null, 2));

  // Count how many have rank 1
  const rank1s = entries.filter((e: any) => e.rank === 1).length;
  console.log(`Total entries with Rank 1: ${rank1s}`);

  process.exit(0);
}

debugTimes();
