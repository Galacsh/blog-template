'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import NavigationMenu from './navigation-menu'
import UtilityButtons from './utility-buttons'

const GlobalHeader = () => {
  const pathname = usePathname()

  const stickyByPath = useMemo(() => {
    console.log(`path: [${pathname}]`)
    if (pathname === '/') return 'sticky top-0'
    return ''
  }, [pathname])

  return (
    <header
      className={`${stickyByPath} w-full h-16 bg-white dark:bg-black border-b border-black-100 dark:border-white-100 flex flex-col flex-shrink-0 justify-around items-center z-100`}
    >
      <div className="flex flex-grow w-full items-center justify-between max-w-screen-2xl">
        <NavigationMenu />
        <UtilityButtons />
      </div>
    </header>
  )
}

export default GlobalHeader
