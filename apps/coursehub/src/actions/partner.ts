'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import connectToDatabase from '../lib/mongoose';
import { Institution } from '../models/Institution';
import { revalidatePath } from 'next/cache';

export interface ApplyPartnerData {
  name: string;
  description: string;
  location: string;
  amenities: string[];
}

export async function submitPartnerApplication(data: ApplyPartnerData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'You must be signed in to apply.' };
    }

    if (!data.name || !data.description || !data.location) {
      return { success: false, error: 'Missing required fields.' };
    }

    // 1. Create Clerk Organization
    const client = await clerkClient();
    const organization = await client.organizations.createOrganization({
      name: data.name,
      createdBy: userId,
    });

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Save extended metadata to MongoDB using the Clerk Org ID as _id
    await Institution.create({
      _id: organization.id,
      name: data.name,
      description: data.description,
      location: data.location,
      amenities: data.amenities,
      isVerified: false, // Pending manual verification
    });

    revalidatePath('/');
    
    return { success: true };
  } catch (error: any) {
    console.error('Failed to submit partner application:', error);
    return { success: false, error: error.message || 'Something went wrong.' };
  }
}
