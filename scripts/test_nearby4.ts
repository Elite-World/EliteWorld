import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    const uni = await University.findOne({ slug: 'massachusetts-institute-of-technology' }).lean() as any;
    console.log(Object.keys(uni.rich_data.school_nearby));
    console.log("Length:", Object.keys(uni.rich_data.school_nearby).length);
    console.log("0 in object:", '0' in uni.rich_data.school_nearby);
    process.exit(0);
}
run();
