'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { CalendarIcon, CaretSortIcon, LayersIcon } from '@radix-ui/react-icons'
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
import { format } from 'date-fns/format'

import type { PostPreview, SortBy, SortOrder } from '@/lib/types'

type Props = Readonly<{
  posts: PostPreview[]
}>

export function FilteredPosts({ posts }: Props) {
  const [sort, setSort] = useSearch('sort', 'date', toStateSort, toParamSort)
  const [order, setOrder] = useSearch('order', 'desc', toStateOrder, toParamOrder)

  const comparePosts = useCallback(
    (a: PostPreview, b: PostPreview) => {
      let result = 0

      const aValue = a[sort]
      const bValue = b[sort]

      const aExists = aValue != null && aValue !== undefined
      const bExists = bValue != null && bValue !== undefined

      if (!aExists && bExists) return 1
      if (aExists && !bExists) return -1

      if (aExists && bExists) {
        result = aValue < bValue ? -1 : 1
      } else {
        result = a.title < b.title ? -1 : 1
      }

      return order === 'asc' ? result : -result
    },
    [sort, order]
  )

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-4">
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
      <div className="flex flex-col space-y-8">
        {posts.sort(comparePosts).map((post, idx) => (
          <Link
            key={'post_' + idx}
            href={'/posts/' + post.slug}
            className="relative block w-full group focus:outline-none z-[1]"
          >
            {/* Date */}
            {post.date && (
              <span className="flex flex-row items-center space-x-2 text-xs text-muted-foreground/60">
                <CalendarIcon className="size-3" />
                <span>{format(post.date, 'PPP')}</span>
              </span>
            )}
            {/* Title */}
            <span className="block font-bold text-foreground ">{post.title}</span>
            {/* Description */}
            <span className="block text-sm text-foreground">{post.description}</span>
            {/* Tags */}
            {post.tags && (
              <span className="flex flex-row w-full overflow-scroll text-ellipsis items-center gap-2 mt-2">
                <LayersIcon className="size-3" />
                {post.tags.map((tag, idx) => (
                  <span key={'post_tag' + idx} className="px-2 py-1 text-xs rounded-md bg-accent">
                    {tag}
                  </span>
                ))}
              </span>
            )}
            {/* Hover effect */}
            <span className="absolute block top-[-0.5rem] left-[-1rem] w-[calc(100%+2rem)] h-[calc(100%+1rem)] sm:rounded-md bg-accent/50 invisible group-hover:visible group-focus:visible z-[-1]" />
          </Link>
        ))}
      </div>
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
