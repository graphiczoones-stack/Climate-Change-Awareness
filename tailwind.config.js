/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      fontFamily: {
        kufi: ['"Noto Kufi Arabic"', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'sans-serif'],
      },
      colors: {
        void: '#050505',
        'space-dark': '#080810',
        'ocean-blue': '#0D3B66',
        'ocean-light': '#1A6BA0',
        'toxic-orange': '#FF4500',
        'toxic-red': '#CC2200',
        'hope-green': '#00B48A',
        'hope-light': '#00E5AD',
        'warm-gold': '#FFB347',
        'ice-white': '#E8F4FD',
        'smoke-grey': '#2A2A2A',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 180, 138, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 180, 138, 0.8), 0 0 40px rgba(0, 180, 138, 0.3)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
