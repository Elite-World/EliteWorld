import mongoose from 'mongoose';
import dbConnect from './packages/domain/src/lib/mongoose';
import { MobilitySolution } from './packages/domain/src/data/models';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'apps/immigration/.env.local' });

async function run() {
  const slug = 'antigua-cbi-program-6a2123119419ebc0f489b2be';
  const idMatch = slug.match(/[a-f0-9]{24}$/i);
  console.log('Match:', idMatch);
  if (!idMatch) process.exit(1);
  const id = idMatch[0];
  console.log('ID:', id);
  
  await dbConnect();
  const solution = await MobilitySolution.findById(id).populate('country_id');
  console.log('Solution found:', !!solution);
  console.log('Has country_id:', !!solution?.country_id);
  process.exit(0);
}
run();
