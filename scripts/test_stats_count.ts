import mongoose from 'mongoose';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function run() {
  await dbConnect();
  const count = await University.countDocuments({ 'stats.0': { $exists: true } });
  const sample = await University.findOne({ 'stats.0': { $exists: true } }, 'name stats');
  
  console.log(`Universities with stats: ${count}`);
  if (sample) {
    console.log(`Sample: ${sample.name.en}`);
    console.log(JSON.stringify(sample.stats, null, 2));
  }
  process.exit(0);
}
run();
