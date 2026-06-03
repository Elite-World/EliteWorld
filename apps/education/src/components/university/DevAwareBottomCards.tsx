'use client';

import React from 'react';
import { useDevStore } from '@repo/domain';

export function DevAwareBottomCards({ children }: { children: React.ReactNode }) {
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);

  if (!showHiddenElements) {
    return null;
  }

  return <>{children}</>;
}
