import 'dotenv/config';
import dbConnect from '../packages/domain/src/lib/mongoose';
import { Country, University, RankingSystem } from '../packages/domain/src/data/models';

async function run() {
    console.log("Connecting to MongoDB...");
    await dbConnect();
    console.log("Connected.");
    
    try {
        console.log("Applying indexes to Country collection...");
        await Country.syncIndexes();
        console.log("Country indexes synchronized successfully.");
        
        console.log("Applying indexes to University collection...");
        await University.syncIndexes();
        console.log("University indexes synchronized successfully.");
        
        console.log("Applying indexes to RankingSystem collection...");
        await RankingSystem.syncIndexes();
        console.log("RankingSystem indexes synchronized successfully.");
        
        console.log("All Database Indexes successfully applied!");
    } catch (e) {
        console.error("Error applying indexes:", e);
    }
    
    process.exit(0);
}
run();
