'use client'

import { useTheme } from 'next-themes'

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      to {theme === 'light' ? 'dark' : 'light'}
    </button>
  )
}

export default ThemeToggler
