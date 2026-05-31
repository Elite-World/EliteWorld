'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { CourseCategory } from '@/types';
import {
  Sparkles,
  Layout,
  ShieldCheck,
  DollarSign,
  AlignLeft,
  ChevronDown,
} from 'lucide-react';

const CreateCoursePage: React.FC = () => {
  const { currentUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-2xl bg-linear-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">
                Initiate New{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  Experience
                </span>
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 uppercase tracking-widest text-[10px]">
                Portal for Elite Knowledge Contributors
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1A] p-10 md:p-16 rounded-3xl border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all duration-1000 group-hover:bg-blue-600/10" />

            <form className="space-y-10 relative z-10">
              <div className="space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-white/5">
                  <Layout className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                    Identity & Branding
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1"
                    >
                      Experience Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="e.g., Global Finance & Wealth Strategy"
                      className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="tagline"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1"
                    >
                      Prestige Tagline
                    </label>
                    <input
                      type="text"
                      id="tagline"
                      name="tagline"
                      placeholder="A sophisticated summary for elite learners"
                      className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1"
                    >
                      Vertical
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        className="appearance-none block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                      >
                        {Object.values(CourseCategory).map((cat) => (
                          <option key={cat}>{cat}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="level"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1"
                    >
                      Complexity
                    </label>
                    <div className="relative">
                      <select
                        id="level"
                        name="level"
                        className="appearance-none block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                      <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="price"
                      className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1"
                    >
                      Access Fee ($)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="0.00"
                        className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-white/5 mb-6">
                    <AlignLeft className="w-4 h-4 text-purple-600" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">
                      Narrative & Curriculum
                    </h3>
                  </div>
                  <label
                    htmlFor="description"
                    className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1"
                  >
                    Detailed Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={6}
                    placeholder="Provide a comprehensive overview of the curriculum and expected outcomes..."
                    className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end pt-8">
                <button
                  type="submit"
                  className="px-12 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-sm"
                >
                  Authorize Experience
                </button>
              </div>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-bold text-gray-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-3 h-3 text-green-500" />
              Verified Expert Submission Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
