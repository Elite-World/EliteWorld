
import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
  process.exit(1);
}

const MIT_SLUG = 'massachusetts-institute-of-technology';
// Coordinates pulled from our previous testing/dummy data
const MIT_COORDINATES = [
  { label: 'Main Campus', lat: 42.360091, lng: -71.09416 },
  { label: 'Kendall Square (Branch)', lat: 42.3625, lng: -71.087 }
];

async function updateMitCoordinates() {
  console.log('Connecting to MongoDB...');
  const client = new MongoClient(MONGODB_URI!);

  try {
    await client.connect();
    const db = client.db('test'); // Using 'test' database as seen in screenshot
    const universities = db.collection('universities');

    console.log(`Updating coordinates for university with slug: ${MIT_SLUG}`);

    const result = await universities.updateOne(
      { slug: MIT_SLUG },
      {
        $set: {
          'location.coordinates': MIT_COORDINATES
        }
      }
    );

    if (result.matchedCount === 0) {
      console.error(`Error: University with slug "${MIT_SLUG}" not found.`);
    } else if (result.modifiedCount === 0) {
      console.log('No changes made (coordinates might already exist/match).');
    } else {
      console.log('Successfully updated MIT coordinates!');
    }

    // Verify the update
    const mit = await universities.findOne({ slug: MIT_SLUG });
    console.log('Updated Document (location field):', JSON.stringify(mit?.location, null, 2));

  } catch (error) {
    console.error('Error updating MIT coordinates:', error);
  } finally {
    await client.close();
  }
}

updateMitCoordinates();
