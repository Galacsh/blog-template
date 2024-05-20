'use client'

import { useTheme } from 'next-themes'
import { MoonStar, Sun } from 'lucide-react'

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      className="hover:opacity-50 h-8 w-8 bg-black dark:bg-white rounded flex items-center justify-center"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="h-4 w-4 hidden dark:block stroke-black" />
      <MoonStar className="h-4 w-4 block dark:hidden stroke-white" />
      <span className="hidden">Toggle theme</span>
    </button>
  )
}

export default ThemeToggler
