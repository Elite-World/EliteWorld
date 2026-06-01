import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { University } from '../packages/domain/src/data/models';

const US_DATA_FILE = path.join(__dirname, '../us_universities_details.json');
const FP_DATA_FILE = path.join(__dirname, '../forwardpathway_data.json');

async function seed() {
    console.log('🚀 Connecting to MongoDB...');
    await dbConnect();
    
    // 1. Map wID from forwardpathway_data.json
    if (fs.existsSync(FP_DATA_FILE)) {
        console.log(`📋 Loading data from ${FP_DATA_FILE}...`);
        const fpData = JSON.parse(fs.readFileSync(FP_DATA_FILE, 'utf-8'));
        
        const bulkOps = fpData.map((item: any) => ({
            updateOne: {
                filter: { 'name.en': item.name_en },
                update: { $set: { fp_wid: String(item.wID) } }
            }
        }));
        
        const result = await University.bulkWrite(bulkOps);
        console.log(`✅ Updated ${result.modifiedCount} universities with fp_wid`);
    }

    // 2. Map fp_id from us_universities_details.json
    if (fs.existsSync(US_DATA_FILE)) {
        console.log(`📋 Loading data from ${US_DATA_FILE}...`);
        const usData = JSON.parse(fs.readFileSync(US_DATA_FILE, 'utf-8'));
        
        const bulkOps = usData.map((item: any) => ({
            updateOne: {
                filter: { 'name.en': item.name_en },
                update: { 
                    $set: { 
                        fp_id: String(item.id),
                        rich_data: item.rich_data // Also seed rich_data temporarily if not already present
                    } 
                }
            }
        }));
        
        const result = await University.bulkWrite(bulkOps);
        console.log(`✅ Updated ${result.modifiedCount} universities with fp_id (and rich_data)`);
    }
    
    console.log('🎉 Seeding complete!');
    process.exit(0);
}

seed().catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
