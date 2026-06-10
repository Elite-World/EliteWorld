import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInstitution extends Document {
  _id: string; // We use the Clerk Organization ID
  name: string;
  description: string;
  logoUrl?: string;
  isVerified: boolean;
  stripeAccountId?: string;
  location?: string;
  amenities?: string[];
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const InstitutionSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String },
    isVerified: { type: Boolean, default: false },
    stripeAccountId: { type: String },
    location: { type: String },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

// Prevent mongoose from recompiling the model upon hot reload in dev
export const Institution: Model<IInstitution> =
  mongoose.models.Institution || mongoose.model<IInstitution>('Institution', InstitutionSchema);
