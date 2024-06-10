import type { ComponentProps } from 'react'

export function Paragraph({ children }: ComponentProps<'p'>) {
  return <p className="mb-4">{children}</p>
}
