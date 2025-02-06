import { Theme } from '../types';
import { components } from './components';
import { HomePage } from './layouts/HomePage';
import { themeConfig } from './theme.config';
import { styles } from './styles.config';
import { LoginModal } from './modals/LoginModal';
import { MainMenuModal } from './modals/MainMenuModal';
import { UserMenuModal } from './modals/UserMenuModal';
import { ThemeLayout } from './layouts/ThemeLayout';

export const IosTheme: Theme = {
  name: 'iOS',
  components,
  layouts: {
    HomePage
  },
  config: themeConfig,
  styles,
  modals: {
    login: LoginModal,
    mainMenu: MainMenuModal,
    userMenu: UserMenuModal,
  },
  wrapper: ThemeLayout,
};

// Add default export
export default IosTheme; 