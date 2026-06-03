import mongoose from 'mongoose';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function run() {
  await dbConnect();
  const sample = await University.findOne({ 'name.en': /Imperial College London/i });
  if (sample) {
    console.log(`Found: ${sample.name.en}`);
    console.log(JSON.stringify(sample.rich_data, null, 2));
    console.log("Country: ", sample.location?.country_id);
  }
  process.exit(0);
}
run();
