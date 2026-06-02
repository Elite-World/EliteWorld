import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function run() {
  await dbConnect();
  const u = await University.findOne({ slug: 'stanford-university' }).lean() as any;
  console.log("description:", u.description);
  console.log("details.overall:", u.details?.overall);
  process.exit(0);
}
run();
