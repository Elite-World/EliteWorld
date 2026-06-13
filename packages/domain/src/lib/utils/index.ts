// import { type ClassValue, clsx } from 'clsx';
import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
 
export function optimizeCloudinaryUrl(url: string | undefined | null, width?: number): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com') || !url.includes('/image/upload/')) return url;
  
  // If it already has f_auto or q_auto, assume it's already optimized
  if (url.includes('/f_auto') || url.includes('/q_auto')) return url;

  // Insert transformations right after /image/upload/
  const transforms = `f_auto,q_auto${width ? `,w_${width}` : ''}`;
  return url.replace('/image/upload/', `/image/upload/${transforms}/`);
} 