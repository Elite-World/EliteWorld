import mongoose, { Schema, Document } from 'mongoose';

export interface IMember extends Document {
  // Auth
  email: string;
  password_hash: string;
  is_verified: boolean;
  
  // Profile
  first_name: string;
  last_name: string;
  nationality: string; // ISO Code (e.g. 'MY', 'CN') - Crucial for Visa Logic
  native_language: string; // e.g. 'Chinese'
  
  // Platform Activity
  wishlist: {
    schools: mongoose.Types.ObjectId[];
    courses: mongoose.Types.ObjectId[];
  };
  
  // Marketing preferences
  newsletter_opt_in: boolean;
  
  // System
  created_at: Date;
  last_login: Date;
}

const MemberSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password_hash: { type: String, required: true },
  is_verified: { type: Boolean, default: false },

  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  nationality: { type: String, default: "" }, 
  native_language: { type: String, default: "" },

  wishlist: {
    schools: [{ type: Schema.Types.ObjectId, ref: 'School' }],
    courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  },

  newsletter_opt_in: { type: Boolean, default: false },

  created_at: { type: Date, default: Date.now },
  last_login: { type: Date, default: Date.now },
});

export const MemberModel = mongoose.models.Member || mongoose.model<IMember>('Member', MemberSchema);
