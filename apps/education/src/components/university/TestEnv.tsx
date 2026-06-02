'use client';
import React, { useEffect } from 'react';
export default function TestEnv() {
  useEffect(() => { console.log("CLOUD NAME:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) }, [])
  return null;
}
