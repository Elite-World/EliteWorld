import mongoose from 'mongoose';
import dbConnect from './packages/domain/src/lib/mongoose';
import { MobilitySolution } from './packages/domain/src/data/models';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'apps/immigration/.env.local' });

async function run() {
  await dbConnect();
  const sol = await MobilitySolution.findById('6a2123119419ebc0f489b2be').populate('country_id');
  console.log(JSON.stringify(sol, null, 2));
  process.exit(0);
}
run();
