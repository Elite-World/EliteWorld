import React from 'react';
import { PartnerApplicationState } from './types';
import { CheckCircle2, MapPin, Building2 } from 'lucide-react';

interface Props {
  data: PartnerApplicationState;
}

export default function Step4Review({ data }: Props) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-black mb-2">Review Application</h3>
        <p className="text-gray-500">
          Please review your institution details before submitting.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-3xl space-y-6 border border-gray-100 dark:border-white/5">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Institution Name
          </h4>
          <p className="font-bold text-lg flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-500" />
            {data.name || 'Not provided'}
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Tagline / Description
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            {data.description || 'Not provided'}
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Primary Location
          </h4>
          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 text-gray-400" />
            {data.location || 'Not provided'}
          </p>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
            Features & Amenities
          </h4>
          {data.amenities.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1 bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold capitalize"
                >
                  {amenity.replace('-', ' ')}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">None selected</p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-2xl flex gap-3 text-blue-800 dark:text-blue-200 text-sm">
        <CheckCircle2 className="w-5 h-5 flex-0" />
        <p>
          By submitting this application, a new Organization will be created for
          your institution and you will be assigned as its Administrator.
        </p>
      </div>
    </div>
  );
}
