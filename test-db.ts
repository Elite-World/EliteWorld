import mongoose from 'mongoose';
import { Country } from './packages/domain/src/data/models';

async function run() {
  await mongoose.connect('mongodb+srv://bjtiewtech_db_user:ubFQzdAxxe2o0gOZ@edu.czlroyr.mongodb.net/');
  const countries = await Country.find().lean();
  console.log(countries.map(c => ({ name: c.name?.en, code: c.code, slug: c.slug })));
  process.exit(0);
}
run();
