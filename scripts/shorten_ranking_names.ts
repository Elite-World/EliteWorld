import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { RankingSystem } from '../packages/domain/src/data/models';

async function update() {
    await dbConnect();
    
    const updates = [
        { slug: 'qs', name: 'QS Ranking' },
        { slug: 'usnews', name: 'U.S. News' },
        { slug: 'the', name: 'THE Ranking' },
        { slug: 'arwu', name: 'ARWU (Shanghai)' }
    ];

    for (const sys of updates) {
        await RankingSystem.updateOne({ slug: sys.slug }, { $set: { name: sys.name } });
        console.log(`Updated ${sys.slug} -> ${sys.name}`);
    }
    
    process.exit(0);
}
update();
