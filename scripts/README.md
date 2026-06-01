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
