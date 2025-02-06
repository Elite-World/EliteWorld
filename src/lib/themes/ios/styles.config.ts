export const styles = {
  global: {
    body: {
      bg: 'background',
      color: 'foreground',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }
  },
  
  components: {
    card: {
      base: 'rounded-2xl shadow-sm backdrop-blur-xl p-6',
      light: 'bg-white/70 border border-gray-200/50',
      dark: 'bg-[#1c1c1e]/70 border border-[#2c2c2e]'
    },
    button: {
      base: 'px-5 py-2.5 rounded-full font-medium transition-all duration-200 active:scale-95',
      primary: 'bg-[#007AFF] text-white hover:bg-[#0071eb] dark:bg-[#0A84FF] dark:hover:bg-[#0974e0]',
      secondary: 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e5e5e7] dark:bg-[#1c1c1e] dark:text-white dark:hover:bg-[#2c2c2e]'
    },
    input: {
      base: 'rounded-lg border bg-white/70 dark:bg-[#1c1c1e]/70 px-4 py-2 outline-none transition-all duration-200',
      default: 'border-gray-200/50 dark:border-[#2c2c2e] focus:border-[#007AFF] dark:focus:border-[#0A84FF]',
      error: 'border-red-500 dark:border-red-500'
    }
  }
}; 