/** @type {import('tailwindcss').Config} */
import {fontFamily as _fontFamily} from 'tailwindcss/defaultTheme'

export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  extend: {
    backgroundImage: {
      'gradient-conic':
        'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      'gradient-radial':
        'radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))',
    },
    fontFamily: {
      sans: ['var(--font-calSans)', ..._fontFamily.sans],
      display: ['var(--font-calSans)'],
      mono: ['var(--font-jetbrains-mono)', ..._fontFamily.mono],
    },
    animation: {
      rotar: 'rotar 5s linear infinite',
    },
    keyframes: {
      rotar: {
        '0%': {
          transform: 'rotate(0deg) scale(0.15)',
        },
        '100%': {
          transform: 'rotate(360deg) scale(0.15)',
        },
      },
    },
  },
}
export const plugins = []
