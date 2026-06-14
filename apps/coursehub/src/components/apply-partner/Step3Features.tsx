import React from 'react';
import { PartnerApplicationState } from './types';
import { Wifi, Car, Coffee, Book, Users, Laptop, Globe } from 'lucide-react';

interface Props {
  data: PartnerApplicationState;
  updateData: (partial: Partial<PartnerApplicationState>) => void;
}

const AVAILABLE_AMENITIES = [
  { id: 'wifi', label: 'High-Speed WiFi', icon: Wifi },
  { id: 'parking', label: 'Free Parking', icon: Car },
  { id: 'cafe', label: 'Cafeteria', icon: Coffee },
  { id: 'library', label: 'Library Access', icon: Book },
  { id: 'mentorship', label: '1-on-1 Mentorship', icon: Users },
  { id: 'equipment', label: 'Provided Laptops', icon: Laptop },
  { id: 'online', label: 'Online Portal', icon: Globe },
];

export default function Step3Features({ data, updateData }: Props) {
  const toggleAmenity = (id: string) => {
    if (data.amenities.includes(id)) {
      updateData({ amenities: data.amenities.filter((a) => a !== id) });
    } else {
      updateData({ amenities: [...data.amenities, id] });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h3 className="text-2xl font-black mb-2">Features & Amenities</h3>
        <p className="text-gray-500">What makes your institution special? Select all that apply.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {AVAILABLE_AMENITIES.map((amenity) => {
          const isSelected = data.amenities.includes(amenity.id);
          const Icon = amenity.icon;

          return (
            <button
              key={amenity.id}
              onClick={() => toggleAmenity(amenity.id)}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition text-left ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300'
                  : 'border-gray-200 dark:border-white/10 hover:border-blue-200 dark:hover:border-white/20 text-gray-700 dark:text-gray-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
              <span className="font-bold text-sm">{amenity.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
