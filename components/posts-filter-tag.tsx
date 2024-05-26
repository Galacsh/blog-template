'use client'

import { FilterLabel } from '@/components/posts-filter-label'
import { useSearch } from '@/lib/hooks/use-search'
import { cn } from '@/lib/utils'

import type { Tag } from '@/lib/types'

type TagFilterProps = Readonly<{
  available: Tag[]
}>

export function TagFilter({ available }: TagFilterProps) {
  const [selected, setSelected] = useSearch('tags', [], toState, toParam)

  return (
    <div className="w-full">
      <FilterLabel htmlFor="tags">Tags</FilterLabel>
      <div id="tags" className="flex flex-row flex-wrap gap-2">
        {available.map((tag, idx) => (
          <TagFilterItem
            key={'tag_' + idx}
            tag={tag}
            isSelected={selected?.includes(tag) || false}
            onSelect={(selectedTag) => setSelected([...selected, selectedTag])}
            onDeselect={(deselected) => setSelected(selected.filter((t) => t !== deselected))}
          ></TagFilterItem>
        ))}
      </div>
    </div>
  )
}

function toState(val: string | null) {
  return val?.split(',').map(decodeURIComponent) || []
}

function toParam(state: Tag[]) {
  return state?.map(encodeURIComponent).join(',')
}

type TagFilterItemProps = Readonly<{
  tag: Tag
  isSelected: boolean
  onSelect: (tag: Tag) => void
  onDeselect: (tag: Tag) => void
}>

function TagFilterItem({ tag, isSelected, onSelect, onDeselect }: TagFilterItemProps) {
  const toggle = () => {
    if (isSelected) onDeselect(tag)
    else onSelect(tag)
  }

  return (
    <button
      className={cn(
        'px-2 py-1 text-xs rounded-md',
        'border hover:text-accent-foreground bg-background hover:bg-accent',
        {
          'text-muted-foreground': !isSelected,
          'text-foreground': isSelected,
          'border-input': !isSelected,
          'border-foreground hover:border-accent-foreground': isSelected,
        }
      )}
      onClick={toggle}
    >
      {tag}
    </button>
  )
}
