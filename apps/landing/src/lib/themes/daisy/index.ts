import { Theme } from '../types';
import { components } from './components';
import { HomePage } from './layouts/HomePage';
import { themeConfig } from './theme.config';
import { styles } from './styles.config';
import { Layout } from './layouts/BaseLayout';
// import { LoginModal } from './modals/LoginModal';
// import { MainMenuModal } from './modals/MainMenuModal';
// import { UserMenuModal } from './modals/UserMenuModal';

export const DaisyTheme: Theme = {
  name: 'Daisy',
  components,
  layouts: {
    HomePage
  },
  config: themeConfig,
  styles,
  modals: {
    // login: LoginModal,
    // mainMenu: MainMenuModal,
    // userMenu: UserMenuModal,
  },
  wrapper: Layout,
};

export default DaisyTheme; 