import React from 'react';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/5 pb-12 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 pr-0 lg:pr-12">
            <Link href="/" className="flex items-center gap-4 mb-8 group">
              <div className="p-2.5 rounded-2xl bg-[#0a0a0a] dark:bg-white shadow-2xl group-hover:scale-110 transition-all duration-500">
                <BookOpen className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="font-sans font-black text-xl text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors tracking-tighter uppercase">
                COURSE<span className="text-blue-600">HUB</span>
              </span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed max-w-xs">
              Architecting the future of global education. We provide the upper
              echelon of learners with direct access to institutional-grade
              expertise.
            </p>
          </div>

          <div>
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-8">
              Curricula
            </h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li>
                <Link
                  href="/search?category=Summer%20Camp"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Summer Camp
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=Language"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Languages
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=Coding"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Engineering
                </Link>
              </li>
              <li>
                <Link
                  href="/search?category=AI"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Artificial Intelligence
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-8">
              Concierge
            </h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Help Registry
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Safety Protocol
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Secure Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-8">
              Governance
            </h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  About the Group
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Global Offices
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Transparency Report
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] text-[10px] mb-8">
              Accreditations
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-600/5 border border-blue-600/10">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                  Licensed Firm
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-600/5 border border-purple-600/10">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">
                  Global Partner
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Elite World | CourseHub
            International Education Group. All rights reserved.
          </p>
          <div className="flex items-center gap-10">
            {['Privacy', 'Terms', 'Security'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
