import React from 'react';
import Link from 'next/link';
import { PartyPopper, ArrowRight } from 'lucide-react';

export default function SuccessScreen() {
  return (
    <div className="text-center py-12 animate-fade-in space-y-6">
      <div className="w-24 h-24 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <PartyPopper className="w-12 h-12 text-green-500" />
      </div>
      
      <h2 className="text-3xl font-black">Application Submitted!</h2>
      
      <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
        Your institution has been successfully registered. You are now the Administrator of this new organization.
      </p>

      <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-3xl max-w-sm mx-auto border border-gray-100 dark:border-white/5 mt-8 text-left">
        <h4 className="font-bold mb-2">Next Steps:</h4>
        <ul className="text-sm text-gray-500 space-y-2 list-disc list-inside">
          <li>Check your Clerk dashboard to see the new Organization.</li>
          <li>Our team will manually review your profile for verification.</li>
          <li>You can now switch to the Partner Portal.</li>
        </ul>
      </div>

      <div className="pt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform"
        >
          Return Home <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
