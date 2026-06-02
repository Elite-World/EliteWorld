import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    console.time("Query");
    const unis = await University.find({}, 'slug name location assets')
      .populate({ path: 'location.country_id', strictPopulate: false, select: 'name' })
      .lean();
    console.timeEnd("Query");
    console.log("Found:", unis.length);
    process.exit(0);
}
run();
