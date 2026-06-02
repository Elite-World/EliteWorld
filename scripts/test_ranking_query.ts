import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University, RankingSystem } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    
    console.time("Fetch System");
    const system = await RankingSystem.findOne({ slug: 'qs' }).lean() as any;
    console.timeEnd("Fetch System");
    
    const entries = system.general['2025'] || [];
    const uniIds = entries.map((e: any) => e.uni_id);
    console.log(`Found ${uniIds.length} university IDs`);
    
    console.time("Fetch Universities");
    const universities = await University.find({ _id: { $in: uniIds } }, 'slug name location assets description details')
      .lean();
    console.timeEnd("Fetch Universities");
    
    process.exit(0);
}
run();
