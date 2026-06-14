import React from 'react';
import { PartnerApplicationState } from './types';
import { MapPin } from 'lucide-react';

interface Props {
  data: PartnerApplicationState;
  updateData: (partial: Partial<PartnerApplicationState>) => void;
}

export default function Step2Location({ data, updateData }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-black mb-2">Primary Location</h3>
        <p className="text-gray-500">Where are your headquarters or primary operating facility?</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          Full Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
            placeholder="e.g. 123 Tech Avenue, San Francisco, CA"
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>
    </div>
  );
}
