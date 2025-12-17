export const styles = {
  global: {
    body: {
      bg: 'bg-white dark:bg-gray-900',
      color: 'text-black dark:text-white',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }
  },
  
  components: {
    card: {
      base: 'rounded-3xl shadow-lg p-6 transition-all duration-300 ease-in-out',
      light: 'bg-white/90 border-2 border-[#F0EBE3] hover:shadow-xl hover:scale-[1.02]',
      dark: 'bg-[#1D2123]/90 border-2 border-[#3D4548] hover:shadow-xl hover:scale-[1.02]'
    },
    button: {
      base: 'px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95',
      primary: 'bg-[#FFB6C1] text-white hover:bg-[#FF9AAD] dark:bg-[#FF9AAD] dark:hover:bg-[#FF8299]',
      secondary: 'bg-[#98DDCA] text-white hover:bg-[#7DCFB6] dark:bg-[#7DCFB6] dark:hover:bg-[#6BC1A4]'
    },
    input: {
      base: 'rounded-2xl border-2 px-4 py-3 transition-all duration-200',
      default: 'border-[#F0EBE3] dark:border-[#3D4548] focus:border-[#FFB6C1] dark:focus:border-[#FF9AAD]',
      error: 'border-red-300 dark:border-red-400'
    }
  }
}; 