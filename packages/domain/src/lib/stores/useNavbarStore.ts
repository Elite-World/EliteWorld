import { create } from 'zustand';

interface NavbarState {
  forceSolid: boolean;
  setForceSolid: (forceSolid: boolean) => void;
}

export const useNavbarStore = create<NavbarState>((set) => ({
  forceSolid: false,
  setForceSolid: (forceSolid) => set({ forceSolid }),
}));
