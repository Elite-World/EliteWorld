import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function check() {
  await dbConnect();
  const u = await University.findOne({ "name.en": "Massachusetts Institute of Technology" }).populate('location.country_id');
  console.log(u?.name.en, 'Country:', (u?.location.country_id as any)?.name.en);
  process.exit(0);
}
check();
