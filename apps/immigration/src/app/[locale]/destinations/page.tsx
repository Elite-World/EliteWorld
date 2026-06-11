import React from 'react';
import { HeroSection } from '@repo/ui';
import { getJurisdictionData } from '@repo/domain/services/jurisdiction-service'; // Wait, I need getAllActiveJurisdictions
import { getAllActiveJurisdictions } from '@repo/domain/services/jurisdiction-service';
import { DestinationsGrid } from '@/components/jurisdiction/DestinationsGrid';

export const revalidate = 3600; // revalidate every hour

export const metadata = {
  title: 'Global Destinations | EliteWorld Immigration',
  description: 'Explore premium global mobility jurisdictions, tax profiles, and residency programs.',
};

export default async function DestinationsHubPage() {
  // 1. Fetch Dynamic Data from MongoDB
  const jurisdictions = await getAllActiveJurisdictions();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <HeroSection 
        title="Global Hubs for Elite Mobility"
        subtitle="Explore top-ranked jurisdictions for corporate structuring, second passports, and residency by investment."
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2400"
        mode="page"
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
              Active <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Jurisdictions</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Click on a destination to uncover its corporate tax profile, passport power, and available mobility pathways.
            </p>
          </div>

          {/* Dynamic Grid */}
          {jurisdictions.length > 0 ? (
            <DestinationsGrid jurisdictions={jurisdictions} />
          ) : (
             <div className="p-12 border border-dashed border-gray-300 dark:border-white/20 rounded-3xl text-center max-w-2xl mx-auto">
               <p className="text-gray-500 dark:text-gray-400 font-medium">No active jurisdictions available at the moment. Check back soon.</p>
             </div>
          )}

        </div>

        {/* Ambient Effects */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}
