import dbConnect from '../packages/web-shared/src/lib/mongoose';
import { University, Country } from '../packages/web-shared/src/data/models';
// import { getUniversity } from '../packages/web-shared/src/services/ranking-service'; // Avoid this

async function debug() {
  await dbConnect();
  
  const slug = 'stanford-university';
  console.log(`🔍 Debugging ${slug}...`);

  // 1. Raw Mongoose Document
  const rawUni = await University.findOne({ slug });
  console.log('--- Raw University Document ---');
  console.log('ID:', rawUni?._id);
  console.log('Location:', rawUni?.location);
  
  if (rawUni?.location?.country_id) {
     const countryId = rawUni.location.country_id;
     console.log('Country Ref ID:', countryId);
     const rawCountry = await Country.findById(countryId);
     console.log('--- Raw Country Document ---');
     console.log(rawCountry);
  } else {
     console.warn('⚠️ No country_id found in location!');
     // Try to find if ANY country matches the region string?
     if (rawUni?.location?.region) {
         console.log('Region string:', rawUni.location.region);
     }
  }

  // 2. Simulate Populate
  console.log('--- Simulated Populate ---');
  const popUni = await University.findOne({ slug })
      .populate({ path: 'location.country_id', strictPopulate: false })
      .lean() as any;
  
  console.log('Populated Country:', popUni?.location?.country_id);

  process.exit(0);
}

debug();
