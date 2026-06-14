'use client';;
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function ExpandableDescription({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return (
      <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed text-lg">
        No description available.
      </p>
    );
  }

  return (
    <div className="mt-6 max-w-2xl relative">
      <div
        className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg overflow-hidden animate-in fade-in duration-500">
        {text}
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-blue-500 transition-colors focus:outline-hidden p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5 animate-bounce" />
          )}
        </button>
      </div>
    </div>
  );
}
