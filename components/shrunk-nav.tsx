import { LayersIcon, TextAlignLeftIcon } from '@radix-ui/react-icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import type { JSX } from 'react'

type Props = Readonly<{
  left: JSX.Element
  right: JSX.Element
}>

export function ShrunkNav({ left, right }: Props) {
  return (
    <div className="w-full px-4 flex flex-row items-center justify-between">
      <Popover>
        <PopoverTrigger>
          <span className="text-xs leading-normal flex flex-row items-center px-2 py-2 rounded-md hover:bg-accent/50">
            <LayersIcon className="mr-2 size-4" />
            Related Posts
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={14}
          className="max-h-[calc(100vh-190px)] overflow-y-auto"
        >
          {left}
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger className="block lg:hidden">
          <span className="text-xs leading-normal flex flex-row items-center px-2 py-2 rounded-md hover:bg-accent/50">
            <TextAlignLeftIcon className="mr-2 size-4" />
            On this page
          </span>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={14}
          className="max-h-[calc(100vh-190px)] overflow-y-auto"
        >
          {right}
        </PopoverContent>
      </Popover>
    </div>
  )
}
