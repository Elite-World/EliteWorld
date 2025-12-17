'use client';

import { useModalStore } from '@/lib/stores/useModalStore';
import { LoginModal } from '@/components/modals/LoginModal';
import { MainMenuModal } from '@/components/modals/MainMenuModal';
import { UserMenuModal } from '@/components/modals/UserMenuModal';
import { SearchModal } from '@/components/modals/SearchModal';
import { ModalType } from '@/lib/types/modal';

const MODALS: Record<ModalType, React.ComponentType<any>> = {
  login: LoginModal,
  mainMenu: MainMenuModal,
  userMenu: UserMenuModal,
  search: SearchModal,
};

export function ModalProvider(): React.ReactElement | null {
  const activeModal = useModalStore((state) => state.activeModal);
  const modalProps = useModalStore((state) => state.modalProps);

  if (!activeModal) return null;

  const Component = MODALS[activeModal];

  if (!Component) {
    console.warn(`Modal ${activeModal} not found in registry`);
    return null;
  }

  return <Component {...modalProps} />;
}
