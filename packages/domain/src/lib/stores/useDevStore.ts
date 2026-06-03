import { create } from 'zustand';

interface DevState {
  showHiddenElements: boolean;
  setShowHiddenElements: (show: boolean) => void;
}

export const useDevStore = create<DevState>((set) => ({
  showHiddenElements: false,
  setShowHiddenElements: (show) => set({ showHiddenElements: show }),
}));
