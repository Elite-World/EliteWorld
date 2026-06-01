import mongoose, { Schema, Document, Model } from 'mongoose';

// --- Shared Interfaces ---

export interface Localized<T = string> {
  en: T;
  cn?: T;
}

// --- Country Model ---

export interface ICountry extends Document {
  name: Localized<string>;
  slug: string; // e.g. 'us', 'uk'
  code?: string; // ISO 2-char code if available
}

const CountrySchema = new Schema<ICountry>({
  name: {
    en: { type: String, required: true },
    cn: { type: String }
  },
  slug: { type: String, required: true, unique: true, index: true },
  code: { type: String, index: true }
});

export const Country: Model<ICountry> = 
  mongoose.models.Country || mongoose.model<ICountry>('Country', CountrySchema);

// --- University Model (Schema v3.0) ---

export interface IDetailsContent {
  label: string;
  content: string;
}

export interface IStatContent {
  label: string;
  content: string;
  type: 'statistic' | 'highlight';
}

export interface IUniversity extends Document {
  slug: string;
  
  name: Localized<string>;
  
  location: {
    country_id: mongoose.Types.ObjectId; // Reference to Country
    region?: string; 
    coordinates?: {
      label: string;
      lat: number;
      lng: number;
    }[];
  };

  assets: {
    logo?: string;
    website?: string;
  };

  description: string;

  details: {
    overall: IDetailsContent[];
    stat: IStatContent[];
  };

  lastUpdated: Date;
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

const UniversitySchema = new Schema<IUniversity>({
  slug: { type: String, required: true, unique: true, index: true },
  
  name: {
    en: { type: String, required: true },
    cn: { type: String }
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
    website: String
  },

  description: String,

  details: {
    overall: [DetailsContentSchema],
    stat: [StatContentSchema]
  },

  lastUpdated: { type: Date, default: Date.now }
});

export const University: Model<IUniversity> = 
  mongoose.models.University || mongoose.model<IUniversity>('University', UniversitySchema);

// --- Ranking Model (Schema v3.0 - Bucket Pattern) ---

export interface IRankingEntry {
  rank: number;
  uni_id: mongoose.Types.ObjectId; // Reference to University
}

export interface IRankingSystem extends Document {
  slug: string; // 'qs', 'the'
  name: string; // 'QS World University Rankings'
  url?: string;
  
  // The Bucket Split (Schema v3.1)
  general: Record<string, IRankingEntry[]>; // Year -> Entries
}

const RankingEntrySchema = new Schema<IRankingEntry>({
  rank: { type: Number, required: true },
  uni_id: { type: Schema.Types.ObjectId, ref: 'University', required: true }
}, { _id: false });

const RankingSystemSchema = new Schema<IRankingSystem>({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  url: String,
  
  general: {
    type: Map,
    of: [RankingEntrySchema],
    default: {}
  }
});

export const RankingSystem: Model<IRankingSystem> = 
  mongoose.models.RankingSystem || mongoose.model<IRankingSystem>('RankingSystem', RankingSystemSchema);

// --- Scholarship Model ---

export interface IScholarship extends Document {
  name: Localized<string>;
  amount: Localized<string>;
  type?: string; 
  
  scope: 'university' | 'country';
  entity_id: mongoose.Types.ObjectId; // ID of the University or Country
}

const ScholarshipSchema = new Schema<IScholarship>({
  name: {
    en: { type: String, required: true },
    cn: String
  },
  amount: {
    en: String,
    cn: String
  },
  type: String,
  scope: { type: String, enum: ['university', 'country'], required: true },
  entity_id: { type: Schema.Types.ObjectId, required: true, index: true }
});

export const Scholarship: Model<IScholarship> = 
  mongoose.models.Scholarship || mongoose.model<IScholarship>('Scholarship', ScholarshipSchema);
