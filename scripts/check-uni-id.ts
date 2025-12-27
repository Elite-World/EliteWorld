import dbConnect from '../packages/web-shared/src/lib/mongoose';
import { University } from '../packages/web-shared/src/data/models';
import mongoose from 'mongoose';

async function checkId() {
  await dbConnect();
  
  const id = '694e9ddb67efa757a2cfe475';
  console.log(`Checking University ID: ${id}`);
  
  const u = await University.findById(id);
  if (u) {
      console.log('Found:', u.name.en);
      console.log('Slug:', u.slug);
  } else {
      console.log('Not Found');
  }

  process.exit(0);
}

checkId();
