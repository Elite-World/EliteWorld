import mongoose from 'mongoose';
import dbConnect from '../packages/web-shared/src/lib/mongoose';
import { University } from '../packages/web-shared/src/data/models';

async function cleanup() {
  console.log('🧹 Starting MongoDB Cleanup (Force Mode)...');
  await dbConnect();

  // 1. Drop the unused 'rankings' collection
  try {
    const collections = await mongoose.connection.db?.listCollections({ name: 'rankings' }).toArray();
    if (collections && collections.length > 0) {
      await mongoose.connection.db?.dropCollection('rankings');
      console.log('✅ Dropped deprecated collection: rankings');
    } else {
      console.log('ℹ️ Collection rankings already gone.');
    }
  } catch (err) {
    console.error('⚠️ Error dropping rankings collection:', err);
  }

  // 2. Remove 'rankings' and 'scholarships' fields from University documents
  // CRITICAL: Use .collection to bypass Mongoose strict schema validation
  console.log('🧹 Cleaning University documents (unsetting legacy fields directly)...');
  
  const res = await University.collection.updateMany(
    {}, 
    // @ts-ignore
    { $unset: { rankings: '', scholarships: '', stats: '' } } 
  );
  
  // 3. Verification
  // Check if any document still has these fields
  const check = await University.collection.findOne({ 
      $or: [
          { rankings: { $exists: true } }, 
          { scholarships: { $exists: true } },
          { stats: { $exists: true } }
      ] 
  });
  
  if (check) {
      console.warn('⚠️ WARNING: Found document that still has legacy fields:', check._id);
  } else {
      console.log('✨ VERIFIED: No documents have rankings/scholarships/stats fields in the database.');
  }

  console.log('🎉 Cleanup Finished!');
  process.exit(0);
}

cleanup().catch(err => {
  console.error('❌ Cleanup Failed:', err);
  process.exit(1);
});
