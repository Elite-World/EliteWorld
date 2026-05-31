'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  onSubmit?: (email: string) => Promise<void>;
  className?: string;
}

export function NewsletterSection({
  title = 'Stay in the Loop',
  description = 'Subscribe to our newsletter for exclusive guides and news.',
  onSubmit,
  className,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Default simulation if no handler provided
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section
      className={cn(
        'w-full py-16 px-6 md:px-12 rounded-[2rem] text-center relative overflow-hidden',
        // Vibrant Blue-Purple Gradient
        'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl',
        className,
      )}
    >
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
          {title}
        </h3>
        <p className="mb-8 text-white/90 text-sm md:text-base font-medium">
          {description}
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center h-[52px] w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white font-medium animate-in fade-in zoom-in duration-300">
            ✨ You&apos;re all set! Check your inbox soon.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md transition-all"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === 'loading'}
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all font-medium disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px] flex justify-center items-center shadow-lg hover:shadow-xl"
            >
              {status === 'loading' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-overlay" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none mix-blend-overlay" />

      {/* Noise/Texture element could be added here if desired for more premium feel */}
    </section>
  );
}
