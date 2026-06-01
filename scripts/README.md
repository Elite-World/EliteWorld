# EliteWorld Scraping & Data Processing Scripts

This directory contains the scripts used for scraping data and populating the MongoDB database.

## Forward Pathway University Rankings Data

The ranking data is actively sourced from Forward Pathway, bypassing their Cloudflare protection using Puppeteer and direct API fetches.

**Data Source URLs:**
1. **Main Table Listing API**: `https://www.forwardpathway.com/wp-admin/admin-ajax.php?action=get_wdtable&table_id=50`
   - **Method**: POST
   - **Purpose**: Returns the list of 3,600+ universities in a JSON array. Used to extract the `wID` parameters.
2. **Historical Ranking Data API**: `https://www.forwardpathway.com/d3v7/dataphp/worldranking/world_ranks4_20251010.php?wID={wID}`
   - **Method**: GET
   - **Purpose**: Returns the historical 10+ year ranking data for a specific university (QS, USNews, THE, ARWU).

### Scraping Flow

To completely rebuild the ranking data from scratch:

**1. Run the Scraper**
```bash
npm run update-rankings
```
*Note: This command runs `scripts/scrape_forwardpathway.ts` first. It launches a visible Chromium browser to pass Cloudflare, intercepts the session token, dynamically tells the server to yield all 3600 results at once (`length=-1`), extracts the `wID`s, and then fires parallel batch requests directly to the historical data API. The output is saved to `forwardpathway_data.json`.*

**2. Rebuild the Database**
If you want to completely erase the existing Universities and rebuild the database from the newly scraped JSON, run:
```bash
DOTENV_CONFIG_PATH=.env.local npx tsx -r dotenv/config scripts/rebuild_db_from_fp.ts
```
*Note: This drops the `University` and `RankingSystem` collections in MongoDB and completely reconstructs them using the `forwardpathway_data.json` file. It also sets up `wID` mappings to allow easy future incremental updates.*

### Raw API cURL Examples (For Reference)

**Main Table Data (Requires valid Cloudflare tokens and `wdtNonce` in body):**
```bash
curl 'https://www.forwardpathway.com/wp-admin/admin-ajax.php?action=get_wdtable&table_id=50' \
  -H 'content-type: application/x-www-form-urlencoded; charset=UTF-8' \
  -H 'x-requested-with: XMLHttpRequest' \
  --data-raw 'draw=1&start=0&length=-1&wdtNonce=YOUR_NONCE'
```

**Historical Data (Requires valid Cloudflare User-Agent/Cookies):**
```bash
curl 'https://www.forwardpathway.com/d3v7/dataphp/worldranking/world_ranks4_20251010.php?wID=1107' \
  -H 'Referer: https://www.forwardpathway.com/worldranking'
```

## Comprehensive University Details Scraping

We have established a robust pipeline to scrape all rich data for universities directly into MongoDB, preparing the infrastructure for future cron-based auto-updates.

**Data Source Endpoints (Internal FP APIs):**
- `overview_all_{date}.php?name={fp_id}`
- `crime_yearly_{date}.php?name={fp_id}`
- `degree_all_{date}.php?name={fp_id}`
- `ranking_admin_{date}.php?name={fp_id}`
- `score10_{date}.php?name={fp_id}`
- `student_comp_{date}.php?name={fp_id}`
- `age_mf_{date}.php?name={fp_id}`
- `international_students_{date}.php?name={fp_id}`
- `school_nearby_{date}.php?name={fp_id}`
- `student_all_{date}.php?name={fp_id}`

### Scraping Flow

To scrape the detailed rich data for universities:

**1. Seed MongoDB with FP IDs (One-time setup)**
```bash
DOTENV_CONFIG_PATH=.env.local npx tsx -r dotenv/config scripts/seed_fp_ids.ts
```
*Note: This script uses `us_universities_details.json` and `forwardpathway_data.json` to assign `fp_id` and `fp_wid` properties to existing Mongoose University documents. This is required for the scraper to know which ID to fetch.*

**2. Run the Comprehensive Scraper**
To scrape ALL universities with a known `fp_id`:
```bash
DOTENV_CONFIG_PATH=.env.local npx tsx -r dotenv/config scripts/scrape_all_details.ts
```

To scrape a **single** university for testing (e.g. MIT):
```bash
DOTENV_CONFIG_PATH=.env.local npx tsx -r dotenv/config scripts/scrape_all_details.ts massachusetts-institute-of-technology
```

### Cron Job Integration

Because the Next.js UI (`UsUniTemplate.tsx`) natively reads `university.rich_data` from MongoDB via `getUniversity()`, you can safely set up a CRON job on your server to run `scripts/scrape_all_details.ts` periodically (e.g. weekly).
The script uses Puppeteer stealth to bypass Cloudflare, fetches all endpoints concurrently inside the browser context, and patches the new results seamlessly into `rich_data` without destroying any existing unrelated data.

## Other Utility Scripts

- `cleanup-mongo.ts`: Drops the entire MongoDB database (Universities, Rankings, etc.) to allow for a clean import from scratch. Use with caution!
- `scrape_universities.ts`: Legacy script used to scrape basic university metadata (descriptions, logos, websites) from third-party sites using a `links.csv` file. Outputs to `scraped_universities.json`.
- `import_universities.ts`: Imports the `scraped_universities.json` output into MongoDB. This is part of the initial DB seeding process.
- `update_rankings_from_fp.ts`: Lightweight script that only updates the ranking numbers in MongoDB based on `forwardpathway_data.json` without fully rebuilding the database.
- `populate-db-meta.ts`: Legacy script for fuzzy-matching university logos and populating metadata fields.
