import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    const uni = await University.findOne({ slug: 'massachusetts-institute-of-technology' }).lean() as any;
    console.log("Is Array?", Array.isArray(uni.rich_data.school_nearby));
    console.log("Type:", typeof uni.rich_data.school_nearby);
    process.exit(0);
}
run();
