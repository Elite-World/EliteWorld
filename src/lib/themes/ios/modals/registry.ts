import { LoginModal } from './LoginModal';
import { MainMenuModal } from './MainMenuModal';
import { UserMenuModal } from './UserMenuModal';
// import { SignupModal } from './SignupModal';
// import { SettingsModal } from './SettingsModal';
// import { SearchModal } from './SearchModal';

export const modalRegistry = {
  login: LoginModal,
  mainMenu: MainMenuModal,
  userMenu: UserMenuModal,
//   signup: SignupModal,
//   settings: SettingsModal,
//   search: SearchModal,
} as const;

export type ModalType = keyof typeof modalRegistry; 