import Link from 'next/link'

import type { ComponentProps } from 'react'

export function Anchor({ href, children }: ComponentProps<'a'>) {
  const className =
    'font-medium text-active hover:text-active-foreground underline underline-offset-2'

  // External link
  if (href == null || href.includes('://')) {
    return (
      <a className={className} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <Link href={internalLink(href)} className={className}>
      {children}
    </Link>
  )
}

function internalLink(href: string) {
  const isPrefixed = ['/', '/posts', 'posts/'].includes(href)
  let parts = href.split('/')

  // set prefix if not present
  if (!isPrefixed) {
    parts.unshift('/posts')
    parts = parts.filter((s) => s !== '')
  }

  // Remove extension at the end.
  const last = parts[parts.length - 1]
  if (last.includes('.')) {
    parts[parts.length - 1] = last.split('.')[0]
  }

  const joined = parts.join('/')

  // ensure leading slash
  return joined.startsWith('/') ? joined : `/${joined}`
}
