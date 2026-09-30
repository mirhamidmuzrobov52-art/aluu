import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#0E4F4F',
          50: '#E6F0F0',
          900: '#0E4F4F',
        },
        gold: {
          DEFAULT: '#C6A15B',
          500: '#C6A15B',
        },
        linen: {
          DEFAULT: '#F6F3EC',
        },
        obsidian: {
          DEFAULT: '#14201F',
        },
      },
      fontFamily: {
        display: ['Unbounded', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        button: '9999px',
      },
      boxShadow: {
        card: '0 8px 32px rgba(14, 79, 79, 0.08)',
        cardHover: '0 16px 48px rgba(14, 79, 79, 0.14)',
      },
    },
  },
  plugins: [],
} satisfies Config;
