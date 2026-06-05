'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { GlobalRole } from '@/types';
import {
  Activity,
  Book,
  Users,
  Wallet,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Building2,
  TrendingUp,
  PlusCircle,
  Search
} from 'lucide-react';
import { cn } from '@repo/domain';
import { MOCK_INSTITUTIONS } from '@/data/mockData';

const TabButton: React.FC<{
  tabName: string;
  activeTab: string;
  onClick: (tabName: string) => void;
  icon: React.ElementType;
  children: React.ReactNode;
}> = ({ tabName, activeTab, onClick, icon: Icon, children }) => (
  <button
    onClick={() => onClick(tabName)}
    className={cn(
      'relative py-4 px-6 transition-all duration-300 flex items-center gap-3 text-xs font-black uppercase tracking-widest min-w-max',
      activeTab === tabName
        ? 'text-red-600'
        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200',
    )}
  >
    <Icon
      className={cn(
        'w-5 h-5',
        activeTab === tabName ? 'text-red-600' : 'text-gray-400',
      )}
    />
    {children}
    {activeTab === tabName && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-red-600 to-orange-600 rounded-t-full shadow-[0_-2px_10px_rgba(220,38,38,0.4)]" />
    )}
  </button>
);

const AdminPage: React.FC = () => {
  const router = useRouter();
  const { currentUser, courses, getAllUsers } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
      return;
    }

    if (currentUser.globalRole !== GlobalRole.WEB_MASTER && currentUser.globalRole !== GlobalRole.PLATFORM_ADMIN) {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  const allUsers = getAllUsers();
  
  // Platform Metrics
  const totalRevenue = 1245000;
  const platformFees = totalRevenue * 0.1;
  const activeStudents = allUsers.filter(u => u.enrolledCourses.length > 0).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Platform Gross Volume', value: `$${(totalRevenue).toLocaleString()}`, change: '+22%', up: true },
                { label: 'EliteWorld Revenue', value: `$${(platformFees).toLocaleString()}`, change: '+22%', up: true },
                { label: 'Active Learners', value: activeStudents.toString(), change: '+12%', up: true },
                { label: 'Partner Institutions', value: MOCK_INSTITUTIONS.length.toString(), change: '+2', up: true },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-[#1A1A1A] p-6 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-red-600/10 transition-colors" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">{stat.value}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change} this month
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white dark:bg-[#1A1A1A] p-10 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl">
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-red-600" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Global Activity Feed</h3>
                  </div>
                  <button className="text-[10px] font-black text-red-600 uppercase tracking-widest hover:text-red-700">View All</button>
                </div>
                <div className="space-y-6">
                  {[
                    { title: "New Partner Onboarded", desc: "Stanford Pre-Collegiate joined the platform.", time: "1 hour ago", icon: Building2 },
                    { title: "Course Published", desc: "App Brewery launched 'iOS 18 Masterclass'.", time: "3 hours ago", icon: Book },
                    { title: "Large Transaction", desc: "Enterprise batch enrollment ($15,000) processed.", time: "5 hours ago", icon: Wallet },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="p-2 rounded-xl bg-red-50 dark:bg-red-600/10 shrink-0">
                         <item.icon className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl bg-linear-to-b from-red-600/5 to-transparent">
                 <div className="flex items-center gap-3 mb-8">
                    <ShieldAlert className="w-5 h-5 text-red-600" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Admin Actions</h3>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:border-red-500/50 hover:shadow-lg transition-all flex justify-between items-center px-6">
                      Onboard Partner <PlusCircle className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:border-orange-500/50 hover:shadow-lg transition-all flex justify-between items-center px-6">
                      Approve Courses <ShieldCheck className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
              </div>
            </div>
          </div>
        );
      case 'institutions':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
             <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Registered Partners</h2>
                <p className="text-gray-500 text-sm font-medium">Manage B2B institutional relationships.</p>
              </div>
              <div className="flex items-center bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Search partners..." className="bg-transparent border-none outline-none text-xs w-full text-gray-900 dark:text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {MOCK_INSTITUTIONS.map(inst => (
                  <div key={inst.id} className="bg-white dark:bg-[#1A1A1A] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg flex flex-col gap-4">
                     <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm shrink-0">
                           <Image src={inst.logoUrl} alt={inst.name} fill className="object-cover" />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900 dark:text-white">{inst.name}</h3>
                           <span className="px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[10px] font-black uppercase tracking-widest">Active</span>
                        </div>
                     </div>
                     <p className="text-xs text-gray-500 line-clamp-2">{inst.description}</p>
                     <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center mt-auto">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{courses.filter(c => c.institutionId === inst.id).length} Courses</span>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Manage</button>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        );
      case 'courses':
      case 'users':
      case 'financials':
      case 'settings':
         return (
            <div className="p-20 text-center bg-white dark:bg-[#1A1A1A] rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl">
               <ShieldCheck className="w-16 h-16 text-gray-300 dark:text-white/10 mx-auto mb-6" />
               <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Module Under Construction</h2>
               <p className="text-gray-500 font-medium">This administrative module is being provisioned.</p>
            </div>
         );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span className="text-xs font-black uppercase tracking-widest text-red-600/60">
                Super Admin Gateway
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-600">
                Command Center
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl">
              Platform-wide administration. Manage global operations, enforce marketplace standards, and track macro financials.
            </p>
          </div>
          
          <div className="flex items-center gap-6 p-4 pr-8 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl shadow-xl">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-red-500/20 shadow-lg shrink-0">
              <Image src={currentUser.avatarUrl} alt={currentUser.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Authenticated As</p>
              <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{currentUser.name}</p>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mt-1">
                {currentUser.globalRole.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm mb-10 overflow-x-auto no-scrollbar">
          <div className="flex min-w-max px-2">
            <TabButton tabName="overview" activeTab={activeTab} onClick={setActiveTab} icon={Activity}>Overview</TabButton>
            <TabButton tabName="institutions" activeTab={activeTab} onClick={setActiveTab} icon={Building2}>Institutions</TabButton>
            <TabButton tabName="courses" activeTab={activeTab} onClick={setActiveTab} icon={Book}>Course Registry</TabButton>
            <TabButton tabName="users" activeTab={activeTab} onClick={setActiveTab} icon={Users}>Global Users</TabButton>
            <TabButton tabName="financials" activeTab={activeTab} onClick={setActiveTab} icon={Wallet}>Financials</TabButton>
            <TabButton tabName="settings" activeTab={activeTab} onClick={setActiveTab} icon={Settings}>Settings</TabButton>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;
