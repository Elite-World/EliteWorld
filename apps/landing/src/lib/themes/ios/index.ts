import { Theme } from '../types';
import { components } from './components';
import { HomePage } from './layouts/HomePage';
import { BlogPage } from './layouts/BlogPage';
import { ArticlePage } from './layouts/ArticlePage';
import { PrivacyPolicyPage } from './layouts/PrivacyPolicyPage';
import { TermsOfServicePage } from './layouts/TermsOfServicePage';
import { NotFoundPage } from './layouts/NotFoundPage';
import { themeConfig } from './theme.config';
import { styles } from './styles.config';
import { LoginModal } from './modals/LoginModal';
import { MainMenuModal } from './modals/MainMenuModal';
import { UserMenuModal } from './modals/UserMenuModal';
import { SearchModal } from '@/components/modals/SearchModal';
import { Layout } from './layouts/BaseLayout';

export const IosTheme: Theme = {
  name: 'iOS',
  components,
  layouts: {
    HomePage,
    BlogPage,
    ArticlePage,
    PrivacyPolicyPage,
    TermsOfServicePage,
    NotFoundPage
  },
  config: themeConfig,
  styles,
  modals: {
    login: LoginModal,
    mainMenu: MainMenuModal,
    userMenu: UserMenuModal,
    search: SearchModal,
  },
  wrapper: Layout,
};

// Add default export
export default IosTheme; 