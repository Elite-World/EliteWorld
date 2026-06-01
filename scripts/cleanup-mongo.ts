import mongoose from 'mongoose';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

async function cleanup() {
  console.log('🧹 Starting MongoDB Cleanup (Force Mode)...');
  await dbConnect();

  // 1. Drop collections for a complete wipe
  try {
    const collections = await mongoose.connection.db?.listCollections().toArray();
    if (collections) {
      for (const col of collections) {
        if (['universities', 'rankingsystems', 'scholarships', 'rankings'].includes(col.name)) {
          await mongoose.connection.db?.dropCollection(col.name);
          console.log(`✅ Dropped collection: ${col.name}`);
        }
      }
    }
  } catch (err) {
    console.error('⚠️ Error dropping collections:', err);
  }

  console.log('🎉 Cleanup Finished!');
  process.exit(0);
}

cleanup().catch(err => {
  console.error('❌ Cleanup Failed:', err);
  process.exit(1);
});
