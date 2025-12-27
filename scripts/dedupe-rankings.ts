import mongoose from 'mongoose';
import dbConnect from '../packages/web-shared/src/lib/mongoose';
import { RankingSystem, IRankingSystem } from '../packages/web-shared/src/data/models';

async function dedupe() {
  console.log('🧹 Starting Ranking Deduplication...');
  await dbConnect();
  
  const systems = await RankingSystem.find({}).lean();
  
  for (const sys of systems) {
      const data = sys.data as Record<string, any[]>;
      if (!data) continue;
      
      let modified = false;
      const newData: Record<string, any[]> = {};

      for (const [year, entries] of Object.entries(data)) {
          if (!Array.isArray(entries)) continue;
          
          const uniqueEntries = new Map<string, any>();
          let dupesInYear = 0;

          for (const entry of entries) {
              const uid = entry.uni_id.toString();
              if (uniqueEntries.has(uid)) {
                  dupesInYear++;
                  const existing = uniqueEntries.get(uid);
                  // Keep the better rank if multiple exist (lower is better, assuming logical rank)
                  if (entry.rank < existing.rank) {
                      uniqueEntries.set(uid, entry);
                  }
              } else {
                  uniqueEntries.set(uid, entry);
              }
          }

          newData[year] = Array.from(uniqueEntries.values());
          
          if (dupesInYear > 0) {
              console.log(`   Fixing ${sys.slug} - ${year}: Removed ${dupesInYear} duplicates.`);
              modified = true;
          }
      }

      if (modified) {
          // Update the document
          await RankingSystem.updateOne(
              { _id: sys._id },
              { $set: { data: newData } }
          );
          console.log(`✅ Updated ${sys.slug} bucket.`);
      }
  }

  console.log('🎉 Deduplication Finished!');
  process.exit(0);
}

dedupe().catch(err => {
  console.error('❌ Dedupe Failed:', err);
  process.exit(1);
});
