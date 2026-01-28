import Database, { Database as DatabaseType } from 'better-sqlite3';
import path from 'path';
import 'server-only';

// Singleton connection
let db: DatabaseType | undefined;

export function getDb(): DatabaseType {
  if (!db) {
    // Assuming the app is run from the workspace root (EliteWorld)
    // The DB is at packages/web-shared/src/data/uni-rank.db
    const dbPath = path.resolve(process.cwd(), 'packages/web-shared/src/data/uni-rank.db');
    
    // If we are running inside apps/education, cwd might be apps/education.
    // We can try to detect or just use a relative path that works for monorepo dev.
    // A safer bet for local dev in this specific monorepo setup:
    // If cwd ends with 'apps/education', go up.
    
    let finalPath = dbPath;
    if (process.cwd().endsWith('apps/education')) {
        finalPath = path.resolve(process.cwd(), '../../packages/web-shared/src/data/uni-rank.db');
    }

    try {
        db = new Database(finalPath, { readonly: true });
    } catch (e) {
        console.error(`Failed to open database at ${finalPath}.`, e);
        // Fallback or re-throw
        throw e;
    }
  }
  return db;
}
