import { create } from 'zustand';

import type { ModalType } from '../types/modal';

interface ModalState {
  activeModal: ModalType | null;
  modalProps: Record<string, unknown>;
  isClosing: boolean;
}

interface ModalActions {
  open: (modal: ModalType, props?: Record<string, unknown>) => void;
  close: () => void;
}

type ModalStore = ModalState & ModalActions;

const initialState: ModalState = {
  activeModal: null,
  modalProps: {},
  isClosing: false,
};

export const useModalStore = create<ModalStore>()(
  (set) => ({
    ...initialState,
    open: (modal, props = {}) => 
      set(() => ({ activeModal: modal, modalProps: props, isClosing: false }), false),
    close: () => {
      // Trigger exit animations
      set(() => ({ isClosing: true }), false);
      // Defer unmount to allow animations to complete
      setTimeout(() => {
        set(() => initialState, false);
      }, 500);
    },
  })
); 