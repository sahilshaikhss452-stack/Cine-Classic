import type { Config } from 'tailwindcss';
import path from 'path';

const config: Config = {
  content: [
    path.join(__dirname, './src/pages/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, './src/components/**/*.{js,ts,jsx,tsx,mdx}'),
    path.join(__dirname, './src/app/**/*.{js,ts,jsx,tsx,mdx}'),
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8c96b',
          dark: '#b8941f',
          accent: '#c9a227',
        },
        studio: {
          dark: '#060606',
          dark2: '#0c0c0c',
          dark3: '#141414',
          dark4: '#1c1c1c',
          dark5: '#242424',
          white: '#f5f0e8',
          white2: '#e8e0d0',
          gray: '#8a8a8a',
          'gray-lt': '#b0b0b0',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        studio: '8px',
        'studio-lg': '16px',
        'studio-xl': '24px',
      },
      maxWidth: {
        studio: '1200px',
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out -3s infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'fade-slide': 'fadeSlide 0.5s cubic-bezier(0.22,1,0.36,1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        fadeSlide: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        studio: '20px',
      },
      transitionTimingFunction: {
        studio: 'cubic-bezier(0.22,1,0.36,1)',
      },
    },
  },
  plugins: [],
};

export default config;
