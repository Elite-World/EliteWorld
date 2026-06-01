import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    const uni = await University.findOne({ slug: 'massachusetts-institute-of-technology' }).lean() as any;
    console.log("images[1]:", uni.rich_data.school_nearby.images[1]);
    console.log("images2[0]:", uni.rich_data.school_nearby.images2[0]);
    process.exit(0);
}
run();
