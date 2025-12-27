import dbConnect from '../packages/web-shared/src/lib/mongoose';
import { RankingSystem } from '../packages/web-shared/src/data/models';

async function checkDupes() {
  await dbConnect();
  
  /* Use lean to get plain objects */
  const systems = await RankingSystem.find({}).lean();
  
  for (const sys of systems) {
      console.log(`Checking System: ${sys.slug}`);
      if (!sys.data) continue;

      // In lean(), data is a POJO
      const data: Record<string, any[]> = sys.data as any;

      for (const [year, entries] of Object.entries(data)) {
          if (!Array.isArray(entries)) continue;
          // @ts-ignore
          const uniIds = entries.map(e => e.uni_id.toString());
          const uniqueIds = new Set(uniIds);
          
          if (uniqueIds.size !== uniIds.length) {
              console.warn(`⚠️ DUPLICATES FOUND in ${sys.slug} - ${year}`);
              console.warn(`   Total Entries: ${uniIds.length}`);
              console.warn(`   Unique Unis: ${uniqueIds.size}`);
              console.warn(`   Duplicates: ${uniIds.length - uniqueIds.size}`);
              
              // Find examples
              const counts: Record<string, number> = {};
              for (const id of uniIds) {
                  counts[id] = (counts[id] || 0) + 1;
              }
              const dupes = Object.entries(counts).filter(([k,v]) => v > 1).slice(0, 3);
              console.log('   Example Dupes (UniIDs):', dupes);
          }
      }
  }

  process.exit(0);
}

checkDupes();
