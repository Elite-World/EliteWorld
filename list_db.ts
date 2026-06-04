import mongoose from 'mongoose';
import dbConnect from './packages/domain/src/lib/mongoose';
import { MobilitySolution } from './packages/domain/src/data/models';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'apps/immigration/.env.local' });

async function run() {
  await dbConnect();
  const sols = await MobilitySolution.find();
  console.log(sols.map(s => s._id.toString()));
  process.exit(0);
}
run();
