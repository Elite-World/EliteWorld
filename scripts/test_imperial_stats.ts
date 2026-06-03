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
    console.log(`Stats length: ${sample.stats?.length || 0}`);
    console.log(JSON.stringify(sample.stats, null, 2));
  } else {
    console.log('Not found');
  }
  process.exit(0);
}
run();
