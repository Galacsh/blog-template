'use client'

import { useTheme } from 'next-themes'
import Moon from '@/public/images/moon.svg'
import Sun from '@/public/images/sun.svg'
import Image from 'next/image'

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()

  return (
    <button
      className="hover:opacity-50 h-6 w-6"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Image alt="Dark mode icon" src={Moon} className="block dark:hidden" />
      <Image alt="Light mode icon" src={Sun} className="hidden dark:block" />
    </button>
  )
}

export default ThemeToggler
