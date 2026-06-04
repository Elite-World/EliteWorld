import mongoose from 'mongoose';
import { getProviderForSection } from './apps/immigration/src/lib/services/content';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'apps/immigration/.env.local' });

async function run() {
  process.env.NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID_INSIGHTS; // Mock the config logic
  const provider = getProviderForSection('insights');
  if (!provider) return;
  const allArticles = await provider.getArticles();
  const solId = "6a2123119419ebc0f489b2be";
  const relatedNews = allArticles.filter(article => {
    if (!article.solutionIds) return false;
    return article.solutionIds.includes(solId);
  });
  console.log("Related News count:", relatedNews.length);
  if (relatedNews.length > 0) {
    console.log(relatedNews[0].title);
  }
}
run();
