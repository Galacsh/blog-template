import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'selector',
  content: ['./components/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      dark: 'rgb(var(--color-background-dark))',
      light: 'rgb(var(--color-background-light))',
      white: {
        DEFAULT: 'rgb(var(--color-white))',
        100: 'rgb(var(--color-white) / 0.1)',
        200: 'rgb(var(--color-white) / 0.2)',
        300: 'rgb(var(--color-white) / 0.3)',
        400: 'rgb(var(--color-white) / 0.4)',
        500: 'rgb(var(--color-white) / 0.5)',
        600: 'rgb(var(--color-white) / 0.6)',
        700: 'rgb(var(--color-white) / 0.7)',
        800: 'rgb(var(--color-white) / 0.8)',
        900: 'rgb(var(--color-white) / 0.9)',
      },
      black: {
        DEFAULT: 'rgb(var(--color-black))',
        100: 'rgb(var(--color-black) / 0.1)',
        200: 'rgb(var(--color-black) / 0.2)',
        300: 'rgb(var(--color-black) / 0.3)',
        400: 'rgb(var(--color-black) / 0.4)',
        500: 'rgb(var(--color-black) / 0.5)',
        600: 'rgb(var(--color-black) / 0.6)',
        700: 'rgb(var(--color-black) / 0.7)',
        800: 'rgb(var(--color-black) / 0.8)',
        900: 'rgb(var(--color-black) / 0.9)',
      },
    },
  },
  plugins: [],
}
export default config
