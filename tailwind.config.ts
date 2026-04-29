import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0A0B0D',
          navy: '#0D1B2A',
          gold: '#C9A96E',
          'gold-muted': 'rgba(201, 169, 110, 0.2)',
          'text-primary': '#F5F0E8',
          'text-secondary': '#A8A29E',
          destructive: '#EF4444',
          'navy-mid': '#1B3A5F',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-mobile': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      height: {
        header: '72px',
        'header-mobile': '64px',
      },
      maxWidth: {
        content: '1280px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
