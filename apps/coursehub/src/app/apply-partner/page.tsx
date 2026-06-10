import React from 'react';
import ApplyPartnerWizard from '../../components/apply-partner/ApplyPartnerWizard';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Become a Partner | CourseHub',
  description: 'Apply to register your institution as a partner on CourseHub.',
};

export default async function ApplyPartnerPage() {
  const { userId } = await auth();

  // Redirect to home if they somehow access this without logging in
  // though Clerk middleware usually handles this, it's good practice.
  if (!userId) {
    redirect('/?sign-in=true');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">
            Become a{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Partner
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Join the world&apos;s most premium learning marketplace. List your
            courses, manage your faculty, and reach global learners.
          </p>
        </div>

        <ApplyPartnerWizard />
      </div>
    </div>
  );
}
