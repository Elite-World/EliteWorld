'use client';

import React from 'react';
import { useAppContext } from '../context/AppContext';
import { X, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import Image from 'next/image';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAppContext();

  if (!isOpen) return null;

  const handleLogin = (userId: string) => {
    login(userId);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-xl z-100 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-[#1A1A1A] rounded-[3rem] shadow-[0_32px_128px_rgba(0,0,0,0.5)] w-full max-w-lg overflow-hidden border border-white/10 relative group"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />

        <div className="relative p-12">
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">
                  Secure Gateway
                </span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-tight">
                Authorize <br />{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                  Access
                </span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all shadow-inner"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed mb-8">
              Select your identity to initiate an encrypted session. Elite
              membership status will be validated upon entry.
            </p>

            {[
              {
                id: 'user1',
                name: 'Alice',
                role: 'Global Administrator',
                avatar:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
                color: 'blue',
              },
              {
                id: 'user2',
                name: 'Dr. Angela Yu',
                role: 'Distinguished Faculty',
                avatar:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
                color: 'purple',
              },
              {
                id: 'user3',
                name: 'David Lee',
                role: 'Institutional Partner',
                avatar:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
                color: 'blue',
              },
            ].map((user) => (
              <button
                key={user.id}
                onClick={() => handleLogin(user.id)}
                className="w-full group/card relative p-6 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl hover:border-blue-500/50 transition-all hover:shadow-2xl text-left flex items-center gap-5 overflow-hidden"
              >
                <div
                  className={`absolute top-0 left-0 w-1.5 h-full opacity-0 group-hover/card:opacity-100 transition-opacity ${user.color === 'blue' ? 'bg-blue-600' : 'bg-purple-600'}`}
                />
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-xl shrink-0 border border-white/20">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="grow">
                  <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {user.name}
                  </h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 group-hover/card:text-blue-600 transition-colors">
                    {user.role}
                  </p>
                </div>
                <UserCheck className="w-5 h-5 text-gray-300 group-hover/card:text-blue-600 group-hover/card:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/5 text-blue-600 text-[8px] font-black uppercase tracking-widest leading-none">
              <Sparkles className="w-3 h-3" />
              Verified Tier-1 Authentication System
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-6">
              Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
