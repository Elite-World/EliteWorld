import mongoose, { Schema, Document } from 'mongoose';

// Reusing the Localization Config Pattern for consistency
const LocalizedSchemaConfig = {
  en: { type: String, default: "" },
  cn: { type: String, default: "" },
};

interface ILocalizedString {
  en: string;
  cn: string;
}

export interface ICourse extends Document {
  school_id: mongoose.Types.ObjectId; // Reference to the School
  is_active: boolean;
  
  // Basic Info
  title: ILocalizedString;
  description: ILocalizedString; // Short marketing blurb
  curriculum: ILocalizedString; // Detailed syllabus/outcomes
  type: string; // 'General', 'Business', 'Exam Preparation', 'Junior', 'Summer Camp'
  
  // Logistics
  lessons_per_week: number; // e.g., 20 lessons
  hours_per_week: number; // e.g., 15 hours (Important for Visa)
  time_of_day: string[]; // ['morning', 'afternoon'] - Some courses are specific
  
  // Dates
  start_dates: {
    type: 'every_monday' | 'specific_dates' | 'flexible';
    specific_dates: Date[]; // If type is 'specific_dates'
  };
  duration: {
    min_weeks: number;
    max_weeks: number;
  };

  // Requirements & Limits (Overrides School Defaults)
  class_size: {
    max: number; // Guaranteed max (e.g., 8 for Premium)
    avg: number;
  };
  age_range: {
    min: number; // e.g., 30+ for "Club 30" courses
    max: number;
  };
  levels: {
    min_entry_level: string; // 'A1', 'B2', etc.
    levels_accepted: string[]; // ['A1', 'A2', 'B1']
  };

  // Pricing Structure (Sliding Scale is Industry Standard)
  pricing: {
    currency: string; // 'GBP', 'USD'
    registration_fee: number;
    material_fee: {
      amount: number;
      type: 'per_week' | 'one_time' | 'included';
    };
    // The core tuition pricing engine
    tuition_tiers: {
      min_weeks: number; // e.g., 1
      max_weeks: number; // e.g., 4
      price_per_week: number; // e.g., 300
    }[];
    seasonal_surcharges: {
      name: ILocalizedString; // e.g., "High Season"
      start_date: Date;
      end_date: Date;
      amount_per_week: number;
    }[];
  };
}

const CourseSchema: Schema = new Schema({
  school_id: { type: Schema.Types.ObjectId, ref: 'School', required: true },
  is_active: { type: Boolean, default: true },

  title: LocalizedSchemaConfig,
  description: LocalizedSchemaConfig,
  curriculum: LocalizedSchemaConfig,
  type: { type: String, default: 'General' },

  lessons_per_week: { type: Number, default: 20 },
  hours_per_week: { type: Number, default: 15 },
  time_of_day: [{ type: String }], // e.g. ["morning", "afternoon"]

  start_dates: {
    type: { type: String, enum: ['every_monday', 'specific_dates', 'flexible'], default: 'every_monday' },
    specific_dates: [{ type: Date }],
  },
  duration: {
    min_weeks: { type: Number, default: 1 },
    max_weeks: { type: Number, default: 52 },
  },

  class_size: {
    max: { type: Number, default: 15 },
    avg: { type: Number, default: 12 },
  },
  age_range: {
    min: { type: Number, default: 16 },
    max: { type: Number, default: 99 },
  },
  levels: {
    min_entry_level: { type: String, default: 'A1' },
    levels_accepted: [{ type: String }],
  },

  pricing: {
    currency: { type: String, default: 'USD' },
    registration_fee: { type: Number, default: 0 },
    material_fee: {
      amount: { type: Number, default: 0 },
      type: { type: String, enum: ['per_week', 'one_time', 'included'], default: 'one_time' },
    },
    // Example: 1-4 weeks: $300/wk, 5-12 weeks: $280/wk
    tuition_tiers: [{
      min_weeks: { type: Number },
      max_weeks: { type: Number },
      price_per_week: { type: Number },
    }],
    // Summer supplements etc.
    seasonal_surcharges: [{
      name: LocalizedSchemaConfig,
      start_date: { type: Date },
      end_date: { type: Date },
      amount_per_week: { type: Number },
    }],
  },
});

// Index for searching: Find all 'Business' courses in 'London' (via population)
CourseSchema.index({ school_id: 1, type: 1 });

export const CourseModel = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
