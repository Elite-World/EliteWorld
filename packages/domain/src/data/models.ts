import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Shared Interfaces ---
export interface Localized<T = string> {
  en: T;
  cn?: T;
}

// --- Country Model ---
export interface ICountryTranslations {
  name: string;
}

export interface ICountry extends Document {
  // Legacy fields (for migration)
  name?: Localized<string>;
  
  slug: string; // e.g. 'us', 'uk'
  code?: string; // ISO 2-char code if available
  
  translations?: {
    en: ICountryTranslations;
    cn?: ICountryTranslations;
  };
  image?: string;
}

const CountrySchema = new Schema<ICountry>({
  name: { en: String, cn: String }, // Legacy
  slug: { type: String, required: true, unique: true, index: true },
  code: { type: String, index: true },
  translations: {
    en: { name: { type: String } },
    cn: { name: { type: String } }
  },
  image: { type: String }
});

export const Country: Model<ICountry> = 
  mongoose.models.Country || mongoose.model<ICountry>('Country', CountrySchema);

// --- University Model ---

export interface IDetailsContent {
  label: string;
  content: string;
}

export interface IStatContent {
  label: string;
  content: string;
  type: 'statistic' | 'highlight';
}

export interface IUniversityTranslations {
  name: string;
  description: string;
  details: {
    overall: IDetailsContent[];
    stat: IStatContent[];
  };
}

export interface IUniversity extends Document {
  slug: string;
  fp_id?: string;
  fp_wid?: string;
  
  // Legacy fields
  name?: Localized<string>;
  description?: string;
  details?: {
    overall: IDetailsContent[];
    stat: IStatContent[];
  };

  location: {
    country_id: mongoose.Types.ObjectId; 
    region?: string; 
    coordinates?: {
      label: string;
      lat: number;
      lng: number;
    }[];
  };

  assets: {
    logo?: string;
    cover?: string;
    website?: string;
  };

  rich_data?: any;
  lastUpdated: Date;
  
  translations?: {
    en: IUniversityTranslations;
    cn?: IUniversityTranslations;
  };
}

const DetailsContentSchema = new Schema<IDetailsContent>({
  label: { type: String, required: true },
  content: { type: String, required: true }
}, { _id: false });

const StatContentSchema = new Schema<IStatContent>({
  label: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['statistic', 'highlight'], required: true }
}, { _id: false });

const UniversityTranslationsSchema = new Schema<IUniversityTranslations>({
  name: { type: String },
  description: { type: String },
  details: {
    overall: [DetailsContentSchema],
    stat: [StatContentSchema]
  }
}, { _id: false });

const UniversitySchema = new Schema<IUniversity>({
  slug: { type: String, required: true, unique: true, index: true },
  fp_id: String,
  fp_wid: String,

  // Legacy
  name: { en: String, cn: String },
  description: String,
  details: {
    overall: [DetailsContentSchema],
    stat: [StatContentSchema]
  },

  location: {
    country_id: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
    region: String,
    coordinates: [{
      label: String,
      lat: Number,
      lng: Number
    }]
  },

  assets: {
    logo: String,
    cover: String,
    website: String
  },

  rich_data: { type: Schema.Types.Mixed },
  lastUpdated: { type: Date, default: Date.now },

  translations: {
    en: UniversityTranslationsSchema,
    cn: UniversityTranslationsSchema
  }
});

export const University: Model<IUniversity> = 
  mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);

// --- Ranking Model ---
export interface IRankingEntry {
  rank: number;
  uni_id: mongoose.Types.ObjectId; 
}

export interface IRankingSystem extends Document {
  slug: string; 
  name: string; 
  url?: string;
  general: Record<string, IRankingEntry[]>; 
  subjects?: Record<string, Record<string, IRankingEntry[]>>;
  subject_labels?: Record<string, string>;
}

const RankingEntrySchema = new Schema<IRankingEntry>({
  rank: { type: Number, required: true },
  uni_id: { type: Schema.Types.ObjectId, ref: 'University', required: true }
}, { _id: false });

const RankingSystemSchema = new Schema<IRankingSystem>({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  url: String,
  general: { type: Map, of: [RankingEntrySchema], default: {} },
  subjects: { type: Map, of: { type: Map, of: [RankingEntrySchema] } },
  subject_labels: { type: Map, of: String }
});

