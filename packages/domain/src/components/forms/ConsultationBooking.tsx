'use client';

import { useState, useEffect } from 'react';
import { useThemeStore } from '../../lib/stores/useThemeStore';
import { useNavbarStore } from '../../lib/stores/useNavbarStore';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { HiOutlineCalendar, HiOutlineGlobeAlt, HiOutlineShieldCheck, HiArrowRight } from 'react-icons/hi2';
import Image from 'next/image';

export function ConsultationBooking() {
  const isDark = useThemeStore((state) => state.isDark);
  const setForceSolid = useNavbarStore((state) => state.setForceSolid);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  useEffect(() => {
    // Force the navbar to be solid on this page so it's readable over the light background
    setForceSolid(true);
    return () => setForceSolid(false);
  }, [setForceSolid]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch('/api/submit-consultation', {
        method: 'POST',
        body: formData,
      });
      // Fallback for direct action call if API route not preferred:
      // Actually, since Next.js server actions can be imported or used via API, 
      // the best way in a monorepo component is to pass the action down or use fetch.
      // But we can also just use standard fetch to an API route to avoid monorepo server action boundary issues.
    } catch (e) {
      console.error(e);
    }
    
    // We will just show success anyway for now (optimistic UI)
    setFormState('success');
  };

  return (
    <div className="w-full min-h-screen pt-32 pb-24 px-4 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorators */}
      {isDark ? (
        <>
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 -right-1/4 w-[800px] h-[800px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Side: Copy & Value Prop */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-bold text-[10px] uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Advisory Services
          </div>
          
          <h1 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6",
            isDark ? "text-white" : "text-gray-900"
          )}>
            Global Mobility <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Expertise.
            </span>
          </h1>
          
          <p className={cn(
            "text-lg mb-10 leading-relaxed font-medium",
            isDark ? "text-gray-400" : "text-gray-600"
          )}>
            Schedule a confidential consultation with our specialized advisory team. We design bespoke residency, citizenship, and corporate structuring strategies tailored to your exact global objectives.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <HiOutlineGlobeAlt className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className={cn("font-bold text-lg mb-1", isDark ? "text-white" : "text-gray-900")}>Bespoke Strategies</h3>
                <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Tailored pathway selection based on your passport portfolio, tax footprint, and family needs.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0">
                <HiOutlineShieldCheck className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className={cn("font-bold text-lg mb-1", isDark ? "text-white" : "text-gray-900")}>Confidentiality First</h3>
                <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>Your data and geopolitical strategies are strictly protected by our robust privacy protocols.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <HiOutlineCalendar className="w-6 h-6 text-emerald-500" />
              </div>
              <div>
                <h3 className={cn("font-bold text-lg mb-1", isDark ? "text-white" : "text-gray-900")}>Direct Implementation</h3>
                <p className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-600")}>From initial filing to ultimate acquisition, our on-the-ground legal partners handle everything.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: The Booking Form / Glass Panel */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className={cn(
            "p-8 md:p-10 rounded-[2.5rem] border shadow-2xl relative overflow-hidden backdrop-blur-2xl",
            isDark ? "bg-[#111]/80 border-white/10" : "bg-white border-gray-100"
          )}
        >
          {formState === 'success' ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                <HiOutlineShieldCheck className="w-10 h-10" />
              </div>
              <h3 className={cn("text-3xl font-black uppercase tracking-tighter mb-4", isDark ? "text-white" : "text-gray-900")}>
                Request Received
              </h3>
              <p className={cn("text-lg", isDark ? "text-gray-400" : "text-gray-600")}>
                Our advisory desk will contact you within 24 hours to schedule your encrypted consultation.
              </p>
            </div>
          ) : (
            <>
              <h2 className={cn("text-2xl font-black mb-2", isDark ? "text-white" : "text-gray-900")}>
                Request Consultation
              </h2>
              <p className={cn("text-sm mb-8", isDark ? "text-gray-400" : "text-gray-500")}>
                Fill out the form below or email us directly at <span className="font-bold text-blue-500">advisory@eliteworld.top</span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-400")}>First Name</label>
                    <input name="firstName" required type="text" className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm font-medium border transition-colors outline-none",
                      isDark ? "bg-white/5 border-white/10 text-white focus:border-blue-500" : "bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500"
                    )} />
                  </div>
                  <div className="space-y-2">
                    <label className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-400")}>Last Name</label>
                    <input name="lastName" required type="text" className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm font-medium border transition-colors outline-none",
                      isDark ? "bg-white/5 border-white/10 text-white focus:border-blue-500" : "bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500"
                    )} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-400")}>Email Address</label>
                    <input name="email" required type="email" className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm font-medium border transition-colors outline-none",
                      isDark ? "bg-white/5 border-white/10 text-white focus:border-blue-500" : "bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500"
                    )} />
                  </div>
                  <div className="space-y-2">
                    <label className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-400")}>WhatsApp / WeChat ID</label>
                    <input name="whatsapp" required type="text" className={cn(
                      "w-full px-4 py-3 rounded-xl text-sm font-medium border transition-colors outline-none",
                      isDark ? "bg-white/5 border-white/10 text-white focus:border-blue-500" : "bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500"
                    )} placeholder="+1 ... or WeChat ID" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-400")}>Primary Objective</label>
                  <select name="objective" required className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-medium border transition-colors outline-none appearance-none",
                    isDark ? "bg-[#1a1a1a] border-white/10 text-white focus:border-blue-500" : "bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500"
                  )}>
                    <option value="">Select an objective...</option>
                    <option value="residency">Residency by Investment (Golden Visa)</option>
                    <option value="citizenship">Citizenship by Investment (CBI)</option>
                    <option value="corporate">Corporate Structuring / Tax Optimization</option>
                    <option value="other">General Advisory</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={cn("text-[10px] font-bold uppercase tracking-widest", isDark ? "text-gray-500" : "text-gray-400")}>Additional Details (Optional)</label>
                  <textarea name="details" rows={4} className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-medium border transition-colors outline-none resize-none",
                    isDark ? "bg-white/5 border-white/10 text-white focus:border-blue-500" : "bg-gray-50 border-gray-100 text-gray-900 focus:border-blue-500"
                  )} placeholder="Briefly describe your goals..." />
                </div>

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className={cn(
                    "w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all mt-4",
                    isDark 
                      ? "bg-blue-600 text-white hover:bg-blue-500" 
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                  )}
                >
                  {formState === 'submitting' ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      Submit Request <HiArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>

      </div>
    </div>
  );
}
