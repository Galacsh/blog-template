import type { ComponentProps } from 'react'

export function Paragraph({ children }: ComponentProps<'p'>) {
  return <p className="mb-5 break-words break-keep leading-7">{children}</p>
}
