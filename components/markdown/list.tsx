import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

export function UnorderedList({ children }: ComponentProps<'ul'>) {
  return <ul className="list-disc has-[button]:list-none ps-[2em] mb-4 [&_&]:mb-0">{children}</ul>
}

export function OrderedList({ children }: ComponentProps<'ol'>) {
  return (
    <ol className="list-decimal has-[button]:list-none ps-[2em] mb-4 [&_&]:mb-0">{children}</ol>
  )
}

export function ListItem({ children }: ComponentProps<'li'>) {
  return <li className="break-words [&>p]:my-4 [&+&]:mt-[0.25em] [&_&]:mt-[0.25em]">{children}</li>
}

export function InputCheckbox({ disabled, checked }: ComponentProps<'input'>) {
  return (
    <Checkbox
      disabled={disabled}
      checked={checked}
      className={cn(
        'mt-0 mr-[0.2em] mb-[0.2em] ml-[-1.4em] align-middle',
        'disabled:opacity-100 data-[state=checked]:text-background',
        'data-[state=checked]:bg-active border-muted-foreground data-[state=checked]:border-active',
        'dark:data-[state=checked]:bg-active-foreground border-muted-foreground dark:data-[state=checked]:border-active-foreground'
      )}
    />
  )
}
