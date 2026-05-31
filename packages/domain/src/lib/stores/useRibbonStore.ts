import { create } from 'zustand';

export type ButtonId = string;

export interface RibbonButton {
  id: ButtonId;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string; // For tooltip or vertical label
  onClick?: () => void;
  component?: React.ReactNode; // For fully custom buttons
  priority?: number; // Higher number = Higher up in the stack (or simply sort order)
  visible?: boolean;
}

interface RibbonState {
  buttons: RibbonButton[];
  registerButton: (button: RibbonButton) => void;
  unregisterButton: (id: ButtonId) => void;
  updateButton: (id: ButtonId, updates: Partial<RibbonButton>) => void;
}

export const useRibbonStore = create<RibbonState>((set) => ({
  buttons: [],
  registerButton: (button) =>
    set((state) => {
      // Prevent duplicates
      if (state.buttons.some((b) => b.id === button.id)) {
        return state;
      }
      return {
        buttons: [...state.buttons, { ...button, visible: button.visible ?? true }]
          .sort((a, b) => (b.priority || 0) - (a.priority || 0)),
      };
    }),
  unregisterButton: (id) =>
    set((state) => ({
      buttons: state.buttons.filter((b) => b.id !== id),
    })),
  updateButton: (id, updates) =>
    set((state) => ({
      buttons: state.buttons.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    })),
}));
