import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University, RankingSystem } from '../packages/domain/src/data/models';

async function check() {
  await dbConnect();
  const unis = await University.countDocuments();
  const systems = await RankingSystem.find();
  console.log(`Universities: ${unis}`);
  for (const sys of systems) {
     console.log(`RankingSystem: ${sys.name} (slug: ${sys.slug})`);
     console.log(`- Years available:`, sys.general ? Array.from(sys.general.keys()).join(', ') : 'None');
  }
  process.exit(0);
}
check();
