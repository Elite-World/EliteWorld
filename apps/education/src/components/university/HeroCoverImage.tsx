'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface HeroCoverImageProps {
  universityId: string;
  universityName: string;
  coverUrl?: string;
}

export function HeroCoverImage({
  universityId,
  universityName,
  coverUrl,
}: HeroCoverImageProps) {
  const [error, setError] = useState(false);

  // If there's an explicit coverUrl, use it. Otherwise, try to load from Cloudinary.
  const src =
    coverUrl ||
    `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dr435quj2'}/image/upload/elite-world/universities-covers/${universityId}.jpg`;

  if (error) {
    return (
      <div className="absolute inset-0 bg-zinc-950 overflow-hidden">
        {/* Premium Mesh Gradient Fallback */}
        <div className="hidden md:block absolute -top-[20%] -left-[10%] w-[50%] h-[70%] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen transform-gpu will-change-transform" />
        <div className="hidden md:block absolute bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen transform-gpu will-change-transform" />
        <div className="hidden md:block absolute top-[20%] left-[40%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen transform-gpu will-change-transform" />
        
        {/* Subtle noise/texture overlay for a more physical feel (optional but premium) */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Bottom gradient to blend smoothly into the page content below */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/20" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={src}
        alt={`Cover image for ${universityName}`}
        fill
        className="object-cover"
        priority
        onError={() => setError(true)}
      />
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
    </div>
  );
}
