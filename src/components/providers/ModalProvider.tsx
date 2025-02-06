'use client';

import { useModalStore } from '@/lib/stores/useModalStore';
import { useThemeStore } from '@/lib/stores/useThemeStore';
import { modalRegistry } from '@/lib/themes/registry';
import { useMemo } from 'react';
import type { ModalType, ThemeName } from '@/lib/themes/registry';

type ThemeModals = Record<ModalType, React.ComponentType<any>>;
type ModalRegistry = Record<ThemeName, ThemeModals>;

// Create stable selector functions outside component
const selectModal = (state: { activeModal: ModalType | null }) => state.activeModal;
const selectProps = (state: { modalProps: Record<string, unknown> }) => state.modalProps;
const selectTheme = (state: { currentTheme: ThemeName }) => state.currentTheme;

export function ModalProvider(): React.ReactElement | null {
  // Use separate selectors to avoid unnecessary rerenders
  const activeModal = useModalStore(selectModal);
  const modalProps = useModalStore(selectProps);
  const currentTheme = useThemeStore(selectTheme);

  // Memoize modal component lookup
  const Component = useMemo(() => {
    if (!activeModal) return null;

    const themeModals = (modalRegistry as ModalRegistry)[currentTheme];
    if (!themeModals) return null;

    const ModalComponent = themeModals[activeModal];
    if (!ModalComponent) {
      console.warn(`Modal ${activeModal} not found in theme ${currentTheme}`);
      return null;
    }

    return ModalComponent;
  }, [activeModal, currentTheme]);

  if (!Component) return null;

  return <Component {...modalProps} />;
} 