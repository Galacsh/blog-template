'use client'

import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useScrollDirection } from '@/lib/hooks/use-scroll-direction'
import { cn } from '@/lib/utils'

type Props = Readonly<{
  className?: string
}>

export function QuickScrollButton({ className }: Props) {
  const direction = useScrollDirection()

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('size-8', className)}
      onClick={() => {
        if (direction === 'up') scrollTop()
        else scrollBottom()
      }}
    >
      <ArrowDownIcon className={`absolute h-4 w-4 ${direction !== 'down' && 'hidden'}`} />
      <ArrowUpIcon className={`absolute h-4 w-4 ${direction !== 'up' && 'hidden'}`} />
      <span className="sr-only">Quick scroll</span>
    </Button>
  )
}

function scroll(y: number) {
  window.scrollTo(0, y)
}

function scrollTop() {
  scroll(0)
}

function scrollBottom() {
  scroll(document.body.scrollHeight)
}
