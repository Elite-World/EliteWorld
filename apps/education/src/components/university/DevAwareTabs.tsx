'use client';

import React from 'react';
import { Tabs as UiTabs } from '@repo/ui';
import { useDevStore } from '@repo/domain';

export interface DevAwareTab {
  id: string;
  label: string;
  content: React.ReactNode;
  visible: boolean;
}

interface DevAwareTabsProps {
  tabs: DevAwareTab[];
}

export function DevAwareTabs({ tabs }: DevAwareTabsProps) {
  const showHiddenElements = useDevStore((state) => state.showHiddenElements);
  
  const visibleTabs = tabs.filter(tab => tab.visible || showHiddenElements);
  
  if (visibleTabs.length === 0) return null;
  
  return (
    <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
      <UiTabs tabs={visibleTabs} defaultTab={visibleTabs[0]?.id} className="bg-transparent" />
    </div>
  );
}
