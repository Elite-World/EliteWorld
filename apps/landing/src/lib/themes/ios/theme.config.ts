export const themeConfig = {
  colors: {
    light: {
      background: '#f5f5f7',
      foreground: '#1d1d1f',
      primary: '#007AFF',
      secondary: '#5856D6',
      muted: {
        background: '#ffffff',
        foreground: '#86868b',
        border: '#e5e5e7'
      }
    },
    dark: {
      background: '#000000',
      foreground: '#f5f5f7',
      primary: '#0A84FF',
      secondary: '#5E5CE6',
      muted: {
        background: '#1c1c1e',
        foreground: '#98989d',
        border: '#2c2c2e'
      }
    }
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, var(--font-geist-sans)',
    fontSize: {
      base: '1rem',
      h1: '2.125rem',
      h2: '1.875rem',
      small: '0.875rem'
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600'
    }
  },
  layout: {
    maxWidth: '1024px',
    containerPadding: '1rem',
    borderRadius: {
      small: '0.75rem',
      medium: '1rem',
      large: '1.25rem'
    }
  }
}; 