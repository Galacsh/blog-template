import Link from 'next/link'

import type { ComponentProps } from 'react'

export function Anchor({ href, children }: ComponentProps<'a'>) {
  const className =
    'font-medium text-active hover:text-active-foreground underline underline-offset-2'
  if (href && href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a className={className} href={href}>
      {children}
    </a>
  )
}
