'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import { RadioItem, ItemIndicator } from '@radix-ui/react-dropdown-menu'
import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

import type { ElementRef, ComponentPropsWithoutRef } from 'react'

export const DropdownMenuCheckRadioItem = forwardRef<
  ElementRef<typeof RadioItem>,
  ComponentPropsWithoutRef<typeof RadioItem>
>(({ className, children, ...props }, ref) => (
  <RadioItem
    ref={ref}
    className={cn(
      'relative',
      'flex items-center py-1.5 pl-8 pr-2',
      'text-sm outline-none rounded-sm',
      'transition-colors focus:bg-accent focus:text-accent-foreground',
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'cursor-default select-none',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <CheckIcon className="h-4 w-4 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </RadioItem>
))
DropdownMenuCheckRadioItem.displayName = RadioItem.displayName
