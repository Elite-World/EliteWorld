const fs = require('fs');
const https = require('https');
const cloudinary = require('cloudinary').v2;

// To run this script:
// 1. Get your Cloudinary CLOUDINARY_URL from the Cloudinary dashboard (looks like cloudinary://12345:ABCDE@dr435quj2)
// 2. Run: CLOUDINARY_URL="your-url-here" node upload-flags.js

if (!process.env.CLOUDINARY_URL) {
  console.error("❌ ERROR: CLOUDINARY_URL is missing. Please set it before running the script.");
  process.exit(1);
}

const countries = [
  { slug: 'united-states', code: 'us' },
  { slug: 'portugal', code: 'pt' },
  { slug: 'spain', code: 'es' },
  { slug: 'greece', code: 'gr' },
  { slug: 'malta', code: 'mt' },
  { slug: 'cyprus', code: 'cy' },
  { slug: 'uae', code: 'ae' },
  { slug: 'united-kingdom', code: 'gb' },
  { slug: 'canada', code: 'ca' },
  { slug: 'australia', code: 'au' },
  { slug: 'new-zealand', code: 'nz' },
  { slug: 'singapore', code: 'sg' },
  { slug: 'switzerland', code: 'ch' },
  { slug: 'italy', code: 'it' },
  { slug: 'antigua-and-barbuda', code: 'ag' },
  { slug: 'dominica', code: 'dm' },
  { slug: 'grenada', code: 'gd' },
  { slug: 'st-kitts-and-nevis', code: 'kn' },
  { slug: 'st-lucia', code: 'lc' },
  { slug: 'vanuatu', code: 'vu' }
];

async function uploadFlags() {
  console.log('🚀 Starting flag uploads to Cloudinary folder: elite-world/countries-logos');
  
  for (const country of countries) {
    const flagUrl = `https://flagcdn.com/w320/${country.code}.png`;
    
    try {
      console.log(`Uploading ${country.slug} from ${flagUrl}...`);
      
      const result = await cloudinary.uploader.upload(flagUrl, {
        folder: 'elite-world/countries-logos',
        public_id: country.slug,
        overwrite: true,
      });
      
      console.log(`✅ Success! ${country.slug} -> ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Failed to upload ${country.slug}:`, error.message);
    }
  }
  
  console.log('🎉 All uploads finished!');
}

uploadFlags();
