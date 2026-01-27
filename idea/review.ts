import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  // Who wrote it?
  member_id: mongoose.Types.ObjectId;
  member_name: string; // Cache this to avoid expensive lookups on display
  member_nationality: string; // "Malaysia" - Valuable for readers ("Did other Malaysians like it?")
  
  // What are they reviewing?
  school_id: mongoose.Types.ObjectId;
  course_id: mongoose.Types.ObjectId;
  
  // Verification
  is_verified_student: boolean; // "Verified Booking" badge
  booking_date: Date; // To ensure recent relevance

  // Scorecard (1-5 or 1-10)
  ratings: {
    overall: number; // calculated average
    // School-Level Factors
    facilities: number;
    accommodation: number;
    location: number;
    social_activities: number;
    // Course-Level Factors
    teaching_quality: number;
    value_for_money: number;
    progress_satisfaction: number;
  };

  // Written Content
  title: string;
  content: string; // The text review
  
  // Interaction
  likes: number; // "Helpful" votes
  response?: {
    school_response: string; // School has right of reply (very important!)
    responded_at: Date;
  };

  created_at: Date;
  status: 'pending' | 'published' | 'hidden'; // Moderation queue
}

const ReviewSchema: Schema = new Schema({
  member_id: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  member_name: { type: String, default: 'Anonymous' },
  member_nationality: { type: String, default: '' },

  school_id: { type: Schema.Types.ObjectId, ref: 'School', required: true },
  course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },

  is_verified_student: { type: Boolean, default: false },
  booking_date: { type: Date },

  ratings: {
    overall: { type: Number, required: true },
    facilities: { type: Number, required: true },
    accommodation: { type: Number, default: 0 }, // Optional if they didn't stay
    location: { type: Number, required: true },
    social_activities: { type: Number, default: 0 },
    teaching_quality: { type: Number, required: true },
    value_for_money: { type: Number, required: true },
    progress_satisfaction: { type: Number, required: true },
  },

  title: { type: String, required: true },
  content: { type: String, required: true },

  likes: { type: Number, default: 0 },
  
  response: {
    school_response: { type: String },
    responded_at: { type: Date },
  },

  created_at: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'published', 'hidden'], default: 'pending' },
});

// Index for fast lookups: "Show me all published reviews for this School"
ReviewSchema.index({ school_id: 1, status: 1 });
ReviewSchema.index({ course_id: 1, status: 1 });

export const ReviewModel = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
