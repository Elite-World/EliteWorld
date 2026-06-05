'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { GlobalRole } from '@/types';
import {
  Activity,
  Book,
  Users,
  GraduationCap,
  Wallet,
  Settings,
  ShieldCheck,
  Building2,
  TrendingUp,
  ArrowUpRight,
  UserPlus,
  PlusCircle
} from 'lucide-react';
import { cn } from '@repo/domain';
import { MOCK_INSTITUTION_MEMBERS, MOCK_INSTITUTIONS } from '@/data/mockData';

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
        ? 'text-blue-600'
        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200',
    )}
  >
    <Icon
      className={cn(
        'w-5 h-5',
        activeTab === tabName ? 'text-blue-600' : 'text-gray-400',
      )}
    />
    {children}
    {activeTab === tabName && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.4)]" />
    )}
  </button>
);

const PartnerPage: React.FC = () => {
  const router = useRouter();
  const { currentUser, courses, getAllUsers } = useAppContext();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
      return;
    }

    const member = MOCK_INSTITUTION_MEMBERS.find((m) => m.userId === currentUser.id);
    if (!member) {
      router.push('/');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  // For prototype purposes, get the first institution they belong to, or inst1 for web master
  const userMemberInfo = MOCK_INSTITUTION_MEMBERS.find((m) => m.userId === currentUser.id);
  const institutionId = userMemberInfo?.institutionId || 'inst1';
  const institution = MOCK_INSTITUTIONS.find(i => i.id === institutionId);

  if (!institution) return null;
  
  const institutionCourses = courses.filter(c => c.institutionId === institution.id);
  const allUsers = getAllUsers();
  const institutionMembers = MOCK_INSTITUTION_MEMBERS.filter(m => m.institutionId === institution.id).map(m => ({
    ...m,
    user: allUsers.find(u => u.id === m.userId)
  }));
  const enrolledStudents = allUsers.filter(u => 
    u.enrolledCourses.some(courseId => institutionCourses.some(ic => ic.id === courseId))
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Revenue', value: '$124,500.00', change: '+14%', up: true },
                { label: 'Active Enrollments', value: '1,432', change: '+5%', up: true },
                { label: 'Avg Course Rating', value: '4.8 / 5.0', change: '+0.1', up: true },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-[#1A1A1A] p-8 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-600/10 transition-colors" />
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
                    <Activity className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Activity Feed</h3>
                  </div>
                  <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700">View All</button>
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">New Enrollment: Alice Johnson</p>
                        <p className="text-xs text-gray-500 font-medium">Purchased &quot;AI for Everyone&quot; for $129.99</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl bg-linear-to-b from-blue-600/5 to-transparent">
                 <div className="flex items-center gap-3 mb-8">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Quick Actions</h3>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:border-blue-500/50 hover:shadow-lg transition-all flex justify-between items-center px-6">
                      Deploy New Course <PlusCircle className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:border-purple-500/50 hover:shadow-lg transition-all flex justify-between items-center px-6">
                      Invite Personnel <UserPlus className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="w-full py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white hover:border-green-500/50 hover:shadow-lg transition-all flex justify-between items-center px-6">
                      Request Payout <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
              </div>
            </div>
          </div>
        );
      case 'catalog':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Experience Catalog</h2>
                <p className="text-gray-500 text-sm font-medium">Manage your institution&apos;s intellectual property and market offerings.</p>
              </div>
              <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px] flex items-center gap-2">
                 <PlusCircle className="w-4 h-4" /> Create Course
              </button>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {institutionCourses.map(course => (
                <div key={course.id} className="bg-white dark:bg-[#1A1A1A] p-6 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl flex flex-col sm:flex-row gap-6 group hover:border-blue-500/30 transition-all">
                  <div className="relative w-full sm:w-48 h-32 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                    <Image src={course.images[0]} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-2 left-2">
                       <span className={cn("px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest shadow-md", 
                          course.status === 'PUBLISHED' ? "bg-green-500 text-white" : 
                          course.status === 'PENDING_REVIEW' ? "bg-yellow-500 text-white" : 
                          "bg-gray-500 text-white"
                       )}>
                         {course.status.replace('_', ' ')}
                       </span>
                    </div>
                  </div>
                  <div className="grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 font-medium line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-black text-gray-900 dark:text-white">${course.price}</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest"><Users className="w-3 h-3" /> {course.facultyIds.length} Faculty</span>
                      </div>
                      <Link href={`/course/${course.id}/manage`} className="p-3 bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-blue-600 rounded-xl transition-colors hover:bg-blue-50 dark:hover:bg-blue-500/10">
                         <Settings className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'personnel':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Personnel Roster</h2>
                <p className="text-gray-500 text-sm font-medium">Manage your faculty and administrative staff.</p>
              </div>
              <button className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px] flex items-center gap-2">
                 <UserPlus className="w-4 h-4" /> Invite Member
              </button>
            </div>
            
            <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {institutionMembers.map((member, i) => (
                   <div key={i} className="flex flex-col p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-red-500 bg-white dark:bg-white/10 rounded-xl shadow-sm transition-colors">
                           <Users className="w-4 h-4" />
                        </button>
                     </div>
                     <div className="flex items-center gap-4 mb-6">
                       <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                         <Image src={member.user?.avatarUrl || ''} alt={member.user?.name || ''} fill className="object-cover" />
                       </div>
                       <div>
                         <h4 className="font-black text-gray-900 dark:text-white leading-tight">{member.user?.name}</h4>
                         <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mt-1">{member.role}</p>
                       </div>
                     </div>
                     <div className="mt-auto pt-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500">{member.title || 'Staff'}</span>
                        <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-md text-[8px] font-black uppercase tracking-widest">Active</span>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );
      case 'directory':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Student Directory</h2>
                <p className="text-gray-500 text-sm font-medium">Monitor engagement and manage active learners.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#1A1A1A] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl overflow-hidden">
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Learner Identity</th>
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Active Enrollments</th>
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Engagement Score</th>
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody>
                     {enrolledStudents.length > 0 ? enrolledStudents.map((student, i) => {
                       // Count how many institution courses they are taking
                       const activeCount = student.enrolledCourses.filter(cid => institutionCourses.some(ic => ic.id === cid)).length;
                       // Mock engagement score based on their index
                       const engagement = Math.min(100, 75 + (i * 10));
                       
                       return (
                         <tr key={student.id} className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                           <td className="p-6">
                             <div className="flex items-center gap-4">
                               <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                                 <Image src={student.avatarUrl} alt={student.name} fill className="object-cover" />
                               </div>
                               <div>
                                 <p className="font-bold text-gray-900 dark:text-white text-sm">{student.name}</p>
                                 <p className="text-xs text-gray-500 font-medium">{student.email}</p>
                               </div>
                             </div>
                           </td>
                           <td className="p-6">
                             <span className="px-3 py-1 bg-blue-600/10 text-blue-600 rounded-lg text-xs font-black">{activeCount} Courses</span>
                           </td>
                           <td className="p-6">
                             <div className="flex items-center gap-3">
                               <div className="w-24 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-green-500 rounded-full" style={{ width: `${engagement}%` }} />
                               </div>
                               <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{engagement}%</span>
                             </div>
                           </td>
                           <td className="p-6 text-right">
                             <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 px-4 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                               Revoke Access
                             </button>
                           </td>
                         </tr>
                       );
                     }) : (
                        <tr>
                          <td colSpan={4} className="p-12 text-center text-gray-500 font-medium">No students currently enrolled.</td>
                        </tr>
                     )}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        );
      case 'financials':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Financials & Ledger</h2>
                <p className="text-gray-500 text-sm font-medium">Track your gross revenue, platform fees, and payouts.</p>
              </div>
              <button className="px-8 py-4 bg-white dark:bg-white/5 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-black rounded-2xl shadow-sm hover:border-blue-500/50 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px] flex items-center gap-2">
                 Download Report
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Available for Payout</p>
                 <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">$14,250.00</p>
              </div>
              <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Lifetime Gross</p>
                 <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">$124,500.00</p>
              </div>
              <div className="bg-white dark:bg-[#1A1A1A] p-8 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl">
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">EliteWorld Fees (10%)</p>
                 <p className="text-3xl font-black text-red-500 tracking-tighter">-$12,450.00</p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A1A] rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl overflow-hidden mt-8">
               <div className="p-8 border-b border-gray-100 dark:border-white/5">
                 <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Transaction History</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                       <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Status</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                       <td className="p-6 text-sm font-bold text-gray-900 dark:text-white">Today, 2:45 PM</td>
                       <td className="p-6 text-sm font-medium text-gray-500">Payout to Bank ****4092</td>
                       <td className="p-6 text-sm font-black text-red-500">-$5,000.00</td>
                       <td className="p-6 text-right"><span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-md text-[8px] font-black uppercase tracking-widest">Processing</span></td>
                     </tr>
                     <tr className="border-b border-gray-50 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                       <td className="p-6 text-sm font-bold text-gray-900 dark:text-white">Yesterday</td>
                       <td className="p-6 text-sm font-medium text-gray-500">Enrollment: Spanish for Beginners</td>
                       <td className="p-6 text-sm font-black text-green-500">+$49.99</td>
                       <td className="p-6 text-right"><span className="px-2 py-1 bg-green-500/10 text-green-500 rounded-md text-[8px] font-black uppercase tracking-widest">Cleared</span></td>
                     </tr>
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">Institution Settings</h2>
                <p className="text-gray-500 text-sm font-medium">Configure your enterprise branding and financial routing.</p>
              </div>
              <button className="px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px]">
                 Update Infrastructure
              </button>
            </div>
            
            <div className="bg-white dark:bg-[#1A1A1A] p-10 md:p-14 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32" />
              
              <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-white/5 mb-10">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Profile & Branding</h3>
              </div>

              <form className="space-y-10 relative z-10">
                <div className="flex items-center gap-8">
                   <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-4 border-gray-50 dark:border-white/5 shadow-xl">
                      <Image src={institution.logoUrl} alt={institution.name} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Change Logo</span>
                      </div>
                   </div>
                   <div className="grow space-y-2">
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Entity Name</label>
                     <input type="text" defaultValue={institution.name} className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                   </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Public Description</label>
                  <textarea rows={4} defaultValue={institution.description} className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"></textarea>
                </div>
              </form>
            </div>

            <div className="bg-white dark:bg-[#1A1A1A] p-10 md:p-14 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-white/5 mb-10">
                <Wallet className="w-5 h-5 text-purple-600" />
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Payout Configuration</h3>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10">
                 <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full bg-[#635BFF]/10 flex items-center justify-center">
                       {/* Stripe Icon Mock */}
                       <span className="text-[#635BFF] font-black text-xl">S</span>
                    </div>
                    <div>
                       <p className="font-bold text-gray-900 dark:text-white text-lg">Stripe Connect</p>
                       <p className="text-xs font-medium text-gray-500">Connected account: {institution.stripeAccountId || 'acct_1N2M3L4K5J6H'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-lg text-xs font-black">Active</span>
                    <button className="px-6 py-3 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:border-gray-300 dark:hover:border-white/20 transition-all">Manage Account</button>
                 </div>
              </div>
            </div>
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
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span className="text-xs font-black uppercase tracking-widest text-purple-600/60">
                Institutional B2B Gateway
              </span>
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mb-2">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                {institution.name}
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl">
              Command center for your enterprise operations. Manage personnel, track student engagement, and monitor financial liquidity.
            </p>
          </div>
          
          <div className="flex items-center gap-6 p-4 pr-8 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-white/5 rounded-3xl shadow-xl">
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-50 dark:border-[#2A2A2A] shadow-lg shrink-0">
              <Image src={currentUser.avatarUrl} alt={currentUser.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Authenticated As</p>
              <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">{currentUser.name}</p>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-1">
                {userMemberInfo?.role || 'Global Admin'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm mb-10 overflow-x-auto no-scrollbar">
          <div className="flex min-w-max px-2">
            <TabButton tabName="overview" activeTab={activeTab} onClick={setActiveTab} icon={Activity}>Overview</TabButton>
            <TabButton tabName="catalog" activeTab={activeTab} onClick={setActiveTab} icon={Book}>Course Catalog</TabButton>
            <TabButton tabName="personnel" activeTab={activeTab} onClick={setActiveTab} icon={Users}>Personnel</TabButton>
            <TabButton tabName="directory" activeTab={activeTab} onClick={setActiveTab} icon={GraduationCap}>Student Directory</TabButton>
            <TabButton tabName="financials" activeTab={activeTab} onClick={setActiveTab} icon={Wallet}>Financials</TabButton>
            <TabButton tabName="settings" activeTab={activeTab} onClick={setActiveTab} icon={Settings}>Settings</TabButton>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default PartnerPage;
