'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { NavigationMenu } from '@/components/navigation-menu'
import { CommandMenu } from '@/components/command-menu'
import { ThemeToggleButton } from '@/components/theme-toggle-button'
import { cn } from '@/lib/utils'

export function AppHeader() {
  const pathname = usePathname()
  const shouldBeSticky = useMemo(() => pathname === '/', [pathname])

  return (
    <header
      className={cn(
        { sticky: shouldBeSticky, 'top-0': shouldBeSticky },
        'w-full z-50',
        'border-b border-border',
        'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'
      )}
    >
      <div className="h-16 container flex items-center justify-between space-x-4">
        <NavigationMenu />
        <div className="flex flex-1 items-center space-x-4 sm:justify-end">
          <CommandMenu />
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  )
}
