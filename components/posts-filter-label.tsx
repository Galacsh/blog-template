import { Label } from '@/components/ui/label'

import type { ReactNode } from 'react'

type FilterLabelProps = Readonly<{
  htmlFor?: string
  children: ReactNode
}>

export function FilterLabel({ htmlFor, children }: FilterLabelProps) {
  return (
    <Label htmlFor={htmlFor} className="font-bold text-xs text-foreground/60 block mb-1">
      {children}
    </Label>
  )
}
