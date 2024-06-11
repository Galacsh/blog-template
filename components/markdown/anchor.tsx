import Link from 'next/link'

import type { ComponentProps } from 'react'

export function Anchor({ href, children }: ComponentProps<'a'>) {
  const className =
    'font-medium text-active hover:text-active-foreground underline underline-offset-2'

  // External link
  if (href == null || href.includes('://')) {
    return (
      <a className={className} href={href}>
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
  let slug = href.split('/')
  if (!isPrefixed) {
    slug = slug.filter((s) => s !== '')
    slug.unshift('/posts')
  }
  return slug.join('/')
}
