import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    console.time("QueryWithoutPopulate");
    const unis = await University.find({}, 'slug name location assets').lean();
    console.timeEnd("QueryWithoutPopulate");
    
    let hasCountryIdCount = 0;
    let hasCountryStrCount = 0;
    for (const u of unis) {
        if ((u as any).location?.country_id) hasCountryIdCount++;
        if ((u as any).location?.country) hasCountryStrCount++;
    }
    console.log("hasCountryIdCount:", hasCountryIdCount);
    console.log("hasCountryStrCount:", hasCountryStrCount);
    process.exit(0);
}
run();
