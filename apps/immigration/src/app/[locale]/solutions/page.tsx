import React from 'react';
import { HeroSection } from '@repo/ui';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Plane, Building2, ShieldCheck, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Global Mobility Solutions | EliteWorld Immigration',
  description: 'Explore our portfolio of residency, citizenship, and corporate structuring solutions worldwide.',
};

const CATEGORIES = [
  {
    id: 'residency',
    title: 'Residency & Green Cards',
    description: 'Secure your future with Golden Visas, EB-5, and premium residency by investment programs across top global hubs.',
    icon: <Plane className="w-8 h-8" />,
    color: 'from-blue-600 to-blue-400',
    img: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'citizenship',
    title: 'Second Citizenship',
    description: 'Unlock ultimate global mobility and security with direct Citizenship by Investment (CBI) programs.',
    icon: <ShieldCheck className="w-8 h-8" />,
    color: 'from-purple-600 to-purple-400',
    img: 'https://images.unsplash.com/photo-1544015759-223f66a70717?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'long-term-status',
    title: 'Long-Term Status',
    description: 'Strategic long-term visas for digital nomads, entrepreneurs, and high-net-worth retirees.',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-emerald-600 to-emerald-400',
    img: 'https://images.unsplash.com/photo-1498623116890-37e912163d5d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'wealth-structuring',
    title: 'Wealth Structuring',
    description: 'Corporate formation, tax optimization, and offshore banking solutions in highly favorable jurisdictions.',
    icon: <Building2 className="w-8 h-8" />,
    color: 'from-amber-600 to-amber-400',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function SolutionsHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]">
      <HeroSection 
        title="Global Solutions Matrix"
        subtitle="Compare mobility pathways globally. Whether you seek a second passport, European residency, or tax efficiency, find the perfect strategic vehicle."
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2400"
        mode="page"
      />

      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6">
              Select a <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Pathway</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              Browse our portfolio horizontally by category to discover which jurisdiction offers the best strategic advantage for your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {CATEGORIES.map((cat) => (
              <Link 
                href={`/solutions/${cat.id}`}
                key={cat.id}
                className="group relative rounded-4xl overflow-hidden flex flex-col h-[400px] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition-colors duration-500 z-10" />
                  <div className={`absolute inset-0 bg-linear-to-t ${cat.color} mix-blend-overlay opacity-60 z-10`} />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
                  <Image 
                    src={cat.img} 
                    alt={cat.title} 
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                    unoptimized
                  />
                </div>

                <div className="relative z-20 flex flex-col h-full p-10 text-white justify-end">
                  <div className={`w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 text-white group-hover:scale-110 transition-transform duration-500`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">
                    {cat.title}
                  </h3>
                  <p className="text-gray-300 font-medium mb-8 text-lg max-w-md">
                    {cat.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-white/80 transition-colors">
                    Explore Solutions <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Ambient Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      </section>
    </div>
  );
}
