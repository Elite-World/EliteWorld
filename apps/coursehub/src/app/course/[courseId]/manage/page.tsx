'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { Course, User, CourseCategory, Session } from '@/types';
import {
  ArrowLeft,
  Settings,
  Calendar,
  Users,
  ShieldCheck,
  Edit3,
  Plus,
  Clock,
  MapPin,
  ChevronDown,
  X,
  Sparkles,
  Layout,
  DollarSign,
} from 'lucide-react';
import { cn } from '@repo/domain';

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
      'relative py-4 px-6 transition-all duration-300 flex items-center gap-2 text-xs font-black uppercase tracking-widest',
      activeTab === tabName
        ? 'text-blue-600'
        : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200',
    )}
  >
    <Icon
      className={cn(
        'w-4 h-4',
        activeTab === tabName ? 'text-blue-600' : 'text-gray-400',
      )}
    />
    {children}
    {activeTab === tabName && (
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-full shadow-[0_-2px_10px_rgba(37,99,235,0.4)]" />
    )}
  </button>
);

// --- Edit Details Panel (now includes Admin Management) ---
const DetailsPanel: React.FC<{ course: Course; users: User[] }> = ({
  course,
  users,
}) => {
  const getAdminDetails = (userId: string) =>
    users.find((u) => u.id === userId);
  const owner = users.find((u) => u.id === course.facultyIds[0]);

  return (
    <div className="space-y-12">
      <div className="bg-white dark:bg-[#1A1A1A] p-10 md:p-14 rounded-[3rem] border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-white/5 mb-10">
          <Edit3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
            Core Architecture
          </h3>
        </div>

        <form className="space-y-10">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-blue-600" /> Experience
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={course.title}
              className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-purple-600" /> Strategic
              Overview
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={course.description}
              className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-blue-600" /> Market
                Vertical
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  defaultValue={course.category}
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
                htmlFor="price"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-purple-600" /> Standard
                Access Fee ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={course.price}
                  className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="submit"
              className="px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all active:scale-95 uppercase tracking-widest text-[10px]"
            >
              Update Intelligence
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl">
          <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-white/5 mb-8">
            <Users className="w-4 h-4 text-blue-600" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Personnel Roster
            </h3>
          </div>
          <ul className="space-y-4">
            {owner && (
              <li className="flex items-center justify-between p-5 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-2xl mr-4 shrink-0 overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
                    <Image
                      src={owner.avatarUrl}
                      alt={owner.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-black text-sm text-gray-900 dark:text-white leading-none mb-1">
                      {owner.name}
                    </p>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      Master Commander
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-gray-200/50 dark:bg-white/10">
                  <ShieldCheck className="w-4 h-4 text-gray-400" />
                </div>
              </li>
            )}
            {course.facultyIds.slice(1).map((facultyId) => {
              const adminUser = getAdminDetails(facultyId);
              return (
                <li
                  key={facultyId}
                  className="flex items-center justify-between p-5 bg-white dark:bg-[#222] rounded-3xl border border-gray-100 dark:border-white/5 group hover:border-blue-500/30 transition-all"
                >
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-2xl mr-4 shrink-0 overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm group-hover:scale-105 transition-transform">
                      <Image
                        src={adminUser?.avatarUrl || ''}
                        alt={adminUser?.name || 'Admin'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-black text-sm text-gray-900 dark:text-white leading-none mb-1">
                        {adminUser?.name}
                      </p>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Faculty
                      </p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
                    Evict
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl -mr-16 -mt-16" />

          <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-white/5 mb-8">
            <Plus className="w-4 h-4 text-purple-600" />
            <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Expand Fleet
            </h3>
          </div>

          <form className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label
                htmlFor="user"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >
                Identify Agent
              </label>
              <div className="relative">
                <select
                  id="user"
                  name="user"
                  className="appearance-none block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all cursor-pointer"
                >
                  <option>Select an expert...</option>
                  {users
                    .filter(
                      (u) =>
                        !course.facultyIds.includes(u.id),
                    )
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="role"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >
                Designate Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                placeholder="e.g., Strategic Instructor"
                className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
              />
            </div>
            <button className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px]">
              Authorize Agent
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Sessions Management Panel ---
const SessionsPanel: React.FC<{
  course: Course;
  onAmend: (session: Session) => void;
}> = ({ course, onAmend }) => {
  const getStatusColor = (status: 'Upcoming' | 'In Progress' | 'Completed') => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-500';
      case 'In Progress':
        return 'bg-yellow-500';
      case 'Completed':
        return 'bg-green-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
            Mission Timeline
          </h2>
        </div>

        {course.sessions.length > 0 ? (
          <div className="space-y-4">
            {course.sessions.map((session) => (
              <div
                key={session.id}
                className="group bg-white dark:bg-[#1A1A1A] p-6 rounded-4xl border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col sm:flex-row justify-between sm:items-center relative z-10">
                  <div className="grow">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h4 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                        {session.title}
                      </h4>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                        <div
                          className={cn(
                            'w-1.5 h-1.5 rounded-full shadow-[0_0_8px]',
                            getStatusColor(session.status),
                          )}
                        />
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">
                          {session.status}
                        </span>
                      </div>
                      {session.price && (
                        <span className="text-[8px] font-black uppercase tracking-widest bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-lg border border-purple-200 dark:border-purple-800/50">
                          Custom Pricing
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-blue-600" />
                        {session.date} at {session.time}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-purple-600" />
                        {session.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => onAmend(session)}
                      className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-blue-600 border border-gray-100 dark:border-white/10 transition-all hover:-translate-y-0.5"
                    >
                      Amend
                    </button>
                    <Link
                      href={`/course/${course.id}/session/${session.id}/performance`}
                      className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all text-center"
                    >
                      Performance
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-gray-50 dark:bg-white/5 border border-dashed border-gray-200 dark:border-white/10 rounded-[3rem]">
            <Calendar className="w-8 h-8 text-gray-300 mx-auto mb-4" />
            <p className="text-xs font-black uppercase tracking-widest text-gray-400">
              No operations scheduled
            </p>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1A1A1A] p-10 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-2xl relative overflow-hidden group h-fit lg:sticky lg:top-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl -mr-16 -mt-16" />

        <div className="flex items-center gap-3 pb-6 border-b border-gray-100 dark:border-white/5 mb-10">
          <Plus className="w-4 h-4 text-blue-600" />
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Initialize Session
          </h3>
        </div>

        <form className="space-y-8 relative z-10">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Event Designation
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="e.g., Strategic Deep-Dive"
              className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="date"
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Temporal Alignment
            </label>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="date"
                id="date"
                name="date"
                className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none transition-all cursor-pointer"
              />
              <input
                type="time"
                id="time"
                name="time"
                className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none transition-all cursor-pointer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
            >
              Coordinates / Access Hub
            </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="e.g., Secure Terminal A"
              className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px]"
          >
            Confirm Mission
          </button>
        </form>
      </div>
    </div>
  );
};

// --- Amend Session Modal ---
const AmendSessionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
  course: Course;
  users: User[];
}> = ({ isOpen, onClose, session, course, users }) => {
  if (!isOpen || !session) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-xl z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#111] rounded-[3rem] border border-white/10 shadow-3xl w-full max-w-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 p-8">
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-12 md:p-14">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-xl bg-blue-600/10">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">
              Refine parameters
            </h2>
          </div>

          <form className="space-y-8 max-h-[60vh] overflow-y-auto pr-6 custom-scrollbar">
            <div className="space-y-2">
              <label
                htmlFor="session-title"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >
                Event Code Name
              </label>
              <input
                type="text"
                id="session-title"
                defaultValue={session.title}
                className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="session-price"
                className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1"
              >
                Modified Value ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-600" />
                <input
                  type="number"
                  id="session-price"
                  defaultValue={session.price}
                  placeholder={`Default: $${course.price}`}
                  className="block w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-4 h-4 text-purple-600" />
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Personnel Overrides
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-2 p-2 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 max-h-48 overflow-y-auto">
                {users.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded-lg border-2 border-gray-200 dark:border-white/10 text-blue-600 focus:ring-blue-500/20 bg-transparent transition-all"
                      defaultChecked={course.facultyIds.includes(user.id)}
                    />
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm">
                        <Image
                          src={user.avatarUrl}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                        {user.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </form>

          <div className="flex justify-end gap-4 pt-10 mt-6 border-t border-gray-100 dark:border-white/5">
            <button
              onClick={onClose}
              className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Abort
            </button>
            <button
              onClick={onClose}
              className="px-10 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all uppercase tracking-widest text-[10px]"
            >
              Commit Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
const CourseManagementPage: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string;
  const router = useRouter();
  const { courses, currentUser, getAllUsers, canManageCourse } =
    useAppContext();
  const [activeTab, setActiveTab] = useState('details');
  const [isAmendModalOpen, setIsAmendModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const course = courses.find((c) => c.id === courseId);

  useEffect(() => {
    if (!currentUser) {
      router.push('/');
    }
  }, [currentUser, router]);

  const handleOpenAmendModal = (session: Session) => {
    setSelectedSession(session);
    setIsAmendModalOpen(true);
  };

  const handleCloseAmendModal = () => {
    setIsAmendModalOpen(false);
    setSelectedSession(null);
  };

  if (!currentUser) return null;

  if (!course)
    return (
      <div className="container mx-auto p-8 text-center">Course not found.</div>
    );
  if (!canManageCourse(course, currentUser)) {
    return (
      <div className="container mx-auto p-8 text-center">
        You do not have permission to manage this course.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
          <div>
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
              Return to Command Center
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-6 h-6 text-blue-600" />
              <div className="px-2 py-0.5 rounded-md bg-blue-600/10 border border-blue-600/20">
                <span className="text-[8px] font-black uppercase tracking-widest text-blue-600">
                  Administrative Hub
                </span>
              </div>
            </div>
            <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter leading-tight">
              Operational{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                Parameters
              </span>
            </h1>
            <p className="text-gray-500 font-medium mt-1 uppercase tracking-[0.2em] text-[10px]">
              Managing Experience: {course.title}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 p-2 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-100 dark:border-white/5 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <div className="pr-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Global Status
              </p>
              <p className="text-sm font-black text-gray-900 dark:text-white">
                Active Deployment
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-12 border-b border-gray-100 dark:border-white/5 overflow-x-auto no-scrollbar">
          <TabButton
            tabName="details"
            activeTab={activeTab}
            onClick={setActiveTab}
            icon={Layout}
          >
            Architecture
          </TabButton>
          <TabButton
            tabName="sessions"
            activeTab={activeTab}
            onClick={setActiveTab}
            icon={Calendar}
          >
            Mission Log
          </TabButton>
        </div>

        <div className="relative">
          {activeTab === 'details' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <DetailsPanel course={course} users={getAllUsers()} />
            </div>
          )}
          {activeTab === 'sessions' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <SessionsPanel course={course} onAmend={handleOpenAmendModal} />
            </div>
          )}
        </div>
      </div>
      <AmendSessionModal
        isOpen={isAmendModalOpen}
        onClose={handleCloseAmendModal}
        session={selectedSession}
        course={course}
        users={getAllUsers()}
      />
    </div>
  );
};

export default CourseManagementPage;
