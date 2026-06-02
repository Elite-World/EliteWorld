import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
    await dbConnect();
    const count = await University.countDocuments();
    console.log("Total universities:", count);
    process.exit(0);
}
run();