export const RankingSystem: Model<IRankingSystem> = 
  mongoose.models.RankingSystem || mongoose.model<IRankingSystem>('RankingSystem', RankingSystemSchema);

// --- Scholarship Model ---
export interface IScholarshipTranslations {
  name: string;
  amount: string;
}

export interface IScholarship extends Document {
  // Legacy
  name?: Localized<string>;
  amount?: Localized<string>;

  type?: string; 
  scope: 'university' | 'country';
  entity_id: mongoose.Types.ObjectId; 
  
  translations?: {
    en: IScholarshipTranslations;
    cn?: IScholarshipTranslations;
  };
}

const ScholarshipTranslationsSchema = new Schema<IScholarshipTranslations>({
  name: { type: String },
  amount: { type: String }
}, { _id: false });

const ScholarshipSchema = new Schema<IScholarship>({
  name: { en: String, cn: String },
  amount: { en: String, cn: String },
  type: String,
  scope: { type: String, enum: ['university', 'country'], required: true },
  entity_id: { type: Schema.Types.ObjectId, required: true, index: true },
  translations: {
    en: ScholarshipTranslationsSchema,
    cn: ScholarshipTranslationsSchema
  }
});

export const Scholarship: Model<IScholarship> = 
  mongoose.models.Scholarship || mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);

// --- Global Mobility & Immigration Models ---
export interface IJurisdictionProfile extends Document {
  country_id: mongoose.Types.ObjectId; 
  isActive: boolean;
  
  tax_profile: {
    corporate_tax: string;
    personal_tax: string;
    capital_gains: string;
    crypto_tax?: string;
  };

  passport_power: {
    visa_free_score: number;
    access_to_schengen: boolean;
    access_to_us: boolean;
    access_to_uk: boolean;
    access_to_china: boolean;
  };
}

const JurisdictionProfileSchema = new Schema<IJurisdictionProfile>({
  country_id: { type: Schema.Types.ObjectId, ref: 'Country', required: true, index: true },
  isActive: { type: Boolean, default: false, index: true },

  tax_profile: {
    corporate_tax: String,
    personal_tax: String,
    capital_gains: String,
    crypto_tax: String,
  },

  passport_power: {
    visa_free_score: Number,
    access_to_schengen: Boolean,
    access_to_us: Boolean,
    access_to_uk: Boolean,
    access_to_china: Boolean,
  }
});

export const JurisdictionProfile: Model<IJurisdictionProfile> = 
  mongoose.models.JurisdictionProfile || mongoose.model<IJurisdictionProfile>('JurisdictionProfile', JurisdictionProfileSchema);

export interface IMobilitySolutionTranslations {
  name: string;
  description: string;
  requirements: {
    investment_amount?: string;
    timeframe?: string;
    physical_presence?: string;
  };
}

export interface IMobilitySolution extends Document {
  country_id: mongoose.Types.ObjectId; 
  isActive: boolean;
  category: 'residency' | 'citizenship' | 'long_term_visa' | 'corporate';
  
  // Legacy
  name?: Localized<string>;
  description?: string;
  requirements?: {
    investment_amount?: string;
    timeframe?: string;
    physical_presence?: string;
  };
  
  translations?: {
    en: IMobilitySolutionTranslations;
    cn?: IMobilitySolutionTranslations;
  };
}

const MobilitySolutionTranslationsSchema = new Schema<IMobilitySolutionTranslations>({
  name: { type: String },
  description: { type: String },
  requirements: {
    investment_amount: String,
    timeframe: String,
    physical_presence: String,
  }
}, { _id: false });

const MobilitySolutionSchema = new Schema<IMobilitySolution>({
  country_id: { type: Schema.Types.ObjectId, ref: 'Country', required: true, index: true },
  isActive: { type: Boolean, default: false, index: true },
  category: { type: String, enum: ['residency', 'citizenship', 'long_term_visa', 'corporate'], required: true },
  
  name: { en: String, cn: String },
  description: String,
  requirements: {
    investment_amount: String,
    timeframe: String,
    physical_presence: String,
  },

  translations: {
    en: MobilitySolutionTranslationsSchema,
    cn: MobilitySolutionTranslationsSchema
  }
});

export const MobilitySolution: Model<IMobilitySolution> = 
  mongoose.models.MobilitySolution || mongoose.model<IMobilitySolution>('MobilitySolution', MobilitySolutionSchema);
