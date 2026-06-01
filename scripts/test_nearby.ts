import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    const uni = await University.findOne({ slug: 'massachusetts-institute-of-technology' }).lean() as any;
    console.log(JSON.stringify(uni.rich_data?.school_nearby, null, 2));
    process.exit(0);
}
run();
