import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { RankingSystem } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    
    console.time("Fetch System No Projection");
    await RankingSystem.findOne({ slug: 'qs' }).lean();
    console.timeEnd("Fetch System No Projection");
    
    console.time("Fetch System With Projection");
    await RankingSystem.findOne({ slug: 'qs' }, { 'general.2025': 1, slug: 1 }).lean();
    console.timeEnd("Fetch System With Projection");
    
    process.exit(0);
}
run();
