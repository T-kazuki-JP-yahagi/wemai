import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0f2744',
          mid: '#1e3a5f',
          light: '#2d5086',
        },
        brand: {
          orange: '#f97316',
          'orange-light': '#fb923c',
        },
        sakura: {
          DEFAULT: '#fde8f3',
          mid: '#f0abcc',
          dark: '#e896be',
        },
      },
      fontFamily: {
        sans: [
          'Hiragino Sans',
          'Noto Sans JP',
          'system-ui',
          'sans-serif',
        ],
      },
      animation: {
        'sakura-sway': 'sakuraSway 5s ease-in-out infinite',
        'fade-slide-in': 'fadeSlideIn 0.3s ease forwards',
      },
      keyframes: {
        sakuraSway: {
          '0%, 100%': { transform: 'rotate(-5deg) scale(1)' },
          '50%': { transform: 'rotate(5deg) scale(1.06)' },
        },
        fadeSlideIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
