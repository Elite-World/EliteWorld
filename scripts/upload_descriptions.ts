import 'dotenv/config';
import fs from 'fs';
import readline from 'readline';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

const INPUT_FILE = 'generated_profiles.jsonl';

async function run() {
  await dbConnect();
  console.log('Connected to MongoDB.');

  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`File ${INPUT_FILE} not found!`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(INPUT_FILE);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  const bulkOps: any[] = [];
  let lineCount = 0;

  console.log('Reading generated profiles...');
  for await (const line of rl) {
    if (line.trim()) {
      try {
        const data = JSON.parse(line);
        if (data.slug && data.description && data.overview) {
          
          // Add to MongoDB Bulk Operations array
          bulkOps.push({
            updateOne: {
              filter: { slug: data.slug },
              update: {
                $set: {
                  description: data.description,
                  'details.overall': [
                    {
                      label: 'Overview',
                      content: data.overview,
                    }
                  ]
                }
              }
            }
          });
          lineCount++;
        }
      } catch (e) {
        console.error('Error parsing line:', line);
      }
    }
  }

  console.log(`Parsed ${lineCount} profiles successfully.`);
  
  if (bulkOps.length === 0) {
    console.log('No valid operations found.');
    process.exit(0);
  }

  console.log('Executing Bulk Update to MongoDB Atlas... This may take a moment.');
  
  try {
    const result = await University.bulkWrite(bulkOps, { ordered: false });
    console.log('\\n--- MONGODB UPDATE COMPLETE ---');
    console.log(`Matched Documents: ${result.matchedCount}`);
    console.log(`Modified Documents: ${result.modifiedCount}`);
    console.log(`Success! All ${lineCount} university profiles have been uploaded to your live database.`);
  } catch (err) {
    console.error('Error during bulk write:', err);
  }

  process.exit(0);
}

run();
