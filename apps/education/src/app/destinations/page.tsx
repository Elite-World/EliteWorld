import React from 'react';
import { destinations } from '@repo/domain/data/destinations';
import { HeroSection } from '@repo/ui';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Globe2, Building2, Wallet } from 'lucide-react';

export default function DestinationsHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <HeroSection 
        title="Discover Your Global Campus"
        subtitle="Explore top-ranked study destinations around the world. Find the perfect environment to launch your academic journey and global career."
        backgroundImage="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2400"
        mode="page"
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
              Popular <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Destinations</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Click on a destination to uncover its top universities, cost of living, visa requirements, and cultural highlights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <Link 
                href={`/destinations/${dest.id}`} 
                key={dest.id}
                className="group relative rounded-4xl overflow-hidden flex flex-col h-[480px] hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-2xl shadow-blue-900/5"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 rounded-4xl group-hover:to-black/90 transition-colors" />
                  <Image 
                    src={dest.heroImage} 
                    alt={dest.name} 
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                    unoptimized
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full p-8 text-white">
                  
                  <div className="mb-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold mb-4">
                      <Globe2 className="w-3.5 h-3.5" />
                      {dest.stats.internationalStudents} Intl. Students
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-gray-300 font-medium line-clamp-2 mb-6 text-sm">
                      {dest.tagline}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center gap-2 text-sm text-gray-200">
                        <Building2 className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold">{dest.stats.universities} Unis</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-200">
                        <Wallet className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-xs truncate">{dest.stats.postStudyWork} Work</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                      View Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ambient Effects */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
      </section>
    </div>
  );
}
