import dbConnect from '../packages/web-shared/src/lib/mongoose';
import { University, RankingSystem } from '../packages/web-shared/src/data/models';

async function checkBangor() {
  await dbConnect();
  
  // 1. Get Bangor ID
  const bangor = await University.findOne({ slug: 'bangor-university' });
  if (!bangor) {
      console.log('Bangor not found');
      return;
  }
  console.log('Bangor ID:', bangor._id);

  // 2. Check Times Bucket
  const times = await RankingSystem.findOne({ slug: 'times' }).lean();
  // @ts-ignore
  const entries = times.data['2021'];
  
  // @ts-ignore
  const entry = entries.find(e => e.uni_id.toString() === bangor._id.toString());
  console.log('Times 2021 Entry for Bangor:', entry);

  process.exit(0);
}

checkBangor();
