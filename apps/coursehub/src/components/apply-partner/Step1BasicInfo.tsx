import React from 'react';
import { PartnerApplicationState } from './types';

interface Props {
  data: PartnerApplicationState;
  updateData: (partial: Partial<PartnerApplicationState>) => void;
}

export default function Step1BasicInfo({ data, updateData }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-black mb-2">Basic Information</h3>
        <p className="text-gray-500">Let&apos;s start with the name and description of your institution.</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Institution Name
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="e.g. Silicon Valley AI Academy"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Tagline / Short Description
        </label>
        <textarea
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="What makes your institution unique?"
          rows={4}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />
      </div>
    </div>
  );
}
