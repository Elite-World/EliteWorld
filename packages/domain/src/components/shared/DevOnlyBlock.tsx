'use client';

import React from 'react';
import { useDevStore } from '../../lib/stores/useDevStore';

interface DevOnlyBlockProps {
  children: React.ReactNode;
}

export function DevOnlyBlock({ children }: DevOnlyBlockProps) {
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  
  // To avoid hydration mismatch (if server renders differently than client initial state),
  // we could use a mounted check, but useDevStore state should be stable enough 
  // or we can just return null initially if it's strictly a dev tool.
  // Actually, since it defaults to false, it will match server.
  
  if (!showHiddenElements) {
    return null;
  }

  return <>{children}</>;
}
