'use client';

import { useState, useEffect } from 'react';

interface UnsplashResponse {
  urls: {
    raw: string;
    full: string;
    regular: string;
  };
}

export function useUnsplashImage(query: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${query}&orientation=landscape`,
          {
            headers: {
              Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
            }
          }
        );

        if (!response.ok) throw new Error('Failed to fetch image');

        const data: UnsplashResponse = await response.json();
        // Use the regular size and add quality/size parameters
        setImageUrl(`${data.urls.regular}&q=85&w=1920`);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, [query]);

  return { imageUrl, isLoading, error };
} 