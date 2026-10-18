/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

// Couleurs pilotées par des variables CSS (voir src/index.css) : un seul jeu de classes pour clair et sombre.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', 'Inter', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        subtle: token('subtle'),
        accent: token('accent'),
      },
    },
  },
  plugins: [],
}
