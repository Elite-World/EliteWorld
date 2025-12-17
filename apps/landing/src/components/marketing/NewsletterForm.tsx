'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email) return;

        setStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock success (you simply change this logic when you have a real endpoint)
        setStatus('success');
        setEmail('');
        
        // Reset success message after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <section className={cn(
            "mt-16 p-8 rounded-2xl text-center relative overflow-hidden",
            "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        )}>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
                <p className="mb-8 opacity-90">Subscribe to our newsletter for exclusive guides and news.</p>
                
                {status === 'success' ? (
                    <div className="flex items-center justify-center h-[52px] bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 text-white font-medium animate-in fade-in zoom-in duration-300">
                        ✨ You're all set! Check your inbox soon.
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto transition-all">
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" 
                            disabled={status === 'loading'}
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-70 disabled:cursor-not-allowed placeholder:text-gray-500"
                        />
                        <button 
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px] flex justify-center items-center"
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
            
            {/* Simple decorative circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
}
