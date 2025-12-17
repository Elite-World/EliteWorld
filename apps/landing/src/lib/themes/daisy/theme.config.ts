export const themeConfig = {
  colors: {
    light: {
      background: '#FDFBF7',
      foreground: '#2D3436',
      primary: '#FFB6C1',
      secondary: '#98DDCA',
      muted: {
        background: '#ffffff',
        foreground: '#6C7A89',
        border: '#F0EBE3'
      },
      accent: {
        yellow: '#FFE5B4',
        purple: '#E0BBE4',
        blue: '#A2D2FF'
      }
    },
    dark: {
      background: '#2D3436',
      foreground: '#FDFBF7',
      primary: '#FF9AAD',
      secondary: '#7DCFB6',
      muted: {
        background: '#1D2123',
        foreground: '#9BA7B4',
        border: '#3D4548'
      },
      accent: {
        yellow: '#FFD79A',
        purple: '#D1A1D1',
        blue: '#89C4FF'
      }
    }
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
    fontSize: {
      base: '1rem',
      h1: '2.5rem',
      h2: '2rem',
      small: '0.875rem'
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      bold: '700'
    }
  },
  layout: {
    maxWidth: '1200px',
    containerPadding: '1.5rem',
    borderRadius: {
      small: '1rem',
      medium: '1.5rem',
      large: '2rem'
    }
  }
}; 