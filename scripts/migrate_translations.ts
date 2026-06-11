import mongoose from 'mongoose';
import { config } from 'dotenv';
import { Country, University, Scholarship, MobilitySolution } from '../packages/domain/src/data/models';
config({ path: './apps/education/.env.local' });

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to MongoDB.");

  // Migrate Countries
  const countries = await Country.find({});
  let cCount = 0;
  for (const c of countries) {
    if (!c.translations?.en?.name && c.name?.en) {
      c.translations = {
        en: { name: c.name.en },
        cn: { name: c.name.cn || c.name.en }
      };
      await c.save();
      cCount++;
    }
  }
  console.log(`Migrated ${cCount} Countries.`);

  // Migrate Universities
  const unis = await University.find({});
  let uCount = 0;
  for (const u of unis) {
    if (!u.translations?.en?.name && u.name?.en) {
      u.translations = {
        en: {
          name: u.name.en,
          description: u.description || '',
          details: {
            overall: u.details?.overall || [],
            stat: u.details?.stat || []
          }
        },
        cn: {
          name: u.name.cn || u.name.en,
          description: u.description || '',
          details: {
            overall: u.details?.overall || [],
            stat: u.details?.stat || []
          }
        }
      };
      await u.save();
      uCount++;
    }
  }
  console.log(`Migrated ${uCount} Universities.`);

  // Migrate MobilitySolutions
  const solutions = await MobilitySolution.find({});
  let sCount = 0;
  for (const s of solutions) {
    if (!s.translations?.en?.name && s.name?.en) {
      s.translations = {
        en: {
          name: s.name.en,
          description: s.description || '',
          requirements: {
            investment_amount: s.requirements?.investment_amount || '',
            timeframe: s.requirements?.timeframe || '',
            physical_presence: s.requirements?.physical_presence || '',
          }
        },
        cn: {
          name: s.name.cn || s.name.en,
          description: s.description || '',
          requirements: {
            investment_amount: s.requirements?.investment_amount || '',
            timeframe: s.requirements?.timeframe || '',
            physical_presence: s.requirements?.physical_presence || '',
          }
        }
      };
      await s.save();
      sCount++;
    }
  }
  console.log(`Migrated ${sCount} Mobility Solutions.`);

  // Migrate Scholarships
  const scholarships = await Scholarship.find({});
  let schCount = 0;
  for (const s of scholarships) {
    if (!s.translations?.en?.name && s.name?.en) {
      s.translations = {
        en: {
          name: s.name.en,
          amount: s.amount?.en || ''
        },
        cn: {
          name: s.name.cn || s.name.en,
          amount: s.amount?.cn || s.amount?.en || ''
        }
      };
      await s.save();
      schCount++;
    }
  }
  console.log(`Migrated ${schCount} Scholarships.`);

  console.log("Migration Complete.");
  process.exit(0);
}
migrate().catch(console.error);
