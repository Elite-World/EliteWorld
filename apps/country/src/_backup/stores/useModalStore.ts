import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ModalType } from '@/lib/types/modal';

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
  persist(
    (set) => ({
      ...initialState,
      open: (modal, props = {}) => 
        set(() => ({ activeModal: modal, modalProps: props }), false),
      close: () => 
        set(() => initialState, false),
    }),
    {
      name: 'modal-storage',
      partialize: (state) => ({ 
        activeModal: state.activeModal,
        modalProps: state.modalProps 
      }),
    }
  )
); 