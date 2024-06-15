import { cn } from '@/lib/utils'

import type { ComponentProps } from 'react'

export function Pre({ className, children }: ComponentProps<'pre'>) {
  return (
    <div className="code-block px-4 mb-4 border rounded-md">
      <pre
        className={cn(
          className,
          'font-mono font-semibold',
          'text-sm leading-normal',
          'py-4 overflow-auto'
        )}
      >
        {children}
      </pre>
    </div>
  )
}

export function Code({ className, children }: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        className,
        'font-mono font-medium text-active',
        'break-words text-[85%] [pre_&]:text-sm leading-normal',
        'px-[0.4em] py-[0.2em] [pre_&]:p-0',
        'rounded-md [pre_&]:rounded-none'
      )}
    >
      {children}
    </code>
  )
}
