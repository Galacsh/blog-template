'use client'

import { useSearch } from '@/hooks'
import { SortBy, SortOrder } from '@/types'

type Props = {
  className?: string
}

export default function SortByFilter({ className }: Props) {
  const [sort, setSort] = useSearch('sort', 'date', toSortState, toSortParam)
  const [order, setOrder] = useSearch('order', 'desc', toOrderState, toOrderParam)

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <label htmlFor="sort_by" className="mr-2 font-bold">
        Sort by:
      </label>
      <select
        id="sort_by"
        value={sort || 'date'}
        onChange={(e) => setSort(e.target.value as SortBy)}
        className="bg-white border border-black-300 text-sm rounded-lg focus:ring-black-500 focus:border-black-700 block px-2 py-1 dark:bg-black dark:border-white-300 dark:placeholder-white-300 dark:focus:ring-white-500 dark:focus:border-white-700"
      >
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
      <label htmlFor="ascending_or_descending" className="mx-2">
        /
      </label>
      <select
        id="ascending_or_descending"
        value={order || 'desc'}
        onChange={(e) => setOrder(e.target.value as SortOrder)}
        className="bg-white border border-black-300 text-sm rounded-lg focus:ring-black-500 focus:border-black-700 block px-2 py-1 dark:bg-black dark:border-white-300 dark:placeholder-white-300 dark:focus:ring-white-500 dark:focus:border-white-700"
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  )
}

function toSortState(val: string | null) {
  if (val && !['date', 'title'].includes(val)) {
    throw new Error("'sort' must be one of 'date', 'title'.")
  }
  return val as SortBy | null
}

function toOrderState(val: string | null) {
  if (val && !['desc', 'asc'].includes(val)) {
    throw new Error("'order' must be one of 'desc', 'asc'.")
  }
  return val as SortOrder | null
}

function toSortParam(state: SortBy | null) {
  return state
}

function toOrderParam(state: SortOrder | null) {
  return state
}
