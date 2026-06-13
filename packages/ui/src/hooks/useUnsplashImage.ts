import { useState, useEffect } from 'react';

const CURATED_IMAGES = {
  global: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop'
};

export function useUnsplashImage(query: string) {
  // Simple logic: check if query contains key words
  const lowerQuery = query?.toLowerCase() || '';
  let selectedImage = CURATED_IMAGES.default;
  
  if (lowerQuery.includes('global') || lowerQuery.includes('globe')) {
    selectedImage = CURATED_IMAGES.global;
  }
  
  // Return immediately for synchronous SSR injection
  return { imageUrl: selectedImage, isLoading: false, error: null };
}
