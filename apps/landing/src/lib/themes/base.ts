export interface Theme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    // Add more color definitions
  };
  typography: {
    fontFamily: string;
    fontSize: {
      base: string;
      h1: string;
      h2: string;
      // Add more typography definitions
    };
  };
  // Add more theme properties
}

export const baseTheme: Theme = {
  name: 'base',
  colors: {
    background: '#ffffff',
    foreground: '#171717',
    primary: '#2563eb',
    secondary: '#4b5563'
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
    fontSize: {
      base: '1rem',
      h1: '2.5rem',
      h2: '2rem'
    }
  }
}; 