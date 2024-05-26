'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DropdownMenuCheckRadioItem } from '@/components/dropdown-menu-check-radio-item'
import { useSearch } from '@/lib/hooks/use-search'
import type { SortBy, SortOrder } from '@/lib/types'
import { CaretSortIcon } from '@radix-ui/react-icons'

export function FilteredPosts() {
  const [sort, setSort] = useSearch('sort', 'date', toStateSort, toParamSort)
  const [order, setOrder] = useSearch('order', 'desc', toStateOrder, toParamOrder)

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-2">
        <h1 className="font-bold text-xl">Posts</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              Sort By
              <CaretSortIcon className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36" align="end">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sort} onValueChange={(s) => setSort(s as SortBy)}>
              <DropdownMenuCheckRadioItem value="date">Date</DropdownMenuCheckRadioItem>
              <DropdownMenuCheckRadioItem value="title">Title</DropdownMenuCheckRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Order</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={order} onValueChange={(o) => setOrder(o as SortOrder)}>
              <DropdownMenuCheckRadioItem value="desc">Descending</DropdownMenuCheckRadioItem>
              <DropdownMenuCheckRadioItem value="asc">Ascending</DropdownMenuCheckRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>Post 1</div>
      <div>Post 2</div>
      <div>Post 3</div>
      <div>Post 4</div>
    </div>
  )
}

function toStateSort(val: string | null) {
  return (val || 'date') as SortBy
}
function toStateOrder(val: string | null) {
  return (val || 'desc') as SortOrder
}
function toParamSort(state: SortBy) {
  return state
}
function toParamOrder(state: SortOrder) {
  return state
}
