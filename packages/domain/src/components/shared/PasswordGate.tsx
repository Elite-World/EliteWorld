'use client';

import { useState } from 'react';
import { HiLockClosed, HiArrowRight } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';
import { unlockArticle } from '@repo/cms/actions/content';

interface PasswordGateProps {
  articleId: string;
  isDark: boolean;
  onUnlocked: (fullRecordMap: any) => void;
}

export function PasswordGate({ articleId, isDark, onUnlocked }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';
  const contactHref = `/${locale}#contact`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const result = await unlockArticle(articleId, password);
      
      if (result.success && result.recordMap) {
        onUnlocked(result.recordMap);
      } else {
        setStatus('error');
        setErrorMsg(result.message || 'Incorrect password');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('An error occurred. Please try again.');
    }
  };

  return (
    <div className={cn(
      "relative mt-12 p-8 md:p-12 rounded-4xl border overflow-hidden text-center",
      isDark ? "bg-[#111] border-white/10" : "bg-gray-50 border-gray-200"
    )}>
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />
      <div className={cn(
        "absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] pointer-events-none opacity-50",
        isDark ? "bg-blue-600/30" : "bg-blue-400/20"
      )} />

      <div className="relative z-10 flex flex-col items-center max-w-md mx-auto">
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-xl border",
          isDark ? "bg-white/10 border-white/20 text-white" : "bg-white border-gray-100 text-gray-900"
        )}>
          <HiLockClosed className="w-8 h-8" />
        </div>
        
        <h3 className={cn(
          "text-2xl md:text-3xl font-black tracking-tight mb-4",
          isDark ? "text-white" : "text-gray-900"
        )}>
          Premium Content Locked
        </h3>
        
        <p className={cn(
          "text-sm md:text-base font-medium mb-8",
          isDark ? "text-white/60" : "text-gray-500"
        )}>
          This section of the article is password protected. Please enter the password to continue reading.
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="relative w-full group">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              disabled={status === 'loading'}
              className={cn(
                "w-full px-6 py-4 rounded-xl border outline-none transition-all font-medium pr-14",
                isDark 
                  ? "bg-black/50 border-white/20 text-white placeholder:text-white/40 focus:bg-white/5 focus:border-blue-500/50" 
                  : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-blue-500/50 shadow-sm"
              )}
            />
            <button
              type="submit"
              disabled={status === 'loading' || !password}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                password.length > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                  : isDark ? "bg-white/10 text-white/30" : "bg-gray-100 text-gray-400"
              )}
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <HiArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {status === 'error' && (
            <p className="text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
              {errorMsg}
            </p>
          )}

          <div className="mt-2 text-sm font-medium">
            <p className={cn(isDark ? "text-white/60" : "text-gray-500")}>
              Don't have the password? Please reach out to us <a href={contactHref} className={cn("underline hover:opacity-80 transition-opacity font-bold", isDark ? "text-white" : "text-gray-900")}>here</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
