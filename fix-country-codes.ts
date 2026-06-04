import mongoose from 'mongoose';
import { Country } from './packages/domain/src/data/models';

const COUNTRY_CODES: Record<string, string> = {
  'australia': 'AU', 'south-korea': 'KR', 'sweden': 'SE', 'saudi-arabia': 'SA', 
  'chile': 'CL', 'greece': 'GR', 'portugal': 'PT', 'vietnam': 'VN', 
  'croatia': 'HR', 'slovenia': 'SI', 'thailand': 'TH', 'colombia': 'CO', 
  'peru': 'PE', 'costa-rica': 'CR', 'ethiopia': 'ET', 'nigeria': 'NG', 
  'kazakhstan': 'KZ', 'ghana': 'GH', 'kyrgyzstan': 'KG', 'sudan': 'SD', 
  'latvia': 'LV', 'brunei': 'BN', 'slovakia': 'SK', 'eswatini': 'SZ', 
  'zimbabwe': 'ZW', 'tunisia': 'TN', 'malawi': 'MW', 'zambia': 'ZM', 
  'united-kingdom': 'GB', 'singapore': 'SG', 'hong-kong': 'HK', 'germany': 'DE', 
  'united-states': 'US', 'macau': 'MO', 'denmark': 'DK', 'japan': 'JP', 
  'finland': 'FI', 'india': 'IN', 'norway': 'NO', 'turkey': 'TR', 
  'poland': 'PL', 'cyprus': 'CY', 'ukraine': 'UA', 'hungary': 'HU', 
  'kenya': 'KE', 'ecuador': 'EC', 'iraq': 'IQ', 'lithuania': 'LT', 
  'belgium': 'BE', 'netherlands': 'NL', 'canada': 'CA', 'austria': 'AT', 
  'italy': 'IT', 'romania': 'RO', 'ireland': 'IE', 'spain': 'ES', 
  'malaysia': 'MY', 'new-zealand': 'NZ', 'iran': 'IR', 'south-africa': 'ZA', 
  'iceland': 'IS', 'estonia': 'EE', 'uae': 'AE', 'luxembourg': 'LU', 
  'mexico': 'MX', 'indonesia': 'ID', 'kuwait': 'KW', 'uzbekistan': 'UZ', 
  'uruguay': 'UY', 'oman': 'OM', 'lebanon': 'LB', 'armenia': 'AM', 
  'bahrain': 'BH', 'belarus': 'BY', 'tanzania': 'TZ', 'bulgaria': 'BG', 
  'jordan': 'JO', 'azerbaijan': 'AZ', 'uganda': 'UG', 'algeria': 'DZ', 
  'georgia': 'GE', 'france': 'FR', 'switzerland': 'CH', 'china': 'CN', 
  'taiwan': 'TW', 'israel': 'IL', 'brazil': 'BR', 'serbia': 'RS', 
  'russia': 'RU', 'pakistan': 'PK', 'qatar': 'QA', 'egypt': 'EG', 
  'czech-republic': 'CZ', 'sri-lanka': 'LK', 'bangladesh': 'BD', 
  'cuba': 'CU', 'argentina': 'AR', 'venezuela': 'VE', 'philippines': 'PH', 
  'palestine': 'PS', 'morocco': 'MA', 'malta': 'MT', 'montenegro': 'ME',
  'antigua-and-barbuda': 'AG', 'dominica': 'DM', 'grenada': 'GD',
  'st-kitts-and-nevis': 'KN', 'st-lucia': 'LC', 'vanuatu': 'VU'
};

async function run() {
  await mongoose.connect('mongodb+srv://bjtiewtech_db_user:ubFQzdAxxe2o0gOZ@edu.czlroyr.mongodb.net/');
  const countries = await Country.find();
  
  let count = 0;
  for (const c of countries) {
    const code = COUNTRY_CODES[c.slug];
    if (code && !c.code) {
      c.code = code;
      await c.save();
      count++;
      console.log(`Updated ${c.slug} -> ${code}`);
    }
  }
  console.log(`Finished updating ${count} countries.`);
  process.exit(0);
}
run();
