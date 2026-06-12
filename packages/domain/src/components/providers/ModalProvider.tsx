'use client';

import { useModalStore } from '../../lib/stores/useModalStore';
import { LoginModal } from '../modals/LoginModal';
import { MainMenuModal } from '../modals/MainMenuModal';
import { UserMenuModal } from '../modals/UserMenuModal';
import { SearchModal } from '../modals/SearchModal';
import { ModalType } from '../../lib/types/modal';

const MODALS: Record<ModalType, React.ComponentType<any>> = {
  login: LoginModal,
  mainMenu: MainMenuModal,
  userMenu: UserMenuModal,
  search: SearchModal,
};

import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export function ModalProvider(): React.ReactElement | null {
  const [mounted, setMounted] = useState(false);
  const activeModal = useModalStore((state) => state.activeModal);
  const modalProps = useModalStore((state) => state.modalProps);

  useEffect(() => {
    setMounted(true);
  }, []);

  const Component = activeModal ? MODALS[activeModal] : null;

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {activeModal && Component && (
        <Component key={activeModal} {...modalProps} />
      )}
    </AnimatePresence>
  );
}
