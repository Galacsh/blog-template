import Link from 'next/link'

export function Anchor({ href, children }: React.ComponentProps<'a'>) {
  const className = 'text-active hover:text-active-foreground underline underline-offset-2'
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
