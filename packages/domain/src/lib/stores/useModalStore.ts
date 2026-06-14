import { create } from 'zustand';

import type { ModalType } from '../types/modal';

interface ModalState {
  activeModal: ModalType | null;
  modalProps: Record<string, unknown>;
}

interface ModalActions {
  open: (modal: ModalType, props?: Record<string, unknown>) => void;
  close: () => void;
}

type ModalStore = ModalState & ModalActions;

const initialState: ModalState = {
  activeModal: null,
  modalProps: {},
};

export const useModalStore = create<ModalStore>()(
  (set) => ({
    ...initialState,
    open: (modal, props = {}) => 
      set(() => ({ activeModal: modal, modalProps: props }), false),
    close: () => {
      // Defer unmount to prevent iOS Safari orphaned touch target panic
      setTimeout(() => {
        set(() => initialState, false);
      }, 10);
    },
  })
); 