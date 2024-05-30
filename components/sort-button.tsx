import { CaretSortIcon } from '@radix-ui/react-icons'
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
import { useSearchState } from '@/lib/hooks/use-search'

import type { SortBy, SortOrder } from '@/lib/types'

export function SortButton() {
  const [sort, setSort] = useSearchState('sort', 'date', toStateSort, toParamSort)
  const [order, setOrder] = useSearchState('order', 'desc', toStateOrder, toParamOrder)

  return (
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
  )
}

function toStateSort(val: string | null) {
  return (val || 'date') as SortBy
}
function toParamSort(state: SortBy) {
  return state
}
function toStateOrder(val: string | null) {
  return (val || 'desc') as SortOrder
}
function toParamOrder(state: SortOrder) {
  return state
}
