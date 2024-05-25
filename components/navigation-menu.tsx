'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/components/logo'
import { cn } from '@/lib/utils'

export function NavigationMenu() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 sm:space-x-8">
      {/* Logo */}
      <Logo />

      {/* Nav links */}
      <Link
        href="/posts"
        className={cn(
          'text-sm transition-colors hover:text-foreground/80',
          pathname === '/posts' ? 'text-foreground' : 'text-foreground/60'
        )}
      >
        Posts
      </Link>
    </nav>
  )
}
