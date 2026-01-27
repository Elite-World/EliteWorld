import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the supported languages in one place for easy expansion later.
// To add French later, just add: fr: { type: String, default: "" }
const LocalizedSchemaConfig = {
  en: { type: String, default: "" },
  cn: { type: String, default: "" },
};

// Interface helper for TypeScript
interface ILocalizedString {
  en: string;
  cn: string;
}

export interface ISchool extends Document {
  id: string;
  name: ILocalizedString;
  description: ILocalizedString;
  contact: {
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    phone: string;
    email: string;
    website: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
  media: {
    pics: string[];
    vids: string[];
  };
  facility: {
    general_school_facility: {
      lounge: boolean;
      garden: boolean;
      table_soccer: boolean;
      free_coffee: boolean;
      free_water_dispenser: boolean;
      free_wifi: boolean;
      student_support_desk: boolean;
      copy_machine: boolean;
      free_parking: boolean;
      nonsmoking: boolean;
    };
    classroom_equipment: {
      television: boolean;
      electronic_whiteboard: boolean;
      air_conditioning: boolean;
      heating: boolean;
      ample_natural_light: boolean;
      number_of_classroom: number;
      number_of_public_pc_station: number;
    };
    facilities_for_disabled_students: {
      disabled_car_park: boolean;
      wheelchair_access: boolean;
    };
  };
  student_distribution: {
    nationality: Map<string, number>;
    age:{
      "1-18": number;
      "19-24": number;
      "25-29": number;
      "35-50": number;
      ">50": number;
    };
    gender:{
      male: number;
      female: number;
    };
  };
  detail: {
    accreditation: string[];
    teacher_qualifications: {
      university_degree: number;
      teaching_qualification: number;
    };
    founded_year: number;
    capacity: number;
    class_size: {
      avg: number;
      max: number;
    };
    min_age: number;
  };
  faq: {
    question: ILocalizedString;
    answer: ILocalizedString;
  }[];
  rating: {
    location: number;
    facilities: number;
    social_activities: number;
    organisation: number;
    teaching_quality: number;
    value_for_money: number;
    accommodation: number;
    safety: number;
    meal: number;
  };
  summary: {
    like: ILocalizedString[];
    dislike: ILocalizedString[];
    location: ILocalizedString;
    facilities: ILocalizedString;
    course_selection: ILocalizedString;
    accommodation: ILocalizedString;
    additional_information: ILocalizedString;
  };
}

const SchoolSchema: Schema = new Schema({
  id: { type: String, default: "" },
  // 2. Reuse the config
  name: LocalizedSchemaConfig,
  description: LocalizedSchemaConfig,
  contact: {
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zip: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    phone: { type: String, default: "" },
    email: { type: String, default: "" },
    website: { type: String, default: "" },
    coordinates: {
      latitude: { type: String, default: "" },
      longitude: { type: String, default: "" },
    },
  },
  media: {
    pics: [{ type: String }],
    vids: [{ type: String }],
  },
  facility: {
    general_school_facility: {
      lounge: { type: Boolean, default: false },
      garden: { type: Boolean, default: false },
      table_soccer: { type: Boolean, default: false },
      free_coffee: { type: Boolean, default: false },
      free_water_dispenser: { type: Boolean, default: false },
      free_wifi: { type: Boolean, default: false },
      student_support_desk: { type: Boolean, default: false },
      copy_machine: { type: Boolean, default: false },
      free_parking: { type: Boolean, default: false },
      nonsmoking: { type: Boolean, default: false },
    },
    classroom_equipment: {
      television: { type: Boolean, default: false },
      electronic_whiteboard: { type: Boolean, default: false },
      air_conditioning: { type: Boolean, default: false },
      heating: { type: Boolean, default: false },
      ample_natural_light: { type: Boolean, default: false },
      number_of_classroom: { type: Number, default: 0 },
      number_of_public_pc_station: { type: Number, default: 0 },
    },
    facilities_for_disabled_students: {
      disabled_car_park: { type: Boolean, default: false },
      wheelchair_access: { type: Boolean, default: false },
    },
  },
  // 3. Reuse the config here too
  student_distribution: {
    nationality: {
      type: Map,
      of: Number,
      default: {},
    },
    age: {
      "1-18": { type: Number, default: 0 },
      "19-24": { type: Number, default: 0 },
      "25-29": { type: Number, default: 0 },
      "35-50": { type: Number, default: 0 },
      ">50": { type: Number, default: 0 },
    },
    gender: {
      male: { type: Number, default: 0 },
      female: { type: Number, default: 0 },
    },
  detail: {
    // Changed to array for flexibility (e.g. ["British Council", "English UK", "NEAS", "ACCET"])
    accreditation: { type: [String], default: [] },
    teacher_qualifications: {
      university_degree: { type: Number, default: 0 },
      teaching_qualification: { type: Number, default: 0 },
    },
    founded_year: { type: Number, default: 0 }, // Year established (e.g. 1995)
    capacity: { type: Number, default: 0 }, // Total max student capacity
    class_size: {
      avg: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
    },
    min_age: { type: Number, default: 0 },
  },
  faq: [{
    question: LocalizedSchemaConfig,
    answer: LocalizedSchemaConfig,
  }],
  rating: {
    location: { type: Number, default: 0 },
    facilities: { type: Number, default: 0 },
    social_activities: { type: Number, default: 0 },
    organisation: { type: Number, default: 0 },
    teaching_quality: { type: Number, default: 0 },
    value_for_money: { type: Number, default: 0 },
    accommodation: { type: Number, default: 0 },
    safety: { type: Number, default: 0 },
    meal: { type: Number, default: 0 },
  },
  summary: {
    like: [LocalizedSchemaConfig],
    dislike: [LocalizedSchemaConfig],
    location: LocalizedSchemaConfig,
    facilities: LocalizedSchemaConfig,
    course_selection: LocalizedSchemaConfig,
    accommodation: LocalizedSchemaConfig,
    additional_information: LocalizedSchemaConfig,
  },
});

export const SchoolModel = mongoose.models.School || mongoose.model<ISchool>('School', SchoolSchema);
