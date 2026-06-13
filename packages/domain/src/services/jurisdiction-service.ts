import { Country, JurisdictionProfile, MobilitySolution } from '../data/models';
import dbConnect from '../lib/mongoose';

export async function getJurisdictionData(slug: string) {
  await dbConnect();

  const country = await Country.findOne({ slug }).lean();
  if (!country) {
    return null;
  }

  const profile = await JurisdictionProfile.findOne({ 
    country_id: country._id,
    isActive: true
  }).lean();

  const solutions = await MobilitySolution.find({
    country_id: country._id,
    isActive: true
  }).lean();

  return JSON.parse(JSON.stringify({
    country,
    profile,
    solutions
  }));
}

export async function getAllActiveJurisdictions() {
  await dbConnect();

  // Find all active jurisdiction profiles
  const profiles = await JurisdictionProfile.find({ isActive: true })
    .populate('country_id') // We need the country name and slug
    .lean() as any[];

  // For each profile, count the number of active mobility solutions
  const enrichedProfiles = await Promise.all(profiles.map(async (profile) => {
    const solutionCount = await MobilitySolution.countDocuments({
      country_id: profile.country_id._id,
      isActive: true
    });

    return {
      country: profile.country_id,
      profile: profile,
      solutionCount
    };
  }));

  return JSON.parse(JSON.stringify(enrichedProfiles));
}

export async function getSolutionsByCategory(categorySlug: string) {
  await dbConnect();

  // Map URL slugs to MongoDB ENUM
  let dbCategory = '';
  switch (categorySlug) {
    case 'residency': dbCategory = 'residency'; break;
    case 'citizenship': dbCategory = 'citizenship'; break;
    case 'long-term-status': dbCategory = 'long_term_visa'; break;
    case 'wealth-structuring': dbCategory = 'corporate'; break;
    default: return null;
  }

  // Find all active solutions matching the category, populate country to get the slug for links
  const solutions = await MobilitySolution.find({ category: dbCategory, isActive: true })
    .populate('country_id')
    .lean() as any[];

  return JSON.parse(JSON.stringify(solutions));
}

export async function getPassportIndex() {
  await dbConnect();

  // Find all active profiles, sort by visa_free_score descending
  const profiles = await JurisdictionProfile.find({ isActive: true })
    .sort({ 'passport_power.visa_free_score': -1 })
    .populate('country_id')
    .lean() as any[];

  // Map to include rank based on the score
  let currentRank = 1;
  let previousScore = -1;
  let skippedRanks = 0;

  const rankedProfiles = profiles.map((p) => {
    const score = p.passport_power?.visa_free_score || 0;
    
    // Standard ranking logic (ties share rank, next rank skips)
    if (score !== previousScore && previousScore !== -1) {
      currentRank += skippedRanks + 1;
      skippedRanks = 0;
    } else if (previousScore !== -1) {
      skippedRanks++;
    }
    previousScore = score;

    return {
      rank: currentRank,
      country: p.country_id,
      passport_power: p.passport_power
    };
  });

  return JSON.parse(JSON.stringify(rankedProfiles));
}

// Helper to extract a number from strings like "Up to 37%" or "0%"
function parseTaxRate(taxStr?: string): number | null {
  if (!taxStr) return null;
  const match = taxStr.match(/\d+(\.\d+)?/);
  if (match) return parseFloat(match[0]);
  return null;
}

export async function getTaxHeatmapData() {
  await dbConnect();

  // Find all active profiles
  const profiles = await JurisdictionProfile.find({ isActive: true })
    .populate('country_id')
    .lean() as any[];

  // Map to include heat scores
  const heatmapData = profiles.map(p => {
    return {
      country: p.country_id,
      tax_profile: {
        corporate_tax: p.tax_profile.corporate_tax,
        corporate_tax_score: parseTaxRate(p.tax_profile.corporate_tax),
        personal_tax: p.tax_profile.personal_tax,
        personal_tax_score: parseTaxRate(p.tax_profile.personal_tax),
        capital_gains: p.tax_profile.capital_gains,
        capital_gains_score: parseTaxRate(p.tax_profile.capital_gains),
        crypto_tax: p.tax_profile.crypto_tax,
        crypto_tax_score: parseTaxRate(p.tax_profile.crypto_tax),
      }
    };
  });

  // Sort by corporate tax score ascending (most favorable first)
  heatmapData.sort((a, b) => {
    const scoreA = a.tax_profile.corporate_tax_score ?? 100;
    const scoreB = b.tax_profile.corporate_tax_score ?? 100;
    return scoreA - scoreB;
  });

  return JSON.parse(JSON.stringify(heatmapData));
}

export async function getAllSolutions() {
  await dbConnect();
  const solutions = await MobilitySolution.find({ isActive: true })
    .populate('country_id')
    .lean() as any[];
  return JSON.parse(JSON.stringify(solutions));
}

export async function getHomepageDestinations(slugs: string[] = ['united-states', 'united-kingdom', 'australia']) {
  await dbConnect();

  const data = await Promise.all(
    slugs.map(async (slug) => {
      const country = await Country.findOne({ slug }).lean();
      if (!country) return null;

      const profile = await JurisdictionProfile.findOne({ country_id: country._id, isActive: true }).lean();
      const solutions = await MobilitySolution.find({ country_id: country._id, isActive: true }).lean();

      return {
        country,
        profile,
        solutions
      };
    })
  );

  return JSON.parse(JSON.stringify(data.filter(Boolean)));
}

