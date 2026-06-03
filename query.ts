import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const db = mongoose.connection.db;
  const Country = db.collection('countries');
  const countries = await Country.find({}).toArray();
  for (let c of countries) {
    if (c.name.en && /[\u4e00-\u9fa5]/.test(c.name.en)) {
      console.log('Country with Chinese EN name:', c.name.en, c.slug);
    }
  }
  process.exit(0);
}
run();
